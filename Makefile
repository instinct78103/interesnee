#!/usr/bin/make
TAG := 20
THIS_DIR := $(shell pwd)
USER := $(shell id -u)
GROUP := $(shell id -g)
HOME := /nodejs
PROJECT_NAME ?= interesnee

npm_cmd:
	docker run -it --rm \
		--name $(PROJECT_NAME) \
		-v $(THIS_DIR):/nodejs \
		-v /etc/passwd:/etc/passwd:ro \
		-v /etc/group:/etc/group:ro \
		-u $(USER):$(USER) \
		-w $(HOME)/$(PROJECT_NAME) \
		--env HOME=$(HOME) \
		--network host \
		node:$(TAG) npm $(CMD)

.PHONY: npm

# Allows passing additional arguments to npm
npm:
	$(MAKE) npm_cmd CMD="$(filter-out $@,$(MAKECMDGOALS))"

%:
	@: # ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line

vite-create:
	docker run -it --rm \
		--name $(PROJECT_NAME) \
		-v $(THIS_DIR):/nodejs \
		-v /etc/passwd:/etc/passwd:ro \
		-v /etc/group:/etc/group:ro \
		-u $(USER):$(USER) \
		-w $(HOME) \
		--env HOME=$(HOME) \
		node:$(TAG) npm create vite@latest $(PROJECT_NAME)

ssg-install:
	$(npm) install -D vite-ssg @unhead/vue

ssg-build:
	$(npm) run build-ssg

test:
	docker run -it --rm \
		-v $(THIS_DIR):/nodejs \
		-v /etc/passwd:/etc/passwd:ro \
		-v /etc/group:/etc/group:ro \
		-u $(USER):$(USER) \
		-w $(HOME)/$(PROJECT_NAME) \
		--env HOME=$(HOME) \
		node:$(TAG) node index.js
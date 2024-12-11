<template>
  <!--    <section>-->
  <!--      <v-dialog />-->
  <!--    </section>-->

  <section v-if="filteredJob && renderJob">
    <Hero kind="small">{{ filteredJob?.title.replace('(RU)', '') }}</Hero>
    <div :class="$style.root">
      <div :class="$style.container">
        <p :class="$style.contentTitle">Описание:</p>
        <div :class="$style.content" v-html="filteredJob.description" />
      </div>
    </div>
  </section>
  <section
    :class="[$style.root, $style.backgrounded]" :style="{ backgroundColor: bgColor}">
    <div :class="[$style.container, $style.formContainer]">
      <h2 :class="$style.title">{{ props.title }}</h2>
      <form id="contact_form" @submit.prevent="submitForm">
        <div :class="$style.row">
          <div :class="[$style.col, $style.colHalf]">
            <input
              v-model="firstname"
              :class="[$style.input,  ]"
              name="firstname"
              type="text"
              placeholder="Имя"
            >
            <!--              <transition name="slide-top">-->
            <!--                <span-->
            <!--                  v-show="errors.has('firstname')"-->
            <!--                  :class="$style.detail"-->
            <!--                >-->
            <!--                  {{ errors.first('firstname') }}-->
            <!--                </span>-->
            <!--              </transition>-->
          </div>
          <div :class="[$style.col, $style.colHalf]">
            <!--              <input-->
            <!--                v-validate="'required|alpha'"-->
            <!--                v-model="lastname"-->
            <!--                :class="[$style.input, {[$style.error]: errors.has('lastname')} ]"-->
            <!--                name="lastname"-->
            <!--                type="text"-->
            <!--                placeholder="Фамилия"-->
            <!--              >-->
            <!--              <transition name="slide-top">-->
            <!--                <span-->
            <!--                  v-show="errors.has('lastname')"-->
            <!--                  :class="$style.detail"-->
            <!--                >-->
            <!--                  {{ errors.first('lastname') }}-->
            <!--                </span>-->
            <!--              </transition>-->
          </div>
        </div>
        <div :class="$style.row">
          <div :class="[$style.col, $style.colHalf]">
            <!--              <input-->
            <!--                v-validate="'required|numeric'"-->
            <!--                v-mask="'###########'"-->
            <!--                v-model.trim="phone"-->
            <!--                :class="[$style.input, {[$style.error]: errors.has('phone') }]"-->
            <!--                name="phone"-->
            <!--                type="text"-->
            <!--                placeholder="Телефон"-->
            <!--                @change="onChangePhone"-->
            <!--              >-->
            <!--              <transition name="slide-top">-->
            <!--                <span-->
            <!--                  v-show="errors.has('phone')"-->
            <!--                  :class="$style.detail"-->
            <!--                >-->
            <!--                  {{ errors.first('phone') }}-->
            <!--                </span>-->
            <!--              </transition>-->
          </div>
          <div :class="[$style.col, $style.colHalf]">
            <!--              <input-->
            <!--                v-validate="'required|email'"-->
            <!--                :class="[$style.input, {[$style.error]: errors.has('email') }]"-->
            <!--                v-model="email"-->
            <!--                name="email"-->
            <!--                type="text"-->
            <!--                placeholder="Email"-->
            <!--              >-->
            <!--              <transition name="slide-top">-->
            <!--                <span-->
            <!--                  v-show="errors.has('email')"-->
            <!--                  :class="$style.detail"-->
            <!--                >-->
            <!--                  {{ errors.first('email') }}-->
            <!--                </span>-->
            <!--              </transition>-->
          </div>
        </div>
        <div :class="[$style.row, $style.vacancyRow]">
          <div :class="[$style.col, $style.colFull]">
            <template v-if="select">
              <!--                <select-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('camp') }, $style.select]"-->
              <!--                  v-model="selectedCamp"-->
              <!--                  name="campSelect"-->
              <!--                >-->
              <!--                  <option-->
              <!--                    value=""-->
              <!--                    disabled-->
              <!--                    hidden-->
              <!--                  >-->
              <!--                    Направление практики-->
              <!--                  </option>-->
              <!--                  <option-->
              <!--                    v-for="(value, index) in select"-->
              <!--                    :key="index"-->
              <!--                    :value="index"-->
              <!--                  >-->
              <!--                    {{ value.name }}-->
              <!--                  </option>-->
              <!--                </select>-->
              <!--                <input-->
              <!--                  v-validate="'required'"-->
              <!--                  v-model="selectedCamp"-->
              <!--                  name="camp"-->
              <!--                  type="hidden">-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('camp')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('camp') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </template>
            <template v-else>
              <!--                <input-->
              <!--                  v-validate="'required'"-->
              <!--                  v-model="vacancy"-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('vacancy') }]"-->
              <!--                  name="vacancy"-->
              <!--                  type="text"-->
              <!--                  placeholder="Интересующая вакансия"-->
              <!--                >-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('vacancy')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('vacancy') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </template>
          </div>
        </div>
        <div v-if="showCampCity">
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <select-->
              <!--                  v-if="cities"-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('campSelectedCity') }, $style.select]"-->
              <!--                  v-model="selectedCity"-->
              <!--                  name="campCitySelect"-->
              <!--                  placeholder="Город"-->
              <!--                >-->
              <!--                  <option-->
              <!--                    value=""-->
              <!--                    disabled-->
              <!--                    hidden-->
              <!--                  >-->
              <!--                    Город-->
              <!--                  </option>-->
              <!--                  <option-->
              <!--                    v-for="(city, cityName) in cities"-->
              <!--                    :key="cityName"-->
              <!--                    :value="cityName"-->
              <!--                  >-->
              <!--                    {{ city }}-->
              <!--                  </option>-->
              <!--                </select>-->
              <!--                <input-->
              <!--                  v-validate="'required'"-->
              <!--                  v-model="selectedCity"-->
              <!--                  name="campSelectedCity"-->
              <!--                  type="hidden">-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('campSelectedCity')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('campSelectedCity') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </div>
          </div>
          <div v-if="selectedCity === 'other'" :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-validate="'required'"-->
              <!--                  v-model="campCity"-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('campCity') }]"-->
              <!--                  name="campCity"-->
              <!--                  type="text"-->
              <!--                  placeholder="Город"-->
              <!--                >-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('campCity')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('campCity') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-model="link"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="link"-->
              <!--                  type="text"-->
              <!--                  placeholder="Ссылка на ваш профиль в социальных сетях"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <select-->
              <!--                  v-if="educations"-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('selectedStudy') }, $style.select]"-->
              <!--                  v-model="selectedStudy"-->
              <!--                  name="camp"-->
              <!--                  placeholder="Учитесь или уже окончили?"-->
              <!--                >-->
              <!--                  <option-->
              <!--                    value=""-->
              <!--                    disabled-->
              <!--                    hidden-->
              <!--                  >-->
              <!--                    Учитесь или уже окончили?-->
              <!--                  </option>-->
              <!--                  <option-->
              <!--                    v-for="(education, index) in educations"-->
              <!--                    :key="index"-->
              <!--                    :value="index"-->
              <!--                  >-->
              <!--                    {{ education }}-->
              <!--                  </option>-->
              <!--                </select>-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('selectedStudy')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('selectedStudy') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </div>
          </div>
          <div v-if="selectedStudy === 'other'" :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-validate="'required'"-->
              <!--                  v-model="study"-->
              <!--                  :class="[$style.input, {[$style.error]: errors.has('study') }]"-->
              <!--                  name="study"-->
              <!--                  type="text"-->
              <!--                  placeholder="Учитесь или уже окончили?"-->
              <!--                >-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="errors.has('study')"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ errors.first('study') }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-model="university"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="university"-->
              <!--                  type="text"-->
              <!--                  placeholder="Название вуза"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-model="department"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="department"-->
              <!--                  type="text"-->
              <!--                  placeholder="Факультет / Институт"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-model="specialty"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="specialty"-->
              <!--                  type="text"-->
              <!--                  placeholder="Специальность"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-mask="'####'"-->
              <!--                  v-model.trim="year"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="year"-->
              <!--                  type="text"-->
              <!--                  placeholder="Год окончания"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <input-->
              <!--                  v-model="diploma"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="diploma"-->
              <!--                  type="text"-->
              <!--                  placeholder="Тема диплома"-->
              <!--                >-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="languages"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="languages"-->
              <!--                  type="text"-->
              <!--                  placeholder="Перечислите языки программирования и технологии, которые вы используете (в порядке предпочтения). Оцените уровень владения ими."-->
              <!--                  @focus="languagesHint = true"-->
              <!--                  @blur="languagesHint = false"-->
              <!--                />-->
              <!--                <p-->
              <!--                  v-if="languagesHint"-->
              <!--                  :class="$style.inputLabel"-->
              <!--                >-->
              <!--                  Перечислите языки программирования и технологии, которые вы используете (в порядке предпочтения). Оцените уровень владения ими.-->
              <!--                </p>-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="achievements"-->
              <!--                  :class="[$style.input, $style.achievements]"-->
              <!--                  name="achievements"-->
              <!--                  type="text"-->
              <!--                  placeholder="Расскажите о своих достижениях - почему мы должны взять на практику именно вас? Если добились успеха в учебе - укажите средний балл зачетки. Вы участвовали в олимпиадах/конференциях/конкурсах - напишите об этом. Какие делали курсовые/дипломные работы. Если уже есть опыт работы (удаленная работа или что-то еще), то обязательно напишите об этом."-->
              <!--                  @focus="achievementsHint = true"-->
              <!--                  @blur="achievementsHint = false"-->
              <!--                />-->
              <!--                <p-->
              <!--                  v-if="achievementsHint"-->
              <!--                  :class="$style.inputLabel"-->
              <!--                >-->
              <!--                  Расскажите о своих достижениях - почему мы должны взять на практику именно вас? Если добились успеха в учебе - укажите средний балл зачетки. Вы участвовали в олимпиадах/конференциях/конкурсах - напишите об этом. Какие делали курсовые/дипломные работы. Если уже есть опыт работы (удаленная работа или что-то еще), то обязательно напишите об этом.-->
              <!--                </p>-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="expectations"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="expectations"-->
              <!--                  type="text"-->
              <!--                  placeholder="Ожидания от практики"-->
              <!--                />-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="whereFind"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="whereFind"-->
              <!--                  type="text"-->
              <!--                  placeholder="Откуда вы узнали о практике?"-->
              <!--                />-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="hobby"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="hobby"-->
              <!--                  type="text"-->
              <!--                  placeholder="Укажите дополнительную информацию о себе – увлечения, хобби, игра на музыкальных инструментах и т.п."-->
              <!--                  @focus="hobbyHint = true"-->
              <!--                  @blur="hobbyHint = false"-->
              <!--                />-->
              <!--                <p-->
              <!--                  v-if="hobbyHint"-->
              <!--                  :class="$style.inputLabel"-->
              <!--                >-->
              <!--                  Укажите дополнительную информацию о себе – увлечения, хобби, игра на музыкальных инструментах и т.п.-->
              <!--                </p>-->
            </div>
          </div>
          <div :class="[$style.row, $style.vacancyRow]">
            <div :class="[$style.col, $style.colFull]">
              <!--                <textarea-->
              <!--                  v-model="feedback"-->
              <!--                  :class="[$style.input]"-->
              <!--                  name="feedback"-->
              <!--                  type="text"-->
              <!--                  placeholder="Обратная связь - возможно, вы хотели бы получить еще какую-то информацию о нашей компании? Если вам есть что спросить - пишите, не стесняйтесь."-->
              <!--                  @focus="feedbackHint = true"-->
              <!--                  @blur="feedbackHint = false"-->
              <!--                />-->
              <!--                <p-->
              <!--                  v-if="feedbackHint"-->
              <!--                  :class="$style.inputLabel"-->
              <!--                >-->
              <!--                  Обратная связь - возможно, вы хотели бы получить еще какую-то информацию о нашей компании? Если вам есть что спросить - пишите, не стесняйтесь.-->
              <!--                </p>-->
            </div>
          </div>
        </div>
        <div :class="$style.row">
          <div :class="[$style.col, $style.colFull]">
            <p :class="$style.chooseText">{{ fileTitle }}</p>
            <div :class="$style.choose">
              <!--                <input-->
              <!--                  id="choose-file"-->
              <!--                  type="file"-->
              <!--                  accept="application/pdf, text/rtf, .txt, .doc, .docx"-->
              <!--                  @change="onFileChange"-->
              <!--                >-->
              <!--                <label for="choose-file">-->
              <!--                  Выбрать файл-->
              <!--                </label>-->
              <!--                <small v-if="resumeFileName">-->
              <!--                  {{ resumeFileName }}-->
              <!--                </small>-->
              <!--                <small v-else>-->
              <!--                  Выбранный файл не должен превышать 500 KB-->
              <!--                </small>-->
              <!--                <transition name="slide-top">-->
              <!--                  <span-->
              <!--                    v-show="fileError"-->
              <!--                    :class="$style.detail"-->
              <!--                  >-->
              <!--                    {{ fileError }}-->
              <!--                  </span>-->
              <!--                </transition>-->
            </div>
          </div>
        </div>
        <div v-if="!showCampCity" :class="$style.row">
          <div :class="[$style.col, $style.colFull]">
            <!--              <textarea-->
            <!--                v-model="resumeText"-->
            <!--                :class="$style.input"-->
            <!--                :placeholder="textAreaPlaceholder"-->
            <!--                name="resumeText"-->
            <!--                rows="6"-->
            <!--              />-->
          </div>
        </div>
        <div :class="$style.row">
          <div :class="[$style.col]">
            <!--              <input-->
            <!--                v-validate="'required'"-->
            <!--                v-model="personalData"-->
            <!--                name="terms"-->
            <!--                type="checkbox"-->
            <!--              >-->
            <!--              <small-->
            <!--                :class="$style.policyText"-->
            <!--              >-->
            <!--                Я даю согласие на обработку моих персональных данных, указанных в форме обращения и-->
            <!--                всех приложенных файлах, в ООО "Очень Интересно", с целью предложения мне вакансий-->
            <!--                ООО "Очень Интересно". Я понимаю и соглашаюсь, что мои данные будут храниться и обрабатываться в-->
            <!--                ООО "Очень Интересно" в течение пяти лет, в соответствии с Федеральным законом "О персональных данных"-->
            <!--                и <a-->
            <!--                aria-label="Политикой обработки персональных данных"-->
            <!--                target="_blank"-->
            <!--                rel="noreferrer noopener"-->
            <!--                href="/static/docs/privacy_policy.pdf">Политикой обработки персональных данных</a>.-->
            <!--              </small>-->
            <!--              <transition name="slide-top">-->
            <!--                <span-->
            <!--                  v-show="errors.has('terms')"-->
            <!--                  :class="$style.detail"-->
            <!--                >-->
            <!--                  Ваше согласие обязательно.-->
            <!--                </span>-->
            <!--              </transition>-->
          </div>
        </div>
        <div :class="$style.captchaWrapper">
          <!--            <vue-recaptcha-->
          <!--              ref="recaptcha"-->
          <!--              :sitekey="sitekey"-->
          <!--              :load-recaptcha-script="true"-->
          <!--              @verify="onVerify"-->
          <!--            />-->
          <div :class="$style.robot">
            <!--              <transition name="slide-top">-->
            <!--                <div v-show="pleaseTickRecaptchaMessage">-->
            <!--                  {{ pleaseTickRecaptchaMessage }}-->
            <!--                </div>-->
            <!--              </transition>-->
          </div>
        </div>
        <!--          <button-->
        <!--            :class="[$style.submit, {[$style.submitCamp]: showCampCity }]"-->
        <!--            :disabled="job.id === undefined"-->
        <!--            type="submit"-->
        <!--            aria-label="Подтвердить форму"-->
        <!--          >-->
        <!--            Отправить-->
        <!--          </button>-->
        <div
          v-if="thanksMessage"
          :class="$style.thanksMessage"
        >
          {{ thanksMessage }}
        </div>
      </form>
    </div>
    <ContactsListBlock v-if="!showCampCity" />
  </section>
</template>

<script setup>
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

defineRule('required', value => {
  if (!value || !value.length) {
    return 'This field is required';
  }
  return true;
});
defineRule('email', email);
defineRule('min', min);
import { useJobsStore } from '@/store/useJobs.js';
import { useRoute } from 'vue-router/auto';

const { fetchJobs } = useJobsStore();
const { jobs } = storeToRefs(useJobsStore());

import Hero from '@/components/Hero.vue';
import ContactsListBlock from '@/components/ContactsListBlock.vue';
import { VueRecaptcha } from 'vue-recaptcha';
// import { VueMaskDirective } from 'v-mask';
// import { mapActions, mapGetters } from 'vuex';
// import { FETCH_JOBS } from 'store/actions';
// import { sendResume } from 'data';
// import { GET_JOBS } from 'store/getters';
import { JOB } from '@/router/index.js';
// import showModal from '../helpers';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const props = defineProps(
  {

    title: {
      type: String,
      required: false,
      default: 'Связаться с нами',
    },
    fileTitle: {
      type: String,
      required: false,
      default: 'Прикрепить резюмe',
    },
    select: {
      type: Array,
      required: false,
      default: undefined,
    },
    bgColor: {
      type: String,
      required: false,
      default: '#7f7f7',
    },

    showCampCity: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
);

const job = ref([]);
const vacancy = ref('');
const firstname = ref('');
const selectVal = ref(0);
const thanksMessage = ref('');

function filterJob(boardCode) {
  const currentJob = jobs.value.filter(job => job.board_code === boardCode)[0];

  job.value = currentJob;
  vacancy.value = currentJob?.title;

  return currentJob;
}

const filteredJob = computed(() => {
  if (jobs.value.length === 0) {
    return false;
  }

  const currentJobBoardCode = useRoute().query.job || props.select.value[selectVal.value].value;

  return filterJob(currentJobBoardCode);
});

const renderJob = computed(() => !!useRoute().query.job);

function submitForm() {
  console.log(1);
}

// export default {
//   name: 'BaseForm',
//   components: {
//     Hero,
//     VueRecaptcha,
//     ContactsListBlock,
//   },
//   filters: {
//     jobTitle: title => title.replace('(RU)', ''),
//   },
//   directives: {
//     mask: VueMaskDirective,
//   },
//   props: {
//     bgColor: {
//       type: String,
//       required: false,
//       default: '#7f7f7',
//     },
//     title: {
//       type: String,
//       required: false,
//       default: 'Связаться с нами',
//     },
//     fileTitle: {
//       type: String,
//       required: false,
//       default: 'Прикрепить резюмe',
//     },
//     select: {
//       type: Array,
//       required: false,
//       default: undefined,
//     },
//     showCampCity: {
//       type: Boolean,
//       required: false,
//       default: false,
//     },
//     textAreaPlaceholder: {
//       type: String,
//       required: false,
//       default: 'Или напишите резюме здесь',
//     },
//     namePrefix: {
//       type: String,
//       required: false,
//       default: '',
//     },
//   },
//   data() {
//     return {
//       achievements: '',
//       campCity: '',
//       cityVal: 0,
//       department: '',
//       diploma: '',
//       email: '',
//       expectations: '',
//       feedback: '',
//       fileError: false,
//       firstname: '',
//       hobby: '',
//       job: [],
//       languages: '',
//       lastname: '',
//       link: '',
//       personalData: false,
//       phone: '',
//       pleaseTickRecaptchaMessage: '',
//       recaptchaVerified: false,
//       resumeFile: '',
//       resumeFileName: '',
//       resumeText: '',
//       selectVal: 0,
//       selectedCamp: '',
//       selectedCity: '',
//       selectedStudy: '',
//       sitekey: '6Lco8VEUAAAAAJ4BaSfaC1jAfjyPubO3D4lFkMqk',
//       specialty: '',
//       study: '',
//       thanksMessage: '',
//       university: '',
//       vacancy: '',
//       whereFind: '',
//       year: '',
//       cities: {
//         ekaterinburg: 'Екатеринбург',
//         krasnoyarsk: 'Красноярск',
//         sochi: 'Сочи',
//         other: 'Другой',
//       },
//       educations: {
//         bachelor: 'Студент бакалавриата',
//         master: 'Студент магистратуры',
//         specialist: 'Студент специалитета',
//         graduateStudent: 'Аспирант',
//         other: 'Другое',
//       },
//       feedbackHint: false,
//       languagesHint: false,
//       achievementsHint: false,
//       hobbyHint: false,
//     };
//   },
//   computed: {
//     ...mapGetters({
//       jobs: GET_JOBS,
//     }),
//     isJobPage() {
//       return this.$route.name === JOB;
//     },
//     renderJob() {
//       return !!this.$route.query.job;
//     },
//     filteredJob() {
//       if (this.jobs.length === 0) {
//         return false;
//       }
//
//       const currentJobBoardCode =
//         this.$route.query.job || this.select[this.selectVal].value;
//
//       return this.filterJob(currentJobBoardCode);
//     },
//   },
//   created() {
//     // Loading recaptch script.
//     const script = document.createElement('script');
//     script.src =
//       'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//
//     this.$validator.localize('ru', {
//       attributes: {
//         firstname: 'Имя',
//         lastname: 'Фамилия',
//         phone: 'Телефон',
//         camp: 'Напрвление практики',
//         campSelectedCity: 'Город',
//         vacancy: 'Интересующая вакансия',
//         email: 'E-mail',
//         campCity: 'Город',
//         study: 'Образование',
//       },
//     });
//   },
//
//   methods: {
//     ...mapActions([FETCH_JOBS]),
//     submitForm() {
//       if (!this.recaptchaVerified) {
//         this.pleaseTickRecaptchaMessage = 'Подтвердите что вы не робот.';
//         this.$validator.validateAll();
//         return false;
//       }
//       if (this.fileError) {
//         return false;
//       }
//
//       this.$validator.validateAll().then(result => {
//         if (result) {
//           if (this.selectedCamp) {
//             this.filterJob(this.select[this.selectedCamp].value);
//           }
//           const data = {
//             firstname: this.firstname,
//             lastname: `${this.lastname} ${this.namePrefix}`,
//             phone: this.phone,
//             vacancy: this.vacancy,
//             email: this.email,
//             resumeText: this.resumeText,
//             resumeFile: this.resumeFile,
//             resumeFileName: this.resumeFileName,
//             jobID: this.job.id,
//             city: this.$route.query.city || this.camp,
//             campCity: this.campCity,
//             hash: this.hash,
//           };
//
//           if (this.showCampCity) {
//             data.fromCampPage = true;
//             data.campCity = this.campCity || this.cities[this.selectedCity];
//             data.city = this.campCity || this.cities[this.selectedCity];
//             data.study = this.study || this.educations[this.selectedStudy];
//             data.university = this.university;
//             data.department = this.department;
//             data.specialty = this.specialty;
//             data.year = this.year;
//             data.diploma = this.diploma;
//             data.languages = this.languages;
//             data.achievements = this.achievements;
//             data.expectations = this.expectations;
//             data.whereFind = this.whereFind;
//             data.hobby = this.hobby;
//             data.feedback = this.feedback;
//             data.link = this.link;
//           }
//           sendResume(data)
//             .then(() => {
//               this.firstname = '';
//               this.lastname = '';
//               this.phone = '';
//               this.vacancy = '';
//               this.email = '';
//               this.resumeText = '';
//               this.resumeFile = '';
//               this.resumeFileName = '';
//               this.personalData = false;
//               this.campCity = '';
//               this.city = '';
//               this.selectedCity = '';
//               this.study = '';
//               this.selectedStudy = '';
//               this.university = '';
//               this.department = '';
//               this.specialty = '';
//               this.year = '';
//               this.diploma = '';
//               this.languages = '';
//               this.achievements = '';
//               this.expectations = '';
//               this.whereFind = '';
//               this.hobby = '';
//               this.feedback = '';
//               this.link = '';
//               this.$emit('closePopup', true);
//               this.$validator.reset();
//               this.showModal(true);
//             })
//             .catch(() => {
//               this.$emit('closePopup', false);
//               this.showModal(false);
//             });
//         }
//         return false;
//       });
//       return true;
//     },
//     onChangePhone(event) {
//       this.phone = event.target.value;
//       this.$emit('input', this.phone);
//     },
//     onFileChange(e) {
//       const files = e.target.files || e.dataTransfer.files;
//       if (!files.length) {
//         this.fileError = false;
//         return;
//       }
//
//       const ext = /\.(pdf|doc|docx|txt|rtf)$/i.test(e.target.files[0].name);
//       if (!ext) {
//         let msg = 'Файл должен быть в формате';
//         if (this.isJobPage) {
//           msg = 'Пожалуйста прикрепите резюме в формате';
//         }
//         this.fileError = `${msg} pdf, doc, docx, txt, rtf`;
//         return;
//       }
//
//       const attachSize = 0.5 * 1024 * 1024;
//       const attachFile = e.target.files[0];
//       if (attachFile.size > attachSize) {
//         let msg = 'Размер файла привышает';
//         if (this.isJobPage) {
//           msg = 'Размер резюме больше';
//         }
//         this.fileError = `${msg} 500 KB`;
//         return;
//       }
//
//       this.fileError = false;
//       this.createFile(files[0]);
//     },
//     createFile(file) {
//       const reader = new FileReader();
//       const vm = this;
//
//       reader.onload = e => {
//         vm.resumeFile = e.target.result;
//         vm.resumeFileName = file.name;
//       };
//       reader.readAsDataURL(file);
//     },
//     removeFile() {
//       this.resumeFile = '';
//     },
//     onVerify() {
//       this.pleaseTickRecaptchaMessage = '';
//       this.recaptchaVerified = true;
//     },
//     onExpired() {},
//     resetRecaptcha() {
//       this.$refs.recaptcha.reset();
//     },
//     filterJob(boardCode) {
//       const currentJob = this.jobs.filter(
//         job => job.board_code === boardCode,
//       )[0];
//
//       this.job = currentJob;
//       this.vacancy = currentJob.title;
//
//       return currentJob;
//     },
//     showModal,
//   },
// };
</script>

<style lang="scss" module>
//@import '@/scss/variables';
@import '@/scss/helpers';

.root {
  @extend %section;
  text-align: left;
}

.root.backgrounded {
  background: var(--white-gray);
}

.container {
  @extend %container;
  max-width: 1170px;
}

.formContainer {
  max-width: 790px;
}

.row {
  display: flex;
  flex-wrap: nowrap;
  margin-left: calc(-1 * var(--grid-gutter));
  margin-right: calc(-1 * var(--grid-gutter));
}

.vacancyRow {
  margin-top: 10px;
  @media(width < 480px) {
    margin-top: 0;
  }
}

.col {
  position: relative;
  padding: 5px 10px 25px;
}

.colHalf {
  width: 50%;

  @media(width <= 480px) {
    width: 100%;
  }
}

.colFull {
  width: 100%;
}

.contentTitle {
  font-size: clamp(20px, 5vw, 24px);
  margin: 0 0 20px;
  color: var(--red);

  @media(width <= 480px) {
    text-align: center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  * {
    text-wrap: pretty;
  }
}

.content :where(p, strong, li) {
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-dark);
}

.content strong {
  display: block;
  color: var(--blue);

  @media(width <= 480px) {
    text-align: center;
  }
}

.content ul {
  list-style: none;
  margin-left: 20px;
}

.content li {
  position: relative;
  list-style: disc;

  &::marker {
    font-size: 14px;
  }
}

.title {
  @extend %sectionTitle;
  margin: 0 0 clamp(46px, 5vw, 60px);
  text-align: center;
}

.input {
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid var(--gray-4);
  border-radius: 5px;
  outline: none;
  background-color: var(--white);
  color: var(--gray-dark);
  resize: vertical;

  @media(width < 768px) {
    margin-top: clamp(0px, 5vw, 10px);
  }

  &:focus {
    border-color: var(--gray-3);
  }
}

.input::placeholder {
  word-break: break-word;
}

.input.error {
  border-color: var(--red-light);
  background-color: var(--transparent);
}

.select {
  cursor: pointer;
  padding-right: 30px;
}

.select option {
  color: var(--black);
}

.select option[disabled] {
  display: none;
}

.placeholder {
  color: #2e2e2eb3;
}

.captchaWrapper {
  margin-bottom: 55px;
}

.submit {
  @extend %button;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  @media(width <= 480px) {
    display: block;
    margin: 0 auto;
    width: auto;
    padding-block: 15px;
  }

  &:disabled {
    background-color: var(--red-light);
  }
}

.choose {
  font-size: 0;
}

.choose input {
  display: none;
}

.choose label {
  font-size: 10px;
  line-height: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  padding: 5px 10px;
  border: 2px solid var(--red-light);
  border-radius: 50px;
  color: var(--red-light);
  font-weight: bold;
  text-transform: uppercase;

  @media(width <= 480px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

.choose input + label {
  cursor: pointer;
}

.choose small {
  font-size: 14px;
  line-height: 16px;
  display: inline-block;
  vertical-align: middle;
  color: var(--gray-3);

  @media(width <= 480px) {
    display: block;
  }
}

.chooseText {
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 20px;
  color: var(--gray-dark);
}

.inputLabel {
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 5px;
  color: var(--gray-5);
}

.detail {
  font-size: 12px;
  line-height: 14px;
  position: absolute;
  top: calc(100% - 20px);
  left: var(--grid-gutter);
}

.robot {
  font-size: 12px;
  line-height: 14px;

  height: 30px;
  color: var(--red-light);
  display: flex;
  align-items: center;
}

.policyText {
  word-break: break-word;
}

.submitCamp {
  font-size: 20px;
}

.achievements {
  min-height: 150px;
}
</style>

<style lang="scss">
/* stylelint-disable */
.slide-top-enter-active,
.slide-top-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s, opacity 0.5s;
}

.slide-top-enter,
.slide-top-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>

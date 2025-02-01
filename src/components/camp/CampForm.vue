<template>
  <div>
    <el-dialog
      :class="$style.dialog"
      :visible.sync="dialogVisible"
      :top="$mq !== 'lg' ? '0' : '5vh'"
    >
      <section :class="$style.root">
        <BaseForm
          :select="[
            {
              name: 'DevOps',
              value: '1KGkguBAGo',
            },
          ]"
          :show-camp-city="true"
          :hash="hash"
          bg-color="#fff"
          title="Отправить заявку"
          file-title="Прикрепить резюме"
          name-prefix=" - Практикант"
          text-area-placeholder="Или напишите текст здесь"
          @closePopup="closePopup"
        />
      </section>
    </el-dialog>
    <section>
      <v-dialog/>
    </section>
    <section
      :class="[$style.root]"
    >
      <div :class="[$style.container, $style.formContainer]">
        <div :class="$style.row">
          <div :class="[$style.col, $style.sendFeedback]">
            <button
              :class="$style.submit"
              aria-label="Отправить заявку"
              @click="dialogVisible = true;"
            >
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RotatedHeading from 'components/RotatedHeading';
import BaseForm from 'components/BaseForm';
import ContactsListBlock from 'components/ContactsListBlock';
import showModal from '../helpers';

export default {
  name: 'CampForm',
  components: {
    RotatedHeading,
    BaseForm,
    ContactsListBlock,
  },
  data() {
    return {
      dialogVisible: false,
      hash: '',
    };
  },
  methods: {
    closePopup(success) {
      this.dialogVisible = false;
      this.showModal(success);
    },
    showModal,
  },
};
</script>

<style lang="scss" module>
/* stylelint-disable max-nesting-depth */
@import '../styles/variables';
@import '../styles/helpers';

.root {
  text-align: center;
  padding: 0;
}

.root.backgrounded {
  background: $white-gray;
}

.container {
  @extend %container;
  max-width: 1170px;
}

.formContainer {
  max-width: 770px;
  padding-top: 55px;
}

.submit {
  @extend %button;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;

  @include media('<=phone') {
    display: block;
    margin: 0 auto;
    width: auto;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  &:disabled {
    background-color: $red-light;
  }
}

.row {
  display: flex;
  flex-wrap: nowrap;
  margin-left: -$grid-gutter;
  margin-right: -$grid-gutter;

  @include media('<=phone') {
    flex-wrap: wrap;
    margin-right: -$grid-gutter-mobile;
    margin-left: -$grid-gutter-mobile;
  }
}

.col {
  position: relative;
  padding: 5px 10px 25px;
}

.sendFeedback {
  margin: 0 auto;
}

.dialog {
  @include media('<desktop') {
    [role='dialog'] {
      width: 100%;
    }

    [class='el-dialog__body'] {
      padding: 0;
      margin-top: 10px;
    }
  }
}
</style>

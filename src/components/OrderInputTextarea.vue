<template>
  <label class="form__label" :for="naming">
    <textarea class="form__input form__input--area"
              :id="naming"
              :placeholder="placeholder"
              v-model="dataValue"></textarea>
    <span class="form__value">{{title}}</span>
    <span class="form__error" v-if="error">{{error}}</span>
  </label>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>

<template>
  <label class="form__label" :for="naming">
    <input class="form__input" type="text"
           :id="naming"
           :placeholder="placeholder"
            v-model="dataValue">
    <span class="form__value">{{title}}</span>
    <span class="form__error">{{error}}</span>
  </label>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>

<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilter">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="priceFrom">
          <input class="form__input" type="text" name="min-price" id="priceFrom"
                 v-model="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="priceTo">
          <input class="form__input" type="text" name="max-price" id="priceTo"
                 v-model="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="categories">
          <select class="form__select" name="category" id="categories"
                  v-model="currentCategoryId">
            <option :value="0">Все категории</option>
            <option :value="category.id"
                    v-for="category in categories"
                    :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label" :for="color.id">
              <input class="colors__radio sr-only" type="radio" name="color"
                     :value="color.id"
                     v-model="currentColor"
                     :id="color.id">
              <span class="colors__value" :style="'background-color:' + color.code + ';'">
                  </span>
            </label>
          </li>
        </ul>

        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label" for="value8">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8"
                     checked=""
                     id="value8">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>

            <label class="check-list__label" for="value16">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16"
                     id="value16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="value32">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32"
                     id="value32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>

            <label class="check-list__label" for="value64">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64"
                     id="value64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="value128">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128"
                     id="value128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>

            <label class="check-list__label" for="value264">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264"
                     id="value264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button"
              @click.prevent="resetFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { BASE_URL_API } from '@/confing';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 0,
      categoriesList: null,
      productsColors: null,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  computed: {
    categories() {
      return this.categoriesList ? this.categoriesList.items : [];
    },
    colors() {
      return this.productsColors ? this.productsColors : [];
    },
  },
  methods: {
    loadCategories() {
      axios.get(`${BASE_URL_API}/productCategories`)
        .then((response) => {
          this.categoriesList = response.data;
        });
    },
    loadColors() {
      axios.get(`${BASE_URL_API}/colors`)
        .then((response) => { this.productsColors = response.data.items; });
    },
    submitFilter() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color-id', this.currentColor);
    },
    resetFilter() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', 'blue');
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentColor = 0;
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>

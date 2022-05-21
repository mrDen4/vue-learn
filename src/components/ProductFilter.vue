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
          <input class="form__input" type="text" name="max-price" value="12345" id="priceTo"
                 v-model="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="categories">
          <select class="form__select" type="text" name="category" id="categories"
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
          <li class="colors__item" v-for="color in colors" :key="color.name">
            <label class="colors__label" :for="color.name">
              <input class="colors__radio sr-only" type="radio" name="color"
                     :value="color.name"
                     v-model="currentColor"
                     :id="color.name">
              <span class="colors__value" :style="'background-color:' + color.name + ';'">
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
import categories from '@/data/productsCategory';
import colors from '@/data/productsColors';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 'blue',
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
  methods: {
    submitFilter() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
    },
    resetFilter() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', 'blue');
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentColor = 'blue';
    },

  },
};
</script>

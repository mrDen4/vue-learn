<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a :class="{'pagination__link--disabled': page == 1}" aria-label="Предыдущая страница"
         class="pagination__link pagination__link--arrow" href="#"
         @click.prevent="previousPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in countPages" :key="pageNumber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNumber === page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}</a>
    </li>
    <li class="pagination__item">
      <a :class="{'pagination__link--disabled': page == this.countPages}"
         aria-label="Следующая страница" class="pagination__link pagination__link--arrow"
         href="#"
         @click.prevent="nextPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue', 'perPage', 'countItems'],
  computed: {
    page() {
      return this.modelValue;
    },
    countPages() {
      return Math.ceil(this.countItems / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('update:modelValue', page);
    },
    nextPage(page) {
      if (page < this.countPages) {
        this.$emit('paginate', page + 1);
      }
    },
    previousPage(page) {
      if (page > 1) {
        this.$emit('paginate', page - 1);
      }
    },
  },
};
</script>

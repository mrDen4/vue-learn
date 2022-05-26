<template>
  <div>
    <a class="catalog__pic" href="#"
       @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
            {{product.price | numberFormat}} ₽
          </span>
  </div>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
};
</script>

<template>
  <ul class="catalog__list">
    <ProductItems class="catalog__item" :products="products"/>
  </ul>
</template>

<script>
import ProductItems from '@/components/ProductItems.vue';

export default {
  components: { ProductItems },
  props: ['products'],
};
</script>

<template>
    <section class="catalog">
      <ProductList :products="products"/>
    </section>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import products from './data/products';

export default {
  name: 'App',
  components: { ProductList },
  data() {
    return {
      products,
    };
  },
};

</script>

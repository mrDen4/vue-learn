<template>
  <div class="content__catalog">
    <ProductFilter
      :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId"
      :color.sync="filterColor"/>
    <section class="catalog">
      <ProductList :products="products"/>
      <BasePagination v-model="page" :per-page="productsPerPage" :count-items="countProducts"/>
    </section>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import products from './data/products';

export default {
  name: 'App',
  components: { ProductFilter, ProductList, BasePagination },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 'blue',
      page: 1,
      productsPerPage: 5,
    };
  },
  computed: {
    filterProducts() {
      let filterProducts = products;

      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filterProducts = filterProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColor) {
        filterProducts = filterProducts
          .filter((product) => product.color === this.filterColor);
      }

      return filterProducts;
    },
    countProducts() {
      return this.filterProducts.length;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filterProducts.slice(offset, offset + this.productsPerPage);
    },
  },
};

</script>

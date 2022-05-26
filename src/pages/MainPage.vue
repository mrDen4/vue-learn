<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
        :colors="uniqColors"/>
      <section class="catalog">
        <ProductList :products="products"
                     @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"/>
        <BasePagination v-model="page" :per-page="productsPerPage" :count-items="countProducts"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import products from '@/data/products';

export default {
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
    uniqColors() {
      const productsColor = products.map((product) => product.color);
      const productsColorSet = new Set(productsColor);
      const uniqColors = [...productsColorSet];
      return uniqColors;
    },
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

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
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color-id="filterColor"/>
      <section class="catalog">
        <h1 v-if="productsLoading">Идет загрузка товаров ...</h1>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :per-page="productsPerPage" :count-items="countProducts"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { BASE_URL_API } from '@/confing';

export default {
  components: { ProductFilter, ProductList, BasePagination },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 5,
      productsData: null,
      productsLoading: false,
      productsColors: [],
    };
  },
  computed: {
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      })) : [];
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${BASE_URL_API}/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};

</script>

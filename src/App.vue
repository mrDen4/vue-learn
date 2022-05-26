<template>
  <div>
    <component :is="CurrentPageComponent"
               @goToPage="(pageName, pageParams) => goToPage(pageName, pageParams)"/>
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
  notFound: 'NotFoundPage',
};

export default {
  name: 'App',
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    goToPage(page, params) {
      this.currentPage = page;
      this.currentPageParams = params || {};
    },
  },
  computed: {
    CurrentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
};

</script>

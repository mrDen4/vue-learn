<template>
  <div>
    <component :is="CurrentPageComponent" :page-params="currentPageParams"/>
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import eventBus from '@/eventBus';

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
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  },
};

</script>

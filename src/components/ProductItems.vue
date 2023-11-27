<template>
  <li v-bind="$attrs" v-for="product in productsNormilized" :key="product.id">
    <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#" @click.prevent="openQuickView(product.id)">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
            {{product.pricePretty}} ₽
    </span>
  </li>

  <base-modal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentProductId"/>
  </base-modal>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import BaseModal from '@/components/BaseModal.vue';
import ProductQuickView from '@/components/ProductQuickView.vue';

export default {
  components: { BaseModal, ProductQuickView },
  data() {
    return {
      isOpenModal: false,
      currentProductId: null,
    };
  },
  inheritAttrs: false,
  props: ['products'],
  methods: {
    goToPage,
    openQuickView(productId) {
      this.currentProductId = productId;
    },
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpenModal) {
        if (!isOpenModal) {
          this.currentProductId = null;
        }
      },
    },
    productsNormilized() {
      return this.products.map((product) => ({
        ...product,
        pricePretty: numberFormat(product.price),
      }));
    },
  },
};
</script>

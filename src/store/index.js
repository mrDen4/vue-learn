import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 1 },
    ],
  },
  mutations: {
    addToCartProducts(state, { productId, amount }) {
      const isDouble = state.cartProducts.find((item) => item.productId === productId);
      if (isDouble) {
        isDouble.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
  },
});

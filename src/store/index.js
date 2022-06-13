import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { BASE_URL_API } from '@/confing';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    colorProducts: [],
    orderId: null,
    orderInfo: [],
  },
  mutations: {
    addOrderInfo(state, info) {
      state.orderInfo = info;
      state.orderId = info.id;
    },
    resetCartProducts(state) {
      state.cartProducts = [];
    },
    updateCartProduct(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    updateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    sumCartProducts(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadCartProducts(context) {
      return axios
        .get(`${BASE_URL_API}/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!this.state.userAccessKey) {
            context.commit('updateUserAccessKey', response.data.user.accessKey);
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addToCartProducts(context, { productId, amount }) {
      return axios.post(
        `${BASE_URL_API}/baskets/products`,
        {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductsAmount(context, { productId, amount }) {
      context.commit('updateCartProduct', { productId, amount });
      if (amount < 1) {
        return;
      }

      axios.put(
        `${BASE_URL_API}/baskets/products`,
        {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      axios.delete(
        `${BASE_URL_API}/baskets/products`,
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadOrderInfo(context, id) {
      axios.get(`${BASE_URL_API}/orders/${id}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => context.commit('addOrderInfo', response.data));
    },
  },
});

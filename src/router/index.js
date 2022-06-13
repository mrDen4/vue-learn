import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderSuccessPage from '@/pages/OrderSuccessPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', path: '/', component: MainPage },
  { name: 'product', path: '/product/:id', component: ProductPage },
  { name: 'notFound', path: '*', component: NotFoundPage },
  { name: 'cart', path: '/cart', component: CartPage },
  { name: 'order', path: '/order', component: OrderPage },
  { name: 'orderInfo', path: '/order/:id', component: OrderSuccessPage },
];
const router = new VueRouter({
  routes,
});

export default router;

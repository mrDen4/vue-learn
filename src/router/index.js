import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderSuccessPage from '@/pages/OrderSuccessPage.vue';
import config from '../../vue.config';

const routes = [
  { name: 'main', path: '/', component: MainPage },
  { name: 'product', path: '/product/:id', component: ProductPage },
  { name: 'notFound', path: '/:pathMatch(.*)*', component: NotFoundPage },
  { name: 'cart', path: '/cart', component: CartPage },
  { name: 'order', path: '/order', component: OrderPage },
  { name: 'orderInfo', path: '/order/:id', component: OrderSuccessPage },
];
const router = createRouter({
  history: createWebHashHistory(config.publicPath),
  routes,
});

export default router;

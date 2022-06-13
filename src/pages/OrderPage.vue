<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="submitOrder">
        <div class="cart__field">
          <div class="cart__data">
            <OrderInputText
              title="ФИО"
              naming="fio"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :error="errorFormData.name"/>
            <OrderInputText
              title="Адрес доставки"
              naming="address"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :error="errorFormData.address"/>
            <OrderInputText
              title="Телефон"
              naming="phone"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
              :error="errorFormData.phone"/>
            <OrderInputText
              title="Email"
              naming="email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
              :error="errorFormData.email"/>
            <OrderInputTextarea
              title="Комментарий к заказу"
              naming="comment"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
              :error="errorFormData.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="pickup">
                  <input class="options__radio sr-only" type="radio" id="pickup"
                         name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="delivery">
                  <input class="options__radio sr-only" type="radio" id="delivery"
                         name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="card">
                  <input class="options__radio sr-only" type="radio" id="card"
                         name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="cash">
                  <input class="options__radio sr-only" type="radio" id="cash"
                         name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <OrderCart/>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderCart from '@/components/OrderCart.vue';
import OrderInputText from '@/components/OrderInputText.vue';
import OrderInputTextarea from '@/components/OrderInputTextarea.vue';
import axios from 'axios';
import { BASE_URL_API } from '@/confing';

export default {
  components: { OrderInputTextarea, OrderCart, OrderInputText },
  data() {
    return {
      formData: {},
      errorFormData: {},
    };
  },
  methods: {
    submitOrder() {
      // this.errorFormData = {};
      axios
        .post(`${BASE_URL_API}/order`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        // .then(() => {
        //   this.$store.commit('resetCartProducts');
        // })
        .catch((response) => {
          this.errorFormData = response.data;
        });
    },
  },
};
</script>

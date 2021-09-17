<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{
              name: 'main',
            }"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{
              name: 'order',
            }"
          >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $route.params.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul v-if="dataOrderPage" class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ dataOrderPage.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ dataOrderPage.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">
                {{ dataOrderPage.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value">
                {{ dataOrderPage.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <CartOrders
          v-if="products"
          :products="products"  
          :totalAmount="totalAmount"
          :totalPrice="totalPrice"
        />
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import CartOrders from "@/components/CartOrders";

export default {
  data() {
    return {
      dataOrderPage: null,
      products: null,
      totalAmount: 0,
      totalPrice: 0,
    };
  },
  components: {
    CartOrders,
  },
  methods: {
    ...mapActions(["loadOrderInfo"]),
  },
  watch: {
    "$route.params.id": {
      handler() {
        if (
          this.$store.state.orderInfo &&
          this.$store.state.orderInfo.id === this.$route.params.id
        ) {
          return;
        }
        this.loadOrderInfo(this.$route.params.id).then((orderInfo) => {
          console.log(orderInfo);
          this.dataOrderPage = orderInfo.data;
          this.products = orderInfo.data.basket.items;
          this.totalAmount = orderInfo.data.basket.items.reduce(
            (price, item) => {
              return price + item.quantity;
            },
            0
          );
          this.totalPrice = orderInfo.data.totalPrice;
        });
      },
      immediate: true,
    },
  },
};
</script>
<template>
  <router-link
    class="header__cart"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ totalAmount }}
    </span>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      basket: [],
    };
  },
  computed: {
    totalAmount() {
      return this.basket.reduce(
        (amount, product) => (amount += product.quantity),
        0
      );
    },
  },
  methods: {
    ...mapActions(["loadCart"]),
  },
  watch: {
    "$store.state.cartProducts": {
      handler() {
        this.loadCart().then((response) => (this.basket = response.data.items));
      },
      immediate: true,
    },
  },
};
</script>

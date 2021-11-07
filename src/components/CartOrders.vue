<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItem :key="item.productId" :item="item" v-for="item in products" />
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ deliveryPrice }} ₽</b>
      </p>
      <p>
        Итого: <b>{{ totalAmount }}</b> товар(а) на сумму
        <b>{{ (totalPrice + deliveryPrice) }} ₽</b>
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem";

export default {
  props: {
    products: Array,
    totalPrice: {
      Number,
      default: 0,
    },
    totalAmount: {
      Number,
      default: 0,
    },
  },
  data() {
    return {
      deliveryPrice: 500,
    };
  },
  components: {
    OrderItem,
  },
};
</script>

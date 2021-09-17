<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItem
        :key="item.productId"
        :item="item"
        v-for="item in products()"
      />
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ deliveryPrice | numberFormat }} ₽</b>
      </p>
      <p>
        Итого: <b>{{ totalAmount() }}</b> товар(а) на сумму
        <b>{{ (totalPrice() + deliveryPrice) | numberFormat }} ₽</b>
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderItem from "@/components/OrderItem";
import numberFormat from "@/helpers/numberFormat";

export default {
  data() {
    return {
      deliveryPrice: 500,
    };
  },
  components: {
    OrderItem,
  },
  methods: {
    ...mapGetters({
      products: "cartDetail",
      totalPrice: "cartTotalPrice",
      totalAmount: "cartTotalNumber",
    }),
  },
  filters: {
    numberFormat,
  },
};
</script>
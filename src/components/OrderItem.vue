<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ (item.product.price * (item.amount ? item.amount : item.quantity)) | numberFormat }} ₽</b>
    <b>Колличество: {{(item.amount ? item.amount : item.quantity)}}</b>
    <span>Артикул: {{ (item.productId ? item.productId : item.product.id) }}</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
export default {
  props: {
    item: Object,
  },
  filters: {
    numberFormat,
  },
};
</script>

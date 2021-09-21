<template>
  <ul class="catalog__list">
    <ProductItem
      :product="product"
      v-for="product in products"
      :key="product.id"
    />
  </ul>
</template>

<script>
import ProductItem from "./ProductItem";
export default {
  props: ["products"],
  components: { ProductItem },
};
</script>

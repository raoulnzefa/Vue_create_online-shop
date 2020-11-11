<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id" :color.sync="color"/>
  </ul>
</template>

<script>
import ProductItem from "./ProductItem";
export default {
  props: ["products", "color"],
  components: { ProductItem },
  computed: {
    filterColor() {
      
    }
  }
};
</script>

<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :color.sync="colorActive" :price-from.sync='filterPriceFrom' :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId"/>

      <section class="catalog">
        <ProductList :products="products" :color.sync="colorActive"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import products from "./data/products";
import colors from "./data/colors";
import ProductList from "./components/ProductList";
import BasePagination from "./components/BasePagination";
import ProductFilter from "./components/ProductFilter";

export default {
  name: "App",
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      colorActive: '#73B6EA',
      page: 1,
      productsPerPage: 3
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      };

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      };

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoriesId === this.filterCategoryId);
      };

      if (this.colorActive) {
        filteredProducts = filteredProducts.filter(product => product.activeColor === this.colorActive);
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    }
  }
};
</script>

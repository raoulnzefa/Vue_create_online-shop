<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{
        name: 'product',
        params: {
          id: product.id,
        },
      }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a @click.prevent="openQuickView(product.id)" href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <li
        :key="colorInfo.title"
        v-for="colorInfo in product.colors"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="colorInfo.id"
          />
          <span
            class="colors__value"
            :style="{
              'background-color': colorInfo.code,
            }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
  <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product_id="currentProductId"></ProductQuickView>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

import numberFormat from "@/helpers/numberFormat.js";
import { defineAsyncComponent, h } from "vue";

export default {
  props: {
    product: Object,
  },
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => {
        return import("@/components/ProductQuickView.vue");
      },
      delay: 0,
      loadingComponent: () => {
        return h("div", "Загрузка...");
      },
    }),
  },
  data() {
    return {
      currentProductId: null,
    };
  },
  methods: {
    openQuickView(productId) {
      this.currentProductId = productId;
      this.isQuickViewOpen = true;
    },
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    pricePretty: () => {
      return numberFormat(this.product.price);
    },
  },
};
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ numberProducts }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              :key="item.productId"
              v-for="item in products"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <router-link v-slot="{ navigate }" :to="{ name: 'order' }" custom>
            <button
              @click="navigate"
              type="submit"
              :disabled="products.length < 1"
              class="cart__button button button--primery"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem";
import numberFormat from "@/helpers/numberFormat";

export default defineComponent({
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      products: "cartDetail",
      totalPrice: "cartTotalPrice",
      numberProducts: "cartTotalNumber",
    }),
    totalPricePretty: () => {
      return numberFormat(this.totalPrice);
    },
  },
});
</script>

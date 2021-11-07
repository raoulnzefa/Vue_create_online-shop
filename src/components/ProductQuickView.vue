<template>
  <div v-if="productStatus.isLoading">
    Загрузка товара...
  </div>
  <div v-else-if="productStatus.isFailed">
    Не удалось загрузить товар
  </div>
  <div v-else>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="productsData.image.file.url"
            :alt="productsData.title"
          />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productsData.id }}</span>
        <h2 class="item__title">{{ productsData.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="
              addToCart({ productId: productsData.id, amount: productAmount });
              productAmount = 1;
            "
          >
            <b class="item__price"> {{ productsData.pricePretty }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="blue"
                      checked=""
                    />
                    <span
                      class="colors__value"
                      style="background-color: #73b6ea"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="yellow"
                    />
                    <span
                      class="colors__value"
                      style="background-color: #ffbe15"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="gray" />
                    <span
                      class="colors__value"
                      style="background-color: #939393"
                    >
                    </span
                  ></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click.prevent="decrementProductAmount"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" />

                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="incrementProductAmount"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>

              <BaseModal v-model:open="isShowAddedMessage">
                Товар добавлен в корзину
              </BaseModal>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">
              Добавляем этот товар в корзину...
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально
            эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками
            по ANT+, объединяя полученную с них информацию. Данные отображаются
            на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю
            56 мм. На дисплей выводятся координаты и скорость, а также
            полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не
            входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а
            также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import BaseModal from "@/components/BaseModal.vue";
import useProduct from "@/hooks/useProduct.js";

export default defineComponent({
  props: {
    product_id: { type: [Number, String], require },
  },
  components: {
    BaseModal,
  },
  setup(props) {
    const $store = useStore();

    const {
      product,
      category,
      fetchProduct,
      status: productStatus,
    } = useProduct();

    const productAmount = ref(1);

    const isShowAddedMessage = ref(false);
    const productAdded = ref(false);
    const productAddSending = ref(false);

    const addToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;
      $store
        .dispatch("addProductCart", {
          productId: product.value.id,
          amount: productAmount.value,
        })
        .then(() => {
          isShowAddedMessage.value = true;
          productAdded.value = true;
          productAddSending.value = false;
        });
    };
    const incrementProductAmount = () => {
      productAmount.value++;
    };
    const decrementProductAmount = () => {
      productAmount.value > 0 ? productAmount.value-- : null;
    };

    fetchProduct(props.product_id);

    return {
      productAmount,
      productsData: product,
      productStatus,
      isShowAddedMessage,
      productAdded,
      productAddSending,
      category,

      addToCart,
      incrementProductAmount,
      decrementProductAmount,
    };
  },
});
</script>

<style scoped>
.item {
  grid-template-columns: 1fr;
}
</style>

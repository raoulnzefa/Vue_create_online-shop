import {
  computed,
  defineComponent,
  ref,
  reactive,
  watch
} from "vue";
import axios from "axios";
import {
  API_BASE_URL
} from "@/config.js";
import numberFormat from "@/helpers/numberFormat";

export default function () {
  // Отображение товара
  const productsData = ref(null);
  const category = computed(() => {
    return productsData.value.category;
  });
  // Загрузка
  const fetchStatus = reactive({
    isFailed: false,
    isLoading: false
  })
  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        const product = response.data;
        productsData.value = Object.assign(product, {
          pricePretty: numberFormat(product.price)
        })
      })
      .catch(() => (fetchStatus.isFailed = true))
      .finally(() => (fetchStatus.isLoading = false));
  };


  return {
    product: productsData,
    category,
    status: fetchStatus,
    fetchProduct
  }
}

import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import {
  API_BASE_URL
} from "@/config.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    orderInfo: null
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount
    }) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount = amount
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    },

  },
  getters: {
    cartDetail(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId)
          .product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetail.reduce((acc, item) => (item.product.price * item.amount) + acc,
        0);
    },
    cartTotalNumber(state, getters) {
      return getters.cartDetail.reduce((numbersCart, item) => item.amount + numbersCart, 0);
    }
  },
  actions: {
    async loadCart(context) {
      const response = await axios(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      });
      if (!context.state.userAccessKey) {
        localStorage.setItem("userAccessKey", response.data.user.accessKey);
        context.commit('updateUserAccessKey', response.data.user.accessKey);
      }
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
    async addProductCart(context, {
      productId,
      amount
    }) {
      const response = await axios({
        method: "POST",
        url: `${API_BASE_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.state.userAccessKey
        },
        data: {
          productId,
          quantity: amount
        }
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
    async updateCartProductAmount(context, {
      productId,
      amount
    }) {
      try {
        if (amount < 1) {
          return;
        }
        context.commit("updateCartProductAmount", {
          productId,
          amount
        });

        const response = await axios({
          method: "PUT",
          url: `${API_BASE_URL}/api/baskets/products`,
          params: {
            userAccessKey: context.state.userAccessKey
          },
          data: {
            productId,
            quantity: amount
          }
        });
        context.commit('updateCartProductsData', response.data.items);

      } catch (e) {
        context.commit('syncCartProducts');
      }
    },
    async deleteCartProduct(context, productId) {
      const response = await axios({
        method: "DELETE",
        url: `${API_BASE_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.state.userAccessKey
        },
        data: {
          productId
        }
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
    async loadOrderInfo(context, orderId) {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}/api/orders/${orderId}`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      });
      context.commit("updateOrderInfo", response);
      return context.state.orderInfo;
    },
  }
});

<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
  />
</template>

<script>
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import eventsBus from '@/eventsBus';

const routes = {
  main: "MainPage",
  product: "ProductPage",
};

export default {
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  data() {
    return {
      currentPage: "main",
      currentPageParams: {},
    };
  },
  methods: {
    goToPage(namePage, paramsPage) {
    this.currentPage = namePage;
    this.currentPageParams = paramsPage;
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || "NotFoundPage";
    },
  },
  created() {
    console.log("created");
    eventsBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  }
};
</script>



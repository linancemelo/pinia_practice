import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from './stateStore';

const status = statusStore();

export default defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  getters: {
    sortProduct: (state) => state.products.sort((a, b) => b.price - a.price),
  },
  actions: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      status.isLoading = true;
      axios.get(url).then((response) => {
        this.products = response.data.products;
        // console.log('products:', response);
        status.isLoading = false;
      });
    },
  },
});

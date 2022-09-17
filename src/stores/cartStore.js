import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from './stateStore';

const status = statusStore();

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
  }),
  getters: {
  },
  actions: {
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      status.cartLoadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then(() => {
        // axiosMessageState(response, '加入購物車');
        // console.log(response);
        status.pushMessage({ title: '成功加入' });
        status.cartLoadingItem = '';
        this.getCart();
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      status.isLoading = true;
      axios.get(url).then((response) => {
        this.cart = response.data.data;
        // console.log(response);
        status.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      status.isLoading = true;
      status.cartLoadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios.put(url, { data: cart }).then(() => {
        // console.log(response);
        this.getCart();
        status.cartLoadingItem = '';
        status.isLoading = false;
      });
    },
    removeCartItem(id) {
      status.cartLoadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      status.isLoading = true;
      axios.delete(url).then(() => {
        // console.log(response);
        // axiosMessageState(response, '移除購物車品項');
        status.cartLoadingItem = '';
        this.getCart();
        status.isLoading = false;
      });
    },
  },
});

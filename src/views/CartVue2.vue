<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <!-- 產品列表 -->
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in sortProduct" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td>{{ item.title }}</td>
            <td>
              <div class="h5">現在只要 {{ item.origin_price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-danger"
                        @click="addToCart(item.id)"
                        :disabled="cartLoadingItem === item.id">
                  <span class="spinner-border spinner-grow-sm"
                      v-if="cartLoadingItem === item.id"></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="cartLoadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                          v-model.number="item.qty"
                          :disabled="cartLoadingItem === item.id"
                          @change="updateCart(item)">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/stateStore';
import cartStore from '@/stores/cartStore';

export default {
  data() {
    return {
      // products: [],
      // status: {
      //   loadingItem: '',
      // },
      // cart: {},
      // isLoading: false,
    };
  },
  computed: {
    ...mapState(productStore, ['sortProduct']),
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    ...mapState(cartStore, ['cart']),
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
    ...mapActions(cartStore, ['addToCart', 'getCart', 'updateCart', 'removeCartItem']),
    // getProducts() {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
    //   this.isLoading = true;
    //   this.$http.get(url).then((response) => {
    //     this.products = response.data.products;
    //     console.log('products:', response);
    //     this.isLoading = false;
    //   });
    // },
    // addToCart(id, qty = 1) {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
    //   this.cartLoadingItem = id;
    //   const cart = {
    //     product_id: id,
    //     qty,
    //   };
    //   this.$http.post(url, { data: cart }).then((response) => {
    //     // this.$httpMessageState(response, '加入購物車');
    //     console.log(response);
    //     this.cartLoadingItem = '';
    //     this.getCart();
    //   });
    // },
    // getCart() {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
    //   this.isLoading = true;
    //   this.$http.get(url).then((response) => {
    //     this.cart = response.data.data;
    //     console.log(response);
    //     this.isLoading = false;
    //   });
    // },
    // updateCart(item) {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
    //   this.isLoading = true;
    //   this.cartLoadingItem = item.id;
    //   const cart = {
    //     product_id: item.product_id,
    //     qty: item.qty,
    //   };
    //   this.$http.put(url, { data: cart }).then((response) => {
    //     console.log(response);
    //     this.getCart();
    //     this.cartLoadingItem = '';
    //     this.isLoading = false;
    //   });
    // },
    // removeCartItem(id) {
    //   this.cartLoadingItem = id;
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
    //   this.isLoading = true;
    //   this.$http.delete(url).then((response) => {
    //     console.log(response);
    //     // this.$httpMessageState(response, '移除購物車品項');
    //     this.cartLoadingItem = '';
    //     this.getCart();
    //     this.isLoading = false;
    //   });
    // },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

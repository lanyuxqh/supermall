<template>
  <div class="cart-bottom">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/contents/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottom",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preVal, item) => {
            return preVal + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  align-items: center;
}
.check-content {
  width: 60px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  flex: 1;
  margin-left: 30px;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
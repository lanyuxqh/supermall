<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottom from "./childComps/CartBottom";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottom,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

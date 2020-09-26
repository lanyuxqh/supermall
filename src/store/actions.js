import { ADD_COUNTER, ADD_CART } from './mutation-types'

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前数量加一')
      } else {
        payload.count = 1;
        context.commit(ADD_CART, payload);
        resolve('添加了新商品')
      }
    })
  }
}
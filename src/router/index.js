import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Checkout from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
})

export default router

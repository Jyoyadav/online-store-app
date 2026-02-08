import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    cartCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    cartTotal: (state) => {
      return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    incrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity += 1
      }
    },

    decrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },

    clearCart() {
      this.items = []
    }
  },

  persist: {
    key: 'online-store-cart',
    storage: localStorage,
    paths: ['items']
  }
})

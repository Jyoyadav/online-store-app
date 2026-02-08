<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo-container">
        <router-link to="/products">
          <img src="/buhler-logo.svg" alt="Buhler Logo" class="logo" />
        </router-link>
      </div>
      
      <div class="datetime-container">
        <span class="datetime">{{ currentDateTime }}</span>
      </div>
      
      <div class="cart-container">
        <router-link to="/checkout" class="cart-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count" v-if="cartStore.cartCount > 0">{{ cartStore.cartCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const currentDateTime = ref('')
let intervalId = null

const updateDateTime = () => {
  const now = new Date()
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  currentDateTime.value = now.toLocaleDateString('en-US', options)
}

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.app-header {
  background-color: #fff;
  border-bottom: 1px solid #009b91;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container img {
  height: 40px;
  cursor: pointer;
}

.datetime-container {
  flex: 1;
  text-align: center;
}

.datetime {
  font-size: 0.9rem;
  color: #009b91;
}

.cart-container {
  display: flex;
  align-items: center;
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  color: #009b91;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.cart-link:hover {
  background-color: #f5f5f5;
}

.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #d32f2f;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .datetime {
    font-size: 0.75rem;
  }

  .logo-container img {
    height: 32px;
  }
}
</style>

<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Shopping Cart</h1>

      <div v-if="cartStore.items.length > 0" class="checkout-content">
        <div class="cart-items">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="cart-item"
          >
            <div 
              class="item-image-container"
              @click="goToProductDetail(item.id)"
              style="cursor: pointer;"
            >
              <img 
                :src="item.imageUrl" 
                :alt="item.name" 
                class="item-image"
                @error="handleImageError"
              />
            </div>
            
            <div 
              class="item-details"
              @click="goToProductDetail(item.id)"
              style="cursor: pointer;"
            >
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-type">{{ formatCategory(item.category) }}</p>
            </div>
            
            <div class="item-price">
              <p>${{ (item.price * item.quantity).toFixed(2) }}M</p>
            </div>

            <div class="quantity-controls">
              <button 
                @click="decrementQuantity(item)" 
                class="quantity-btn"
                :disabled="item.quantity === 1"
                :class="{ 'disabled': item.quantity === 1 }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button 
                @click="incrementQuantity(item)" 
                class="quantity-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            
            <div class="item-actions">
              <button @click="confirmRemoveItem(item)" class="remove-btn" title="Remove from cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span>Items ({{ cartStore.cartCount }})</span>
              <span>${{ cartStore.cartTotal.toFixed(2) }}M</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ cartStore.cartTotal.toFixed(2) }}M</span>
            </div>
            <button @click="proceedToCheckout" class="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to continue shopping.</p>
        <router-link to="/products" class="continue-shopping-btn">
          Continue Shopping
        </router-link>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Remove Item</h3>
        <p>Are you sure you want to remove this item from your cart?</p>
        <div class="modal-actions">
          <button @click="closeModal" class="btn-cancel">Cancel</button>
          <button @click="confirmDelete" class="btn-confirm">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()
const showModal = ref(false)
const itemToRemove = ref(null)

const formatCategory = (category) => {
  const categoryNames = {
    'machine_sorter': 'Optical Sorter',
    'machine_dryer': 'Dryer',
    'machine_roller': 'Roller',
    'machine_die_casting': 'Die Casting Machine'
  }
  return categoryNames[category] || category
}

const goToProductDetail = (productId) => {
  router.push(`/products/${productId}`)
}

const incrementQuantity = (item) => {
  cartStore.incrementQuantity(item.id)
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.decrementQuantity(item.id)
  }
}

const confirmRemoveItem = (item) => {
  if (item.quantity > 1) {
    itemToRemove.value = item
    showModal.value = true
  } else {
    removeItem(item.id)
  }
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

const confirmDelete = () => {
  if (itemToRemove.value) {
    removeItem(itemToRemove.value.id)
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  itemToRemove.value = null
}

const proceedToCheckout = () => {
  alert('Thank you for your order! This is a demo application.')
  cartStore.clearCart()
  router.push('/products')
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100?text=Product'
}
</script>

<style scoped>
.checkout-page {
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.item-type {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.item-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #0066cc;
  margin-right: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 0.25rem;
}

.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: #009b91;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #009b91;
  color: white;
  border-color: #009b91;
}

.quantity-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
  color: #333;
}

.item-actions {
  display: flex;
  align-items: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #ffebee;
}

.cart-summary {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 1.5rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
}

.summary-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #0052a3;
}

.checkout-btn:active {
  background-color: #004080;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
}

.empty-cart svg {
  color: #ccc;
  margin-bottom: 2rem;
}

.empty-cart h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.empty-cart p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.continue-shopping-btn:hover {
  background-color: #0052a3;
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-price {
    grid-column: 2;
    margin-right: 0;
    margin-top: 0.5rem;
  }

  .quantity-controls {
    grid-column: 2;
    justify-content: flex-start;
    margin-top: 0.5rem;
    width: fit-content;
  }

  .item-actions {
    grid-column: 2;
    justify-content: flex-end;
  }

  .item-image-container {
    width: 80px;
    height: 80px;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.modal-content p {
  margin: 0 0 1.5rem 0;
  color: #666;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-confirm {
  background-color: #d32f2f;
  color: white;
}

.btn-confirm:hover {
  background-color: #b71c1c;
}
</style>

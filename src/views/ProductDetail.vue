<template>
  <div class="product-detail-page">
    <div class="container">
      <button @click="goBack" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Products
      </button>

      <div v-if="product" class="product-detail">
        <div class="product-image-section">
          <img 
            :src="product.imageUrl" 
            :alt="product.name" 
            class="product-image"
            @error="handleImageError"
          />
        </div>
        
        <div class="product-info-section">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-type">
            <span class="label">Type:</span> {{ formatCategory(product.category) }}
          </p>
          <p class="product-price">${{ product.price.toFixed(2) }}M</p>
          
          <button @click="addToCart" class="add-to-cart-btn">
            Add to Cart
          </button>
          
          <div class="product-description">
            <h3>Product Details</h3>
            <p>{{ getProductDescription(product) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button @click="goBack" class="back-btn">Back to Products</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../composables/useToast'
import productsData from '../data/products.json'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { showToast } = useToast()

const product = computed(() => {
  const id = route.params.id
  return productsData.find(p => p.id === id)
})

const formatCategory = (category) => {
  const categoryNames = {
    'machine_sorter': 'Optical Sorter',
    'machine_dryer': 'Dryer',
    'machine_roller': 'Roller',
    'machine_die_casting': 'Die Casting Machine'
  }
  return categoryNames[category] || category
}

const getProductDescription = (product) => {
  const descriptions = {
    'machine_sorter': 'Advanced optical sorting technology for precise material separation and quality control.',
    'machine_dryer': 'High-efficiency drying systems for optimal moisture control and product quality.',
    'machine_roller': 'Premium roller mills engineered for superior grain processing and flour production.',
    'machine_die_casting': 'State-of-the-art die casting equipment for precision metal forming applications.'
  }
  return descriptions[product.category] || 'High-quality industrial equipment from Bühler.'
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    showToast(`${product.value.name} added to cart!`)
  }
}

const goBack = () => {
  router.push('/products')
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/600x400?text=Product+Image'
}
</script>

<style scoped>
.product-detail-page {
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-btn:hover {
  background-color: #f0f0f0;
  border-color: #0066cc;
  color: #0066cc;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
}

.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-name {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.product-type {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.label {
  font-weight: 600;
  color: #444;
}

.product-price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0066cc;
  margin: 0;
}

.add-to-cart-btn {
  padding: 1rem 2rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
}

.add-to-cart-btn:hover {
  background-color: #0052a3;
}

.add-to-cart-btn:active {
  background-color: #004080;
}

.product-description {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.product-description h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
}

.product-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
}

.not-found h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .add-to-cart-btn {
    width: 100%;
  }
}
</style>

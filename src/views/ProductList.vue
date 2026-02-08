<template>
  <div class="product-list-page">
    <div class="container">
      <h1 class="page-title">Our Products</h1>
      
      <div v-for="section in sections" :key="section.name" class="product-section">
        <h2 class="section-title">{{ section.name }}</h2>
        <div class="product-grid">
          <div 
            v-for="product in section.products" 
            :key="product.id" 
            class="product-card"
          >
            <router-link :to="`/products/${product.id}`" class="product-link">
              <div class="product-image-container">
                <img 
                  :src="product.imageUrl" 
                  :alt="product.name" 
                  class="product-image"
                  @error="handleImageError"
                />
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">${{ product.price.toFixed(2) }}</p>
              </div>
            </router-link>
            <button @click="addToCart(product)" class="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import productsData from '../data/products.json'

const cartStore = useCartStore()

const categoryNames = {
  'machine_sorter': 'Optical Sorters',
  'machine_dryer': 'Dryers',
  'machine_roller': 'Rollers',
  'machine_die_casting': 'Die Casting Machines'
}

const sections = computed(() => {
  const grouped = {}
  
  productsData.forEach(product => {
    if (!grouped[product.category]) {
      grouped[product.category] = [] 
    }
    grouped[product.category].push(product) // { machine_sorter: [product1, product2], machine_dryer: [product3], ... }
  })
  // Object.keys(grouped) -> ['machine_sorter', 'machine_dryer', 'machine_roller', 'machine_die_casting']
  return Object.keys(grouped).map(category => ({
    name: categoryNames[category] || category,
    products: grouped[category] // grouped['machine_sorter'] -> [product1, product2]
  }))
})

const addToCart = (product) => {
  cartStore.addToCart(product)
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x200?text=Product+Image'
}
</script>

<style scoped>
.product-list-page {
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
  text-align: center;
}

.product-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #0066cc;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  min-height: 2.5rem;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #0066cc;
  margin: 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #0066cc;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #0052a3;
}

.add-to-cart-btn:active {
  background-color: #004080;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}
</style>

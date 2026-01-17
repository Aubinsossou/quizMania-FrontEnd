<template>
  <div id="app">
    <!-- Formes flottantes -->
    <div class="shapes">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <div class="main-container">
      <!-- Logo (accueil uniquement) -->
      <div v-if="route.name === 'home'" class="logo-container">
        <div class="logo-main">
          <div class="logo-decorations">
            <span class="logo-icon">✖</span>
            <span class="logo-icon">▷</span>
            <span class="logo-icon">○</span>
            <span class="logo-icon">✖</span>
            <span class="logo-icon">▷</span>
          </div>
          <span class="logo-quiz">QUIZ</span>
          <span class="logo-time">MANIA</span>
        </div>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Formes flottantes */
.shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  border: 3px solid rgba(251, 191, 36, 0.3);
  border-radius: 20px;
  animation: float 20s infinite ease-in-out;
}

.shape:nth-child(1) {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape:nth-child(2) {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
  border-radius: 50%;
}

.shape:nth-child(3) {
  width: 80px;
  height: 80px;
  top: 30%;
  right: 20%;
  animation-delay: 4s;
  transform: rotate(45deg);
}

.shape:nth-child(4) {
  width: 120px;
  height: 120px;
  bottom: 15%;
  left: 15%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-30px) rotate(5deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
  75% { transform: translateY(-40px) rotate(3deg); }
}

/* Logo */
.logo-container {
  text-align: center;
  margin: 40px 0 60px;
  position: relative;
  z-index: 1;
}

.logo-main {
  font-size: 8em;
  font-weight: 900;
  line-height: 0.9;
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.logo-quiz {
  color: #fbbf24;
  text-shadow:
    4px 4px 0 #fff,
    8px 8px 15px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(251, 191, 36, 0.5);
  display: block;
  letter-spacing: -5px;
}

.logo-time {
  color: #fff;
  text-shadow:
    4px 4px 0 #3b82f6,
    8px 8px 15px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(59, 130, 246, 0.5);
  display: block;
  letter-spacing: -5px;
  margin-top: -10px;
}

.logo-decorations {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.logo-icon {
  position: absolute;
  font-size: 2em;
  animation: pulse 2s infinite;
}

.logo-icon:nth-child(1) {
  top: -20px;
  left: -30px;
  color: #fbbf24;
}

.logo-icon:nth-child(2) {
  top: -10px;
  right: -30px;
  color: #fff;
  animation-delay: 0.5s;
}

.logo-icon:nth-child(3) {
  bottom: -20px;
  left: 20%;
  color: #fbbf24;
  animation-delay: 1s;
}

.logo-icon:nth-child(4) {
  bottom: 30%;
  right: -40px;
  color: #fff;
  animation-delay: 1.5s;
}

.logo-icon:nth-child(5) {
  top: 40%;
  left: -50px;
  color: #fbbf24;
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .logo-main {
    font-size: 5em;
  }
}
</style>

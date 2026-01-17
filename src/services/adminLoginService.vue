<template>
  <div class="admin-wrapper">
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-box">
        <h2 class="login-title">🔐 Espace Administration</h2>
        <p class="login-subtitle">Connectez-vous pour gérer les quiz</p>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Entrez le mail" class="login-input" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Entrez le mot de passe"
            class="login-input"
          />
        </div>
        <!--         <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
 -->
        <button @click.prevent="login" class="btn btn-primary login-btn">Se connecter</button>
        <button @click="goHome" class="btn btn-secondary back-btn">← Retour à l'accueil</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiPost } from '@/helpears/axiosApi'

const router = useRouter()
const password = ref()
const email = ref()
const datas = ref()

const login = async () => {
  const response = await apiPost('https://quizmania.com/api/login', {
    email: email.value,
    password: password.value,
  })
  datas.value = response
  localStorage.setItem('user', JSON.stringify(datas.value.data.data))
  localStorage.setItem('token', datas.value.data.access_token)

  router.push('/admin/dashboard')
  console.log('datas.value: ', datas.value.data)
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/admin')
}
</script>

<style>
.admin-wrapper {
  min-height: 100vh;
  padding: 20px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-box {
  background: white;
  padding: 50px;
  border-radius: 25px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.login-title {
  font-size: 2em;
  font-weight: 900;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 10px;
}
.login-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 30px;
}
.login-input {
  width: 100%;
  padding: 15px;
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  font-size: 1.1em;
  transition: all 0.3s;
}
.login-input:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}
.error-message {
  color: #ef4444;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}
.login-btn {
  width: 100%;
  margin-bottom: 15px;
}
.back-btn {
  width: 100%;
}
</style>

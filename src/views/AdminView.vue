<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiPost } from '@/helpears/axiosApi'

const router = useRouter()
const password = ref()
const email = ref()

const isAuthenticated = ref(false)
const datas = ref()


const login = async () => {
  const response = await apiPost('http://localhost:8050/api/login', {
    email: email.value,
    password: password.value,
  })
  datas.value = response
  localStorage.setItem('user', JSON.stringify(datas.value.data.data))
  localStorage.setItem('token', datas.value.data.access_token)
  router.push("/admin/dashboard")
}



onMounted(() => {
 
})
</script>
<template>
  <div class="admin-wrapper">
   
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-box">
        <h2 class="login-title"> Espace Administration</h2>
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
        <button @click.prevent="login" class="btn btn-primary login-btn">Se connecter</button>
        <button @click="goHome" class="btn btn-secondary back-btn">← Retour à l'accueil</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.admin-panel {
  background: white;
  border-radius: 25px;
  padding: 30px;
  margin: 20px auto;
  max-width: 1100px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #e5e7eb;
}
.admin-title {
  font-size: 2em;
  font-weight: 900;
  color: #1e3a8a;
}
.header-actions {
  display: flex;
  gap: 10px;
}

.tabs-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}
.tab-btn {
  padding: 12px 25px;
  background: #f3f4f6;
  border: none;
  border-radius: 12px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  color: #64748b;
}
.tab-btn.active {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  box-shadow: 0 5px 20px rgba(30, 58, 138, 0.4);
}

.section {
  background: #f8fafc;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
}
.section-title {
  color: #1e3a8a;
  font-size: 1.3em;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: #1e3a8a;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid rgba(30, 58, 138, 0.2);
  border-radius: 10px;
  font-size: 1em;
  font-family: inherit;
  transition: all 0.3s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
}
.form-row {
  display: flex;
  gap: 15px;
}
.flex-1 {
  flex: 1;
}
.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-primary {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}
.btn-secondary {
  background: #e5e7eb;
  color: #64748b;
}
.btn-secondary:hover {
  background: #d1d5db;
}
.btn-warning {
  background: #fbbf24;
  color: #1e3a8a;
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
}
.btn-small {
  padding: 8px 16px;
  font-size: 0.9em;
}
.btn-icon {
  padding: 8px 12px;
  min-width: auto;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 2px solid transparent;
  transition: all 0.3s;
}
.list-item:hover {
  border-color: #fbbf24;
  transform: translateX(5px);
}
.list-item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}
.list-icon {
  font-size: 2em;
}
.list-details {
  display: flex;
  flex-direction: column;
}
.list-name {
  color: #1e3a8a;
  font-size: 1.1em;
}
.list-info {
  color: #64748b;
  font-size: 0.9em;
}
.list-actions {
  display: flex;
  gap: 8px;
}

.answer-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.answer-row input[type='radio'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.answer-input {
  flex: 1;
}

.theme-block {
  background: white;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}
.theme-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  cursor: pointer;
  font-weight: 700;
  color: #1e3a8a;
  transition: all 0.3s;
}
.theme-header:hover {
  background: linear-gradient(135deg, #e0e7ff, #dbeafe);
}
.badge {
  background: #1e3a8a;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
}
.chevron {
  margin-left: auto;
  transition: transform 0.3s;
}
.chevron.open {
  transform: rotate(180deg);
}
.theme-questions {
  padding: 15px;
  background: #fafafa;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 4px solid #1e3a8a;
}
.question-content {
  flex: 1;
}
.question-text-admin {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 10px;
}
.question-answers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.answer-chip {
  padding: 4px 12px;
  background: #e5e7eb;
  border-radius: 20px;
  font-size: 0.85em;
  color: #64748b;
}
.answer-chip.correct {
  background: #10b981;
  color: white;
}
.question-meta {
  font-size: 0.85em;
  color: #94a3b8;
}
.question-actions {
  display: flex;
  gap: 5px;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #94a3b8;
  font-style: italic;
}
.empty-state.small {
  padding: 15px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.confirm-modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
}
.confirm-modal h3 {
  color: #1e3a8a;
  margin-bottom: 15px;
}
.confirm-modal p {
  color: #64748b;
  margin-bottom: 25px;
}
.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .admin-panel {
    padding: 20px;
    margin: 10px;
  }
  .admin-header {
    flex-direction: column;
    gap: 15px;
  }
  .form-row {
    flex-direction: column;
  }
  .list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .list-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

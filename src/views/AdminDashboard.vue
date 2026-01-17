<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiPost, apiGet, apiDelete } from '@/helpears/axiosApi'

const themeQuestion = ref()
const loading = ref()
const router = useRouter()
const route = useRoute()
const nameTheme = ref()
const themeAdd = ref()
const ThemeEdit = ref()
const deconnect = ref()
const question = ref(false)
const displayBtnEdit = ref(false)

const id = route.query.id

const questionFunction = () => {
  console.log('jai ete checker')
  router.push('/admin/dashboard/question')
  question.value = true
}

/*Api pour les themes et question assossie*/
const apiGetThemeQuestion = async () => {
  const response = await apiGet('https://quizmania.free.nf/api/v1/admin/theme/index')
  themeQuestion.value = response.data
  console.log(' themeQuestion.value: ', themeQuestion.value)
}

/* Api ajouter theme */

const apiAjoutTheme = async () => {
  const response = await apiPost('https://quizmania.free.nf/api/v1/admin/theme/store', {
    name: nameTheme.value,
  })
  themeAdd.value = response
}

/* Api recuperer theme a edit */
const ApiEditTheme = async (theme) => {
  displayBtnEdit.value = true
  const response = await apiGet('https://quizmania.free.nf/api/v1/admin/theme/edit/' + theme.id)
  nameTheme.value = theme.name
  router.push(`/admin/dashboard?id=${theme.id}`)
  console.log('nameTheme.value: ', nameTheme.value)
  router.push('/admin/dashboard')

}

/* Api Modify themee */

const ApiModifyTheme = async () => {
  displayBtnEdit.value = true
  const response = await apiPost('https://quizmania.free.nf/api/v1/admin/theme/update/' + id, {
    name: nameTheme.value,
  })
  ThemeEdit.value = response.data
  console.log('ThemeEdit.value: ', ThemeEdit.value)
  router.push('/admin/dashboard')

}

const logout = async () => {
  const response = await apiDelete("https://quizmania.free.nf/api/logout")
  deconnect.value = response

localStorage.removeItem('token')
  localStorage.removeItem('user')
   router.push('/admin')
}

const retourAuBercail = () => {
  router.push('/')
}

onMounted(() => {
  apiGetThemeQuestion()
  displayBtnEdit.value = false
})
</script>
<template>
  <div class="admin-wrapper" v-if="themeQuestion">
    <div class="admin-panel">
      <div class="admin-header">
        <h2 class="admin-title">Administration</h2>
        <div class="header-actions">
          <button @click="retourAuBercail" class="btn btn-primary btn-small">Accueil</button>
          <button @click="logout" class="btn btn-danger btn-small">Déconnexion</button>
        </div>
      </div>

      <div class="tabs-container">
        <button @click="activeTab = 'themes'" class="tab-btn active">Thèmes</button>
        <button @click="questionFunction" class="tab-btn">Questions</button>
      </div>

      <!-- ONGLET THÈMES -->
      <div class="tab-content">
        <div class="section">
          <h3 class="section-title">
            {{ displayBtnEdit ? ' Modifier le thème' : ' Ajouter un thème' }}
          </h3>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Nom du thème</label>
              <input placeholder="Ex: Géographie" v-model="nameTheme" />
            </div>
          </div>
          <div class="form-actions">
            <!--             <button @click="cancelEditTheme" class="btn btn-secondary">Annuler</button>
 -->
            <button @click.prevent="apiAjoutTheme" class="btn btn-primary">Ajouter</button>
          </div>
          <div class="form-actions">
            <button
              @click.prevent="ApiModifyTheme(nameTheme.id)"
              v-if="displayBtnEdit"
              class="btn btn-secondary"
            >
              Sauvegarder
            </button>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Thèmes existants ({{ themeQuestion.length }})</h3>
          <div class="list-item" v-for="theme in themeQuestion">
            <div class="list-item-content">
              <div class="list-details">
                <strong class="list-name">{{ theme.name }}</strong>
                <span class="list-info">{{ theme.questions.length }} questions</span>
              </div>
            </div>
            <div class="list-actions">
              <button @click="ApiEditTheme(theme)" class="btn btn-warning btn-icon">
                Modifier
              </button>
              <button @click="confirmDeleteTheme(theme.id)" class="btn btn-danger btn-icon">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ONGLET QUESTIONS -->
      <div v-if="question == 'true'" class="tab-content">
        <div class="section">
          <h3 class="section-title">
            {{ editingQuestion ? '✏️ Modifier la question' : '➕ Ajouter une question' }}
          </h3>
          <div class="form-group">
            <label>Thème</label>
            <select v-model="questionForm.themeId" :disabled="editingQuestion !== null">
              <option value="">-- Sélectionner un thème --</option>
              <option v-for="theme in quizStore.themes" :key="theme.id" :value="theme.id">
                {{ theme.icon }} {{ theme.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Question</label>
            <textarea
              v-model="questionForm.question"
              rows="2"
              placeholder="Votre question..."
            ></textarea>
          </div>
          <div class="form-group">
            <label>Réponses (cochez la bonne réponse)</label>
            <div v-for="(answer, index) in questionForm.answers" :key="index" class="answer-row">
              <input type="radio" :value="index" v-model="questionForm.correct" />
              <input
                v-model="questionForm.answers[index]"
                type="text"
                :placeholder="'Réponse ' + (index + 1)"
                class="answer-input"
              />
              <button
                v-if="questionForm.answers.length > 2"
                @click="removeAnswer(index)"
                class="btn btn-danger btn-icon btn-small"
              >
                ✕
              </button>
            </div>
            <button
              v-if="questionForm.answers.length < 6"
              @click="addAnswer"
              class="btn btn-secondary btn-small"
            >
              + Ajouter une réponse
            </button>
          </div>
          <div class="form-row">
            <div class="form-group" style="width: 150px">
              <label>Temps (secondes)</label>
              <input v-model.number="questionForm.time" type="number" min="5" max="60" />
            </div>
          </div>
          <div class="form-actions">
            <button v-if="editingQuestion" @click="cancelEditQuestion" class="btn btn-secondary">
              Annuler
            </button>
            <button @click="submitQuestion" class="btn btn-primary">
              {{ editingQuestion ? '💾 Sauvegarder' : '➕ Ajouter' }}
            </button>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">📋 Questions par thème</h3>
          <div v-if="quizStore.themes.length === 0" class="empty-state">
            Créez d'abord un thème.
          </div>
          <div v-for="theme in quizStore.themes" :key="theme.id" class="theme-block">
            <div class="theme-header" @click="toggleTheme(theme.id)">
              <span>{{ theme.icon }} {{ theme.name }}</span>
              <span class="badge">{{ theme.questions.length }}</span>
              <span class="chevron" :class="{ open: expandedThemes.includes(theme.id) }">▼</span>
            </div>
            <div v-if="expandedThemes.includes(theme.id)" class="theme-questions">
              <div v-if="theme.questions.length === 0" class="empty-state small">
                Aucune question
              </div>
              <div v-for="(q, qIndex) in theme.questions" :key="qIndex" class="question-item">
                <div class="question-content">
                  <div class="question-text-admin">{{ qIndex + 1 }}. {{ q.question }}</div>
                  <div class="question-answers">
                    <span
                      v-for="(a, aIndex) in q.answers"
                      :key="aIndex"
                      :class="['answer-chip', { correct: aIndex === q.correct }]"
                      >{{ a }}</span
                    >
                  </div>
                  <div class="question-meta">⏱️ {{ q.time }}s</div>
                </div>
                <div class="question-actions">
                  <button
                    @click="editQuestion(theme.id, qIndex, q)"
                    class="btn btn-warning btn-icon btn-small"
                  >
                    ✏️
                  </button>
                  <button
                    @click="confirmDeleteQuestion(theme.id, qIndex)"
                    class="btn btn-danger btn-icon btn-small"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  padding: 13px 41px;
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

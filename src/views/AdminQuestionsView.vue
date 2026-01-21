<script setup>
import { onMounted, ref } from 'vue'
import { apiGet, apiPost, apiPut, apiDelete } from '@/helpears/axiosApi'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const listReponse = ref([])
const question = ref()
const theme = ref()
const display = ref(false)
const modifyQuestionReponse = ref()

const themeQuestions = ref()
const questionAdd = ref()
const ReponseAdd = ref()
const theme_id = ref()
const status1 = ref('faux')
const input1 = ref('')
const status2 = ref('faux')
const input2 = ref()
const status3 = ref('faux')
const input3 = ref('')
const status4 = ref('faux')
const input4 = ref('')

const apiGetThemeQuestion = async () => {
  const response = await apiGet('https://quizmania.projet.sbs/public/api/v1/admin/theme/index')
  themeQuestions.value = response
  console.log('themeQuestions.value: ', themeQuestions.value.themeQuestionReponse)
}

const retourAuBercail = () => {
  router.push('/')
}

const displayValue = ()=>{
  if(display.value == true){
    display.value = false
  }
  else{
    display.value = true
  }
}

const infoReponse = () => {
  listReponse.value.push(
    { name: input1.value, status: status1.value },
    { name: input2.value, status: status2.value },
    { name: input3.value, status: status3.value },
    { name: input4.value, status: status4.value },
  )
  console.log('status1: ', status1.value)
  console.log('input1: ', input1.value)
  console.log('status2: ', status2.value)
  console.log('input2: ', input2.value)
  console.log('status3: ', status3.value)
  console.log('input3: ', input3.value)
  console.log('status4: ', status4.value)
  console.log('input4: ', input4.value)
  console.log('listReponse.value: ', listReponse.value)

  console.log('Question', question.value)

  input1.value = ''
  status1.value = ''
  input2.value = ''
  status2.value = ''
  input3.value = ''
  status3.value = ''
  input4.value = ''
  status4.value = ''
}

const apiPostQuestionReponse = async () => {
  listReponse.value.push(
    { name: input1.value, status: status1.value },
    { name: input2.value, status: status2.value },
    { name: input3.value, status: status3.value },
    { name: input4.value, status: status4.value },
  )

  const responses = await apiPost('https://quizmania.projet.sbs/public/api/v1/admin/question/store', {
    theme_id: theme_id.value,
    question: question.value,
  })
  questionAdd.value = responses.data

  const response = await apiPost('https://quizmania.projet.sbs/public/api/v1/admin/reponse/store', {
    listReponse: listReponse.value,
  })
  ReponseAdd.value = response.data

  question.value = ''
  input1.value = ''
  status1.value = ''
  input2.value = ''
  status2.value = ''
  input3.value = ''
  status3.value = ''
  input4.value = ''
  status4.value = ''
}

const apiModifyQuestionReponse = async (question) => {
  const response = await apiGet('https://quizmania.projet.sbs/public/api/v1/admin/question/edit/' + question.id)
  modifyQuestionReponse.value = response.questionReponse
  console.log('modifyQuestionReponse.value: ', modifyQuestionReponse.value)
}

const logout = async () => {
  const response = await apiDelete("https://quizmania.projet.sbs/public/api/logout")
  deconnect.value = response

localStorage.removeItem('token')
  localStorage.removeItem('user')
   router.push('/admin')
}



onMounted(() => {
  apiGetThemeQuestion()
})
</script>

<template>
  <div class="admin-wrapper">
    <div class="admin-panel">
      <div class="admin-header">
        <h2 class="admin-title">Administration</h2>
        <div class="header-actions">
          <button class="btn btn-primary btn-small" @click="retourAuBercail">Accueil</button>
          <button class="btn btn-danger btn-small" @click.prevent="logout">Déconnexion</button>
        </div>
      </div>

      <div class="tabs-container">
        <router-link to="/admin/dashboard" class="tab-btn"> Thèmes</router-link>
        <router-link to="/admin/questions" class="tab-btn active"> Questions</router-link>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="section">
        <h3 class="section-title">Ajouter une question</h3>

        <div class="form-group">
          <label>Thème</label>
          <select v-if="themeQuestions" v-model="theme_id">
            <option disabled :value="theme" style="text-align: center;">-- Choisissez un thème --</option>
            <option v-for="theme in themeQuestions.data" :value="theme.id" :key="theme.id">
              {{ theme.name }}
            </option>
          </select>
        </div>

        <div class="form-group" v-if="themeQuestions">
          <label>Question</label>
          <input
            type="text"
            placeholder="Votre question..."
            style="height: 70px"
            v-model="question"
          />
        </div>

        <div class="form-group">
          <label>Réponses</label>
          <div class="answer-row-admin">
            <input type="text" placeholder="Réponse 1" class="answer-input" v-model="input1" />
            <select style="width: 120px" v-model="status1">
              <option value="faux">Incorrect</option>
              <option value="vrai">correct</option>
            </select>
          </div>

          <div class="answer-row-admin">
            <input type="text" placeholder="Réponse 2" class="answer-input" v-model="input2" />
            <select style="width: 120px" v-model="status2">
              <option value="faux">Incorrect</option>
              <option value="vrai">correct</option>
            </select>
          </div>

          <div class="answer-row-admin">
            <input type="text" placeholder="Réponse 3" class="answer-input" v-model="input3" />
            <select style="width: 120px" v-model="status3">
              <option value="faux">Incorrect</option>
              <option value="vrai">correct</option>
            </select>
          </div>

          <div class="answer-row-admin">
            <input type="text" placeholder="Réponse 4" class="answer-input" v-model="input4" />
            <select style="width: 120px" v-model="status4">
              <option value="faux">Incorrect</option>
              <option value="vrai">correct</option>
            </select>
          </div>
        </div>
        <div>{{ listReponse }}</div>


        <div class="form-actions">
          <button class="btn btn-primary" @click="apiPostQuestionReponse">Ajouter</button>
        </div>
      </div>

      <!-- Liste des questions -->
      <div class="section" v-if="themeQuestions">
        <h3 class="section-title">Questions par thème</h3>

        <div
          class="theme-block"
          v-for="themeQuestionReponse in themeQuestions.themeQuestionReponse"
          @click="displayValue"
        >
          <div class="theme-header">
            <span>{{ themeQuestionReponse.name }}</span>
            <span class="badge">{{ themeQuestionReponse.questions.length }}</span>
            <span class="chevron open" >▼</span>
          </div>

          <div class="theme-questions" v-if="display" >
            <!-- Question 1 -->
            <div
              class="question-item"
              v-if="themeQuestions"
              v-for="theme_questions in themeQuestionReponse.questions"
            >
              <div class="question-content">
                <div class="question-text-admin">{{ theme_questions.question }}</div>
                <div class="question-answers">
                  <!-- <span class="answer-chip correct"> Paris<span class="chip-status">✓</span></span> -->
                  <span class="answer-chip" v-for="themeReponse in theme_questions.reponses">{{
                    themeReponse.name
                  }}</span>
                </div>
              </div>
              <div class="question-actions">
                <button
                  class="btn btn-warning btn-icon btn-small"
                  @click="apiModifyQuestionReponse(theme_questions)"
                >
                  Modifier
                </button>
                <button class="btn btn-danger btn-icon btn-small">Supprimer</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Thèmes fermés -->
        <!-- <div class="theme-block">
          <div class="theme-header">
            <span>🔬 Sciences</span>
            <span class="badge">2</span>
            <span class="chevron">▼</span>
          </div>
        </div>

        <div class="theme-block">
          <div class="theme-header">
            <span>📜 Histoire</span>
            <span class="badge">2</span>
            <span class="chevron">▼</span>
          </div>
        </div>

        <div class="theme-block">
          <div class="theme-header">
            <span>⚽ Sport</span>
            <span class="badge">2</span>
            <span class="chevron">▼</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  padding: 20px;
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
  text-decoration: none;
  display: inline-block;
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
  font-weight: 700;
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

.answer-row-admin {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
}
.answer-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;
}
.status-badge.correct {
  background: #10b981;
  color: white;
}
.status-badge.incorrect {
  background: #e5e7eb;
  color: #64748b;
}
.correct-select {
  background: #f0fdf4;
  border-color: #10b981 !important;
  font-weight: 600;
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
  padding: 6px 14px;
  background: #e5e7eb;
  border-radius: 20px;
  font-size: 0.85em;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.answer-chip.correct {
  background: #10b981;
  color: white;
  font-weight: 600;
}
.chip-status {
  font-weight: 700;
}
.question-meta {
  font-size: 0.85em;
  color: #94a3b8;
}
.question-actions {
  display: flex;
  gap: 5px;
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
  .answer-row-admin {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

<script setup>
import { computed, onMounted,ref, resolveDirective, watch, watchEffect } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useScoreStore } from '@/store/score'
import { apiGet } from '@/helpears/axiosApi'


const quizScore = useScoreStore()

const router = useRouter()
const route = useRoute()
const themeQuestion = ref(null)
const longQuestion = ref()
const loading = ref()
const themeId = ref(route.params.themeId)
const refresh = ref()

 const getThemeIdApi = async () => {
    loading.value = true
    const response = await apiGet('https://quizmania.projet.sbs/public/v1/admin/theme/indexThemeId/' + themeId.value)
    themeQuestion.value = response.data
    console.log(' themeQuestion.value: ',  themeQuestion.value);
    longQuestion.value = await  themeQuestion.value.questions.length
    console.log('longQuestion.value: ', longQuestion.value);
    loading.value = false

  }

  watchEffect(()=>{
    getThemeIdApi()
  })

 const pourcen = computed(() =>
  Math.round((quizScore.score / longQuestion.value) * 100)
)

const resultEmoji = computed(() => {
  if (pourcen.value === 100) return '🏆'
  if (pourcen.value >= 80) return '🎉'
  if (pourcen.value >= 60) return '😊'
  if (pourcen.value >= 40) return '😐'
  return '😢'
})

 const restart = () => {
  router.push('/quiz/' + themeId.value)
}

const retourTheme = () => {
  router.push('/')
}

onMounted( async()=>{
 //loading.value = true
 //await getThemeIdApi()

})

/* watchEffect(()=>{
  console.log("ThemeId", themeId.value)

})
 */
</script>


<template>
  <div v-if="loading" class="loading">
    <div class="spinner"></div>
    <p>Chargement du resultat...</p>
  </div>
  <div class="quiz-box results-box" v-else>
    <h2 class="results-title">Quiz Terminé!</h2>
    <div class="results-emoji">{{ resultEmoji }}</div>
    <div class="results-score"> {{ pourcen }}%</div>
     <p class="results-percentage">{{ quizScore.score }} / {{ longQuestion }}</p>
    <button class="btn btn-primary" @click.prevent="retourTheme">
       Retour aux thèmes
    </button>
    <button class="btn btn-secondary" @click.prevent="restart">
       Recommencer
    </button>
  </div>
</template>


<style scoped>
.quiz-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  padding: 50px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.results-box {
  text-align: center;
  padding: 40px;
}

.results-title {
  font-size: 3.5em;
  font-weight: 900;
  color: #1e3a8a;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.results-emoji {
  font-size: 10em;
  margin: 30px 0;
  animation: emojiPop 1s;
}

@keyframes emojiPop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.results-score {
  font-size: 3em;
  font-weight: 900;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 30px 0;
}

.results-pourcen {
  font-size: 1.8em;
  color: #64748b;
  margin: 20px 0 40px;
}

.btn {
  padding: 18px 40px;
  border: none;
  border-radius: 15px;
  font-size: 1.2em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1e3a8a;
}

.btn-secondary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(251, 191, 36, 0.4);
}
</style>

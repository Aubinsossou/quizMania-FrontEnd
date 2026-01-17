<script setup>
    import { ref,onMounted, computed } from 'vue';

    const prix = ref()
    const quantite = ref()

 const Total = computed(()=> prix.value * quantite.value)

</script>

<template>

    <input type="text" name="firstName" id="firstName" v-model="prix">
    <input type="text" name="lastName" id="lastName" v-model="quantite">
    <h1>{{"Total = " + Total }}</h1>
</template>
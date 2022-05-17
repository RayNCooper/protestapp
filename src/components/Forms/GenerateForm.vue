<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { useRouter } from 'vue-router';
import CardWrapper from '../util/CardWrapper.vue';
import { useStore } from 'vuex';
import { Registration } from '../../../types/Registration';

const router = useRouter()
const store = useStore()

onBeforeMount(async () => {
    const draftJSON = localStorage.getItem("draftedRegistration")
    if (draftJSON) {
        const registration = JSON.parse(draftJSON) as Registration
        const c = await store.dispatch("callGenerateForm", registration)
        console.log(c)
    }
})

const loading = ref(false)
</script>

<template>
    <card-wrapper
        card-title="Generiere Formular"
        style="width: 20em; position: relative; top: 30vh"
    >
        <template v-slot:content>
            <span v-if="loading">...</span>
            <span v-else="loading">...</span>
        </template>
    </card-wrapper>
</template>

<style scoped>
</style>

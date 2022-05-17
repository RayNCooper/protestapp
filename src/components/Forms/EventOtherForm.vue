<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { germanLanguageModel } from '../../languageModel';
import { useRouter } from 'vue-router';
import { identity } from 'lodash';
import { useStore } from 'vuex';

const vehicleFlowForm = ref(FlowForm)
const store = useStore()
const router = useRouter()
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const form = reactive({
    comments: '',
    covidPrecautions: ''
})

function formSubmitted(questionList: { id: string, answer: string }[]) {
    store.commit("addDraftedRegistrationOther", form)
    router.push({ name: "CheckForm" })
}
</script>

<template>
    <flow-form
        :timer="true"
        :standalone="true"
        @submit="formSubmitted"
        :language="germanLanguageModel"
    >
        <template v-slot:complete>
            <div class="f-section-wrap">
                <p>
                    <span class="fh2">
                        Fertig! 🏁
                        <br />Wir generieren jetzt dein Formular.
                    </span>
                </p>
            </div>
        </template>

        <question
            v-model="form.comments"
            id="comments"
            type="text"
            title="Gibt es Anmerkungen oder Kommentare?"
            subtitle="(optional)"
        ></question>
        <question
            v-model="form.covidPrecautions"
            id="covidPrecautions"
            required
            type="text"
            title="Welches Hygienekonzept verfolgt eure Veranstaltung?"
            placeholder="Einhaltung der Maskenpflicht, [...]"
        ></question>
    </flow-form>
</template>

<style scoped>
</style>

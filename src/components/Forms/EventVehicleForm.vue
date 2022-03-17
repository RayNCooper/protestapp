<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { germanLanguageModel } from '../../languageModel';
import { useRouter } from 'vue-router';
import { identity } from 'lodash';

const vehicleFlowForm = ref(FlowForm)
const router = useRouter()
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const form = reactive({
    usingVehicles: false,
    vehicleKinds: ''
})

function formSubmitted(questionList: { id: string, answer: string }[]) {
    router.push({ name: "EventUtilityForm" })
}
function onStep(activeQuestionId: string, activeQuestion: any) {
    if (activeQuestionId === "vehicleEndSection")
        vehicleFlowForm.value.goToNextQuestion()
}
</script>

<template>
    <flow-form
        ref="vehicleFlowForm"
        :timer="true"
        :standalone="true"
        @submit="formSubmitted"
        @step="onStep"
        :language="germanLanguageModel"
    >
        <template v-slot:complete>
            <div class="f-section-wrap">
                <p>
                    <span class="fh2">Verstanden! Als Nächstes geht es um Hilfsmittel.</span>
                </p>
            </div>
        </template>
        <question
            v-model="form.usingVehicles"
            id="usingVehicles"
            required
            :nextStepOnAnswer="true"
            type="multipleChoice"
            :options="[new ChoiceOption({ label: 'Ja', value: true }), new ChoiceOption({ label: 'Nein', value: false })]"
            title="Möchtet ihr Fahrzeuge benutzen?"
        ></question>
        <question
            v-if="form.usingVehicles"
            v-model="form.vehicleKinds"
            id="vehicleKinds"
            type="longText"
            required
            title="Welche Art und Stückzahl von Fahrzeugen möchtet ihr benutzen?"
            placeholder="PKW, 2 Stk."
        ></question>
        <question v-else id="vehicleEndSection" type="sectionbreak" title placeholder></question>
    </flow-form>
</template>

<style scoped>
</style>

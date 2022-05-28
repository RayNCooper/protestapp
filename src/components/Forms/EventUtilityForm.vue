<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { germanLanguageModel } from '../../languageModel';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { utilityTypes } from '../../../types/ProtestEvent';

const router = useRouter()
const store = useStore()
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const utilityKinds = utilityTypes

function formSubmitted(questionList: { id: string, answer: string }[]) {

    const utils = {
        utilityKinds: questionList.map((q) => {
            return { name: q.id, itemCount: q.answer }
        })
    }
    store.commit("addDraftedRegistrationUtility", utils)

    store.getters.getSkipStepState ? router.push({ name: "CheckForm" }) : router.push({ name: "EventOtherForm" })
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
                    <span class="fh2">Verstanden! Als Nächstes geht es um Hilfsmittel.</span>
                </p>
            </div>
        </template>
        <question
            v-for="util in utilityKinds"
            :id="util"
            type="number"
            :title="'Wie viele ' + util + ' wollt ihr benutzen?'"
        ></question>
    </flow-form>
</template>

<style scoped>
</style>

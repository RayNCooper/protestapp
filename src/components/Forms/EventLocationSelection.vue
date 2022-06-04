<script setup lang="ts">
import { FlowForm, Question, LinkOption, ChoiceOption } from '@ditdot-dev/vue-flow-form'
import { LegalEntity } from '../../../types/LegalEntity';
import { computed, reactive, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { germanLanguageModel } from '../../languageModel';
import { capitalize } from 'lodash';

const router = useRouter()
const store = useStore()

const form = reactive({
    location: null,
})

const locationChoices = [{ label: "Berlin", value: "berlin" }]
/* const locationChoices = [{ label: "Berlin", value: "berlin" }, { label: "Hamburg", value: "hamburg" }, { label: "Köln", value: "koeln" },] */

function onSubmit(questionList: Array<{ answer: string, id: string }>) {
    store.commit("addDraftedRegistrationLocation", form)
    router.push({ name: "EventGeneralForm" })
}
</script>

<template>
    <flow-form
        @submit="onSubmit"
        :standalone="true"
        v-bind:language="germanLanguageModel"
        :progressbar="false"
        :navigation="false"
    >
        <template v-slot:complete>
            <div class="f-section-wrap">
                <p>
                    <span
                        class="fh2"
                    >{{ capitalize(form.location!) }} also? Jetzt geht es um die Veranstaltung.</span>
                </p>
            </div>
        </template>
        <question
            id="location"
            required
            v-model="form.location"
            type="multipleChoice"
            title="In welcher Stadt findet die Veranstaltung statt?"
            :nextStepOnAnswer="true"
            :helpTextShow="false"
            :options="locationChoices"
        ></question>
    </flow-form>
</template>

<style></style>
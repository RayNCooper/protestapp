<script setup lang="ts">
import { FlowForm, Question, ChoiceOption } from "@ditdot-dev/vue-flow-form"
import { LegalEntity } from '../../../types/LegalEntity';
import { computed, reactive, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { germanLanguageModel } from '../../languageModel';
import { peopleSelection } from "./descriptionLinks"

const router = useRouter()
const store = useStore()
const showForm = ref(false)

const descriptionLinks = peopleSelection

const form = reactive({
    applicant: null,
    organizer: null,
    manager: null
})

onBeforeMount(async () => {
    await store.dispatch("setLegalEntititiesState")
    showForm.value = true
})

const legalEntities = computed(() => store.getters.getLegalEntities)
const legalEntityChoices = computed(() => {
    const entities = legalEntities.value.map((entity: LegalEntity) => { return { label: `🙋 ${entity.firstName} ${entity.lastName}, ${entity.streetName + " " + entity.streetNumber} ${entity.institutionName ? " - 🏠 " + entity.institutionName : ""}`, value: entity.id } })
    const choice = [new ChoiceOption({
        label: 'Neue Person registrieren',
        value: 'register'
    })]

    return [...entities, ...choice]
})

function onAnswer(questionAnswered: { answer: string, id: string }) {
    if (questionAnswered.answer === "register") { router.push({ name: "LegalEntityForm" }) }
}
function onSubmit(questionList: Array<{ answer: string, id: string }>) {
    form.applicant = store.getters.getLegalEntity(form.applicant)
    form.organizer = form.organizer ? store.getters.getLegalEntity(form.organizer) : form.applicant
    form.manager = form.manager ? store.getters.getLegalEntity(form.manager) : form.organizer
    store.commit("addDraftedRegistrationPeople", form)
    store.getters.getSkipStepState ? router.push({ name: "CheckForm" }) : router.push({ name: "EventLocationSelection" })
}
</script>

<template>
    <flow-form
        v-if="showForm"
        @answer="onAnswer"
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
                    >Jetzt sind die Verantwortlichen geklärt. Als Nächstes geht es um den Veranstaltungsort.</span>
                </p>
            </div>
        </template>
        <question
            id="Applicant"
            required
            v-model="form.applicant"
            type="multipleChoice"
            title="Wer meldet die Veranstaltung an?"
            :nextStepOnAnswer="true"
            :helpTextShow="false"
            :descriptionLink="descriptionLinks.applicant"
            :options="legalEntityChoices"
        ></question>

        <question
            id="Organizer"
            v-model="form.organizer"
            type="multipleChoice"
            title="Wer ist der offizielle Veranstalter?"
            :nextStepOnAnswer="true"
            tagline="''Leiter der Versammlung ist der Veranstalter. Wird die Versammlung von einer Vereinigung veranstaltet, so ist ihr Vorsitzender der Leiter.'' (§ 7 II 1,2 VersammlG)"
            helpText=" "
            subtitle="(optional, sonst Anmelder = Veranstalter)"
            :descriptionLink="descriptionLinks.organizer"
            :options="legalEntityChoices"
        ></question>
        <question
            id="Manager"
            v-model="form.manager"
            type="multipleChoice"
            title="Wer leitet die Veranstaltung?"
            :nextStepOnAnswer="true"
            helpText=" "
            subtitle="(optional, sonst Veranstalter = Leiter)"
            description="📌"
            :descriptionLink="descriptionLinks.manager"
            :options="legalEntityChoices"
        ></question>
    </flow-form>
</template>

<style></style>
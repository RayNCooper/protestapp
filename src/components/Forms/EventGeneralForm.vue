<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { germanLanguageModel } from '../../languageModel';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { general } from './descriptionLinks';

const store = useStore()
const router = useRouter()
const form = reactive<{
    type: string, topic: string, date: string, startTime: string, endTime: string, location: string, route?: string
}>({
    type: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    route: "",
})

const eventTypeChoices = computed(() => {
    const choices = [
        new ChoiceOption({
            label: 'Versammlung',
            value: 'versammlung'
        })
    ]

    if (store.getters.getDraftedRegistration.location === "hamburg") choices.push(
        new ChoiceOption({
            label: 'Aufzug',
            value: 'aufzug'
        }))

    return choices
})

function formSubmitted(questionList: Array<{ id: string, answer: string }>) {
    const d = new Date("1997-12-04")
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
    const month = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()
    form.date = day + "." + month + "." + d.getFullYear()
    store.commit("addDraftedRegistrationGeneral", form)
    store.getters.getSkipStepState ? router.push({ name: "CheckForm" }) : router.push({ name: "EventParticipationForm" })
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
                    <span
                        class="fh2"
                    >Klasse! Als Nächstes brauchen wir Informationen über die Teilnahme.</span>
                </p>
            </div>
        </template>
        <question
            v-model="form.type"
            id="type"
            required
            type="multipleChoice"
            :nextStepOnAnswer="true"
            :options="eventTypeChoices"
            title="Welche Art von Demonstration möchtest du organisieren?"
            subtitle="Es wird unterschieden zwischen Versammlung und Aufzug"
            helpText="Hinweis: Aufzüge sind auf unserer Plattform momentan nur in Hamburg möglich"
            :descriptionLink="general"
        ></question>
        <question
            v-model="form.topic"
            id="topic"
            required
            type="text"
            title="Welches Thema hat die Veranstaltung?"
        ></question>
        <question
            v-model="form.date"
            id="date"
            required
            type="date"
            subtitle="Hinweis: Bei Klick auf den Text öffnet sich eine Datumsauswahl"
            helpText=" "
            title="An welchem Tag findet die Veranstaltung statt?"
        ></question>
        <question
            v-model="form.startTime"
            id="startTime"
            required
            type="number"
            mask="##:##"
            placeholder="12:00"
            title="Wann beginnt die Veranstaltung?"
        ></question>
        <question
            v-model="form.endTime"
            id="endTime"
            required
            type="number"
            mask="##:##"
            placeholder="16:00"
            title="Wann endet die Veranstaltung?"
        ></question>
        <question
            v-model="form.location"
            id="location"
            required
            type="text"
            :title="form.type === 'versammlung' ? 'Wo findet die Versammlung statt?' : 'Wo beginnt der Aufzug?'"
        ></question>
        <question
            v-model="form.route"
            :required="form.type == 'aufzug'"
            id="route"
            type="text"
            :subtitle="form.type == 'aufzug' ? 'Präziser: Welche Route ist für euren Aufzug vorgesehen?' : '(optional, nur für Aufzüge relevant)'"
            helpText=" "
            title="Welche Eckpunkte gibt es und wo endet die Veranstaltung?"
        ></question>
    </flow-form>
</template>

<style scoped>
</style>

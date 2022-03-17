<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive } from 'vue';
import lang from "flatpickr/dist/l10n/de.js"
import { FlowForm, Question, ChoiceOption, LinkOption, MaskPresets } from '@ditdot-dev/vue-flow-form'
import { germanLanguageModel } from '../../languageModel';
import { useRouter } from 'vue-router';

const router = useRouter()
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const form = reactive({
    type: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    route: "",
})

const eventTypeChoices = [
    new ChoiceOption({
        label: 'Versammlung',
        value: 'versammlung'
    }),
    new ChoiceOption({
        label: 'Aufzug',
        value: 'aufzug'
    }),
    /* new ChoiceOption({
        label: 'Mahnwache',
        value: 'mahnwache'
    }), */
]

function formSubmitted(questionList: Array<{ id: string, answer: string }>) {
    router.push({ name: "EventParticipationForm" })
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
            helpText=" "
            :descriptionLink="[
                new LinkOption({
                    url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
                    text: '📌 VersammlG (Versammlungsgesetz)', // optional, default is link url
                    target: '_blank' // optional, default is '_blank'
                }),
            ]"
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
            type="number"
            mask="##.##.####"
            placeholder="TT.MM.JJJJ"
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
            v-if="form.type === 'versammlung'"
            v-model="form.location"
            id="location"
            required
            type="text"
            title="Wo findet die Versammlung statt?"
        ></question>
        <question
            v-else
            v-model="form.location"
            id="location"
            required
            type="text"
            title="Wo beginnt der Aufzug?"
        ></question>
        <question
            v-else
            v-model="form.route"
            id="route"
            type="text"
            title="Welche Zwischenstopps hat der Aufzug und wo endet er?"
        ></question>
    </flow-form>
</template>

<style scoped>
</style>

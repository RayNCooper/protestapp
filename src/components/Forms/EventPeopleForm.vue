<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive } from 'vue';
import { germanLanguageModel } from '../../languageModel';
import { FlowForm, Question, } from '@ditdot-dev/vue-flow-form'
import { useRouter } from 'vue-router';

const router = useRouter()

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setu
const form = reactive({
    institutionName: "",
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    zipCode: "",
    location: "",
    phone: "",
    email: "",
    fax: "",
})

function formSubmitted(questionList: Array<{ id: string, answer: string }>) {
    router.push({ name: "EventPeopleSelection" })
}
</script>

<template>
    <flow-form
        :timer="true"
        :standalone="true"
        @submit="formSubmitted"
        v-bind:language="germanLanguageModel"
    >
        <template v-slot:complete>
            <div class="f-section-wrap">
                <p>
                    <span
                        class="fh2"
                    >Klasse! Wir haben {{ form.firstName + " " + form.lastName }} deiner Personenliste hinzugefügt.</span>
                </p>
            </div>
        </template>
        <question
            v-model="form.institutionName"
            id="institutionName"
            type="text"
            title="Welcher Organisation gehörst du an?"
            subtitle="(optional)"
        ></question>
        <question
            v-model="form.firstName"
            id="firstName"
            required
            type="text"
            title="Wie heißt du mit Vornamen?"
        ></question>
        <question
            v-model="form.lastName"
            id="lastName"
            required
            type="text"
            title="Wie lautet dein Nachname?"
        ></question>
        <question
            v-model="form.streetName"
            id="streetName"
            required
            type="text"
            title="Auf welcher Straße befindet sich dein Wohnsitz?"
        ></question>
        <question
            v-model="form.streetNumber"
            id="streetNumber"
            required
            type="text"
            title="Und die dazugehörige Hausnummer?"
        ></question>
        <question
            v-model="form.zipCode"
            id="zipCode"
            required
            type="text"
            title="Wie lautet die PLZ deines Wohnsitzes?"
        ></question>
        <question
            v-model="form.location"
            id="location"
            required
            type="text"
            title="In welchem Ort befindet sich dein Wohnsitz?"
        ></question>
        <question
            v-model="form.phone"
            id="phone"
            required
            type="phone"
            title="Wie lautet deine Mobilfunknummer?"
        ></question>
        <question
            v-model="form.email"
            id="email"
            required
            type="email"
            title="Wie lautet deine Email Adresse?"
        ></question>
        <question
            v-model="form.fax"
            id="fax"
            type="text"
            title="Wie lautet deine Faxnummer?"
            subtitle="(optional)"
        ></question>
    </flow-form>
</template>

<style>
</style>
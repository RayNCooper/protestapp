<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive } from 'vue';
import FormWrapper from './FormWrapper.vue';
import { germanLanguageModel, legalEntityQuestions } from '../questionnaires';
import { FlowForm, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setu
const form = reactive({
    institutionName: "",
    firstName: "Dennis",
    lastName: "Reinkober",
    streetName: "",
    streetNumber: "",
    zipCode: "",
    location: "",
    phone: "",
    fax: "",
    email: ""
})

function formSubmitted(questionList: Array<{ id: string, answer: string }>) {

}
</script>

<template>
    <flow-form
        :standalone="true"
        :questions="legalEntityQuestions"
        @submit="formSubmitted"
        v-bind:language="germanLanguageModel"
    />
    <!-- <FormWrapper image-src="./src/assets/form.jpg" form-title="Anmeldende Person">
        <template v-slot:form>
            <ui-grid>
                <ui-grid-cell columns="6">
                    <ui-textfield outlined class="form_textfield">
                        Name der Organisation (optional)
                        <template #after>
                            <ui-textfield-icon>groups</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>
            <ui-grid>
                <ui-grid-cell columns="6">
                    <ui-textfield required outlined class="form_textfield">
                        Vorname
                        <template #after>
                            <ui-textfield-icon>person</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
                <ui-grid-cell columns="6">
                    <ui-textfield required outlined class="form_textfield">
                        Nachname
                        <template #after>
                            <ui-textfield-icon>person</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>

            <ui-grid>
                <ui-grid-cell columns="9">
                    <ui-textfield required outlined class="form_textfield">
                        Straße
                        <template #after>
                            <ui-textfield-icon>home</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
                <ui-grid-cell columns="3">
                    <ui-textfield required outlined class="form_textfield">
                        Hausnummer
                        <template #after>
                            <ui-textfield-icon>home</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>

            <ui-grid>
                <ui-grid-cell columns="6">
                    <ui-textfield required outlined class="form_textfield">
                        Postleitzahl
                        <template #after>
                            <ui-textfield-icon>place</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
                <ui-grid-cell columns="6">
                    <ui-textfield required outlined class="form_textfield">
                        Ort
                        <template #after>
                            <ui-textfield-icon>location_city</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>

            <ui-grid>
                <ui-grid-cell columns="4">
                    <ui-textfield required outlined class="form_textfield">
                        Telefon (mobil)
                        <template #after>
                            <ui-textfield-icon>smartphone</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
                <ui-grid-cell columns="4">
                    <ui-textfield required outlined class="form_textfield">
                        Email
                        <template #after>
                            <ui-textfield-icon>email</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
                <ui-grid-cell columns="4">
                    <ui-textfield outlined class="form_textfield">
                        Fax (optional)
                        <template #after>
                            <ui-textfield-icon>fax</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>
        </template>
    </FormWrapper>-->
</template>

<style>
</style>
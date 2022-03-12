<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { reactive } from 'vue';
import lang from "flatpickr/dist/l10n/de.js"
import FormWrapper from '../util/CardWrapper.vue';

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const form = reactive({
    date: "",
    startTime: "",
    endTime: ""
})

const dateConfig = {
    defaultDate: 'today',
    locale: lang.de
}
const startTimeConfig = {
    time_24hr: true,
    mode: 'time',
    locale: lang.de
}
const endTimeConfig = {
    time_24hr: true,
    mode: 'time',
    locale: lang.de
}
</script>

<template>
    <FormWrapper image-src="./src/assets/form.jpg" form-title="Veranstaltung: Allgemein">
        <template v-slot:form>
            <ui-grid>
                <ui-grid-cell columns="12">
                    <ui-textfield outlined class="form_textfield">
                        Thema
                        <template #after>
                            <ui-textfield-icon>title</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>
            <ui-grid>
                <ui-grid-cell columns="12">
                    <ui-datepicker
                        outlined
                        class="form_textfield"
                        v-model="form.date"
                        :config="dateConfig"
                        placeholder="Datum"
                        withTrailingIcon
                    >
                        <template #after>
                            <ui-textfield-icon>event</ui-textfield-icon>
                        </template>
                    </ui-datepicker>
                </ui-grid-cell>
            </ui-grid>
            <ui-grid>
                <ui-grid-cell columns="12">
                    <ui-datepicker
                        outlined
                        class="form_textfield"
                        v-model="form.startTime"
                        :config="startTimeConfig"
                        placeholder="Startzeit"
                    >
                        <template #after>
                            <ui-textfield-icon>schedule</ui-textfield-icon>
                        </template>
                    </ui-datepicker>
                </ui-grid-cell>
            </ui-grid>
            <ui-grid>
                <ui-grid-cell columns="12">
                    <ui-datepicker
                        outlined
                        class="form_textfield"
                        v-model="form.endTime"
                        :config="endTimeConfig"
                        placeholder="Endzeit"
                    >
                        <template #after>
                            <ui-textfield-icon>watch_later</ui-textfield-icon>
                        </template>
                    </ui-datepicker>
                </ui-grid-cell>
            </ui-grid>
            <ui-grid>
                <ui-grid-cell columns="12">
                    <ui-textfield outlined class="form_textfield">
                        Datum
                        <template #after>
                            <ui-textfield-icon>event</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </ui-grid-cell>
            </ui-grid>
        </template>
    </FormWrapper>
</template>

<style scoped>
</style>

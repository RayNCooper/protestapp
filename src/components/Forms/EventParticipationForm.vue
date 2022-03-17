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
    participantCount: 0,
    usingStewards: false,
    stewardCount: 0
})

function formSubmitted() {
    router.push({ name: "EventVehicleForm" })
}
</script>

<template>
    <flow-form
        ref="participation_flowform"
        :timer="true"
        :standalone="true"
        @submit="formSubmitted"
        :language="germanLanguageModel"
    >
        <template v-slot:complete>
            <div class="f-section-wrap">
                <p>
                    <span class="fh2">
                        {{
                            form.participantCount > 100 ? 'Wow, ' + form.participantCount + ' erwartete Teilnehmer!' : 'Danke!'
                        }} Jetzt geht es um Fahrzeuge.
                    </span>
                </p>
            </div>
        </template>
        <template v-slot:completeButton>
            <button
                class="o-btn-action"
                type="button"
                href="#"
                aria-label="ok"
                style="margin-right: 1em;"
            >
                <span @click="formSubmitted()">weiter</span>
            </button>
            <button
                class="o-btn-action"
                type="button"
                href="#"
                aria-label="ok"
                @click="this.$refs.participation_flowform.reset()"
            >
                <span>zurücksetzen</span>
            </button>
            <a class="f-enter-desc" href="#">
                <span class="f-string-em">Enter</span> drücken für 'ok'
            </a>
        </template>
        <question
            v-model="form.participantCount"
            id="participantCount"
            required
            type="number"
            subtitle="(geschätzt)"
            title="Wie viele Teilnehmer werden erwartet?"
        ></question>
        <question
            v-model="form.usingStewards"
            id="usingStewards"
            required
            type="multipleChoice"
            :nextStepOnAnswer="true"
            :options="[
                new ChoiceOption({
                    label: 'Ja',
                    value: true
                }),
                new ChoiceOption({
                    label: 'Nein',
                    value: false
                })
            ]"
            title="Werdet ihr Ordner einsetzen?"
        ></question>
        <question
            v-if="form.usingStewards"
            v-model="form.stewardCount"
            id="stewardCount"
            required
            type="number"
            title="Wie viele Ordner werden eingesetzt?"
        ></question>
        <question
            v-else
            type="sectionbreak"
            title="Hinweis"
            :content="form.participantCount > 100 ? form.participantCount + ' Teilnehmer sind viele Leute ohne einen einzigen Ordner. Wir empfehlen Ordner bei einer größeren Anzahl von Teilnehmern.' : form.participantCount + ' Teilnehmer, kein Ordner - ist notiert.'"
        ></question>
    </flow-form>
</template>

<style scoped>
</style>

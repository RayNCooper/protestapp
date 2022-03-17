<script setup lang="ts">
import { FlowForm, Question, LinkOption, ChoiceOption } from '@ditdot-dev/vue-flow-form'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { germanLanguageModel } from '../../languageModel';

const router = useRouter()

const legalEntityChoices = computed(() => {
    return [
        new ChoiceOption({
            label: 'Neue Person registrieren',
            value: 'register'
        }),
        new ChoiceOption({
            label: 'Spiderman',
        }),
        new ChoiceOption({
            label: 'Batman',
        }),
    ];
})
function onAnswer(questionAnswered: { answer: string, id: string }) {
    if (questionAnswered.answer === "register") { router.push({ name: "LegalEntityForm" }) }
}
function onSubmit(questionList: Array<{ answer: string, id: string }>) {
    questionList.forEach((q) => console.log(q.answer + ", " + q.id))
    router.push({ name: "EventGeneralForm" })
}
</script>

<template>
    <flow-form
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
                    >Fertig. Als Nächstes geht es um deine Veranstaltung.</span>
                </p>
            </div>
        </template>
        <question
            id="Applicant"
            required
            type="multipleChoice"
            title="Wer meldet die Veranstaltung an?"
            :nextStepOnAnswer="true"
            :helpTextShow="false"
            description="📌"
            :descriptionLink="[
                new LinkOption({
                    url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
                    text: 'VersammlG (Versammlungsgesetz)', // optional, default is link url
                    target: '_blank' // optional, default is '_blank'
                })
            ]"
            :options="legalEntityChoices"
        ></question>

        <question
            id="Organizer"
            type="multipleChoice"
            title="Wer ist der offizielle Veranstalter?"
            :nextStepOnAnswer="true"
            tagline="''Leiter der Versammlung ist der Veranstalter. Wird die Versammlung von einer Vereinigung veranstaltet, so ist ihr Vorsitzender der Leiter.'' (§ 7 II 1,2 VersammlG)"
            helpText=" "
            subtitle="(optional, sonst Anmelder = Veranstalter)"
            :descriptionLink="[
                new LinkOption({
                    url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
                    text: '📌 VersammlG (Versammlungsgesetz)', // optional, default is link url
                    target: '_blank' // optional, default is '_blank'
                }),
                new LinkOption({
                    url: 'https://www.gesetze-im-internet.de/versammlg/__7.html',
                    text: '📌 §7 VersammlG', // optional, default is link url
                    target: '_blank' // optional, default is '_blank'
                })
            ]"
            :options="legalEntityChoices"
        ></question>
        <question
            id="Manager"
            type="multipleChoice"
            title="Wer leitet die Veranstaltung?"
            :nextStepOnAnswer="true"
            description="📌"
            :descriptionLink="[
                new LinkOption({
                    url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
                    text: 'VersammlG (Versammlungsgesetz)', // optional, default is link url
                    target: '_blank' // optional, default is '_blank'
                })
            ]"
            :options="legalEntityChoices"
        ></question>
    </flow-form>
</template>

<style></style>
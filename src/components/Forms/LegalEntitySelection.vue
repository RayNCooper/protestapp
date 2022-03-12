<script setup lang="ts">
import { FlowForm, Question, LinkOption, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { germanLanguageModel } from '../../questionnaires';

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
        <question
            id="Applicant"
            required
            type="multipleChoice"
            title="Wer meldet die Veranstaltung an?"
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
        <question
            id="Organizer"
            required
            type="multipleChoice"
            title="Wer ist der offizielle Veranstalter?"
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
        <question
            id="Manager"
            required
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
<script setup lang="ts">
import CardWrapper from "../util/CardWrapper.vue";

const faq = [{
    q: "Was ist DeinProtest?",
    a: "DP* ist eine Plattform zur vereinfachten Erstellung und Verwaltung von Versammlungsdokumenten und dazugehöriger Information.",
},
{
    q: "Was kann ich mit DeinProtest machen?",
    a: "Es ist momentan möglich, Anmeldungsformulare für ausgewählte Städte zu erstellen. Später sollen noch Funktionen wie bspw. Teilen von Versammlungen dazukommen und die Anzahl der verfügbaren Städte wird sich erhöhen."
},
{
    q: "In welchen Städten ist DeinProtest verfügbar?",
    a: "Momentan ist unser Dienst nur in Berlin verfügbar. Wir arbeiten allerdings gerade zusätzlich an Köln, Düsseldorf und Hamburg."
},
{
    q: "Für wen wurde DeinProtest entwickelt?",
    a: "Zu Allererst wollen wir mit DP* die Organisierenden von Protesten ansprechen. Zu einer späteren Zeit wollen wir auch Wenigdemonstrierer ansprechen, indem wir Versammlungen leichter teilbar machen."
},
{
    q: "Ich möchte helfen, spenden oder Feedback geben, was muss ich tun?",
    a: "Klasse! Bitte schreibe mir dazu eine Email."
},
]
</script>

<template>
    <h3 style="margin-top: 3em; margin-bottom: 0em;">FAQ (Häufig gestellte Fragen)</h3>

    <card-wrapper style="margin-top:1em; width: 90%;">
        <template #content>
            <ui-collapse v-for="obj, i in faq" :key="i" with-icon style="margin-bottom: 1em">
                <template #toggle>
                    <div style="font-weight: bold">{{ obj.q }}</div>
                </template>
                <div style="word-spacing: 2px; line-height: 1.3em">{{ obj.a }}</div>
            </ui-collapse>
            <div :class="$tt('caption')">*DP = DeinProtest</div>
        </template>
    </card-wrapper>
</template>

<style>
</style>
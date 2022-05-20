<script setup lang="ts">
import CardWrapper from "./util/CardWrapper.vue";
</script>

<template>
    <card-wrapper
        card-title="Demokratie lebt von Mitsprache."
        actionBarHeadlineSize="1"
        style="background-color: white;"
        class="landingCard"
    >
        <template #content>
            <p style="margin-bottom: 1.5em; margin-top: 0em; font-size: large; font-weight:100;">
                Proteste zu organisieren ist eine Menge Arbeit.
                <br />
                <span style="color: #3ec994; font-weight: 550;">Wir helfen euch dabei.</span>
                <br />
            </p>

            <ul style="font-size:larger">
                <li
                    class="landingListItem landingListItemQuestion"
                >Aktuelle Informationen und Formulare</li>
                <li
                    class="landingListItem landingListItemPolice"
                >Kontaktdaten polizeilicher Ansprechpartner</li>
                <li
                    class="landingListItem landingListItemLocation"
                >Verfügbar in Berlin, Hamburg und Köln</li>
            </ul>

            <p style="margin-bottom: 0.5em; margin-top: 1.5em; font-size: small;">
                Organisiere jetzt
                <b>kostenlos</b> deinen Protest!
            </p>

            <ui-button
                style="background-color: black; color: white; width: 100%; height: 3em;"
                raised
                @click="$router.push({ name: 'Dashboard' })"
            >Protest Organisieren</ui-button>
        </template>
    </card-wrapper>
</template>

<style>
.protestImg {
    width: 100%;
    margin-top: 1em;
    border-radius: 0.5em;
}
.landingListItemPolice:before {
    content: "👮";
    margin-left: -20px;
    margin-right: 10px;
}
.landingListItemLocation:before {
    content: "🏠";
    margin-left: -20px;
    margin-right: 10px;
}
.landingListItemQuestion:before {
    content: "📑";
    margin-left: -20px;
    margin-right: 10px;
}
.landingCard {
    width: 90%;
}
.landingListItem {
    font-size: 12px;
}
@media (min-width: 820px) {
    .landingCard {
        width: 50%;
    }
    .landingListItem {
        font-size: medium;
    }
}
</style>
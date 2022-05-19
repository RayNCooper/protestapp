<script setup lang="ts">
import CardWrapper from "./util/CardWrapper.vue";

</script>

<template>
    <ui-grid>
        <ui-grid-cell columns="6">
            <card-wrapper
                card-title="Versammlungen Organisieren"
                action-bar-top-icon="add"
                actionBarHeadlineSize="1"
                style="background-color: white;"
            >
                <template #content>
                    <p style="margin-bottom: 1.5em; font-size: larger;">
                        Proteste zu organisieren ist eine Menge Arbeit.
                        <br />Wir nehmen sie euch ab.
                        <br />
                    </p>

                    <ul>
                        <li class="landingListItem">Verfügbar in Berlin, Hamburg und Köln</li>
                        <li class="landingListItem">Aktuelle Informationen und Formulare</li>
                        <li class="landingListItem">Kontaktdaten polizeilicher Ansprechpartner</li>
                    </ul>

                    <p style="margin-bottom: 0.5em; margin-top: 1.5em;">
                        Organisiere jetzt
                        <u>kostenlos</u> deinen Protest!
                    </p>

                    <ui-button
                        style="background-color: black; color: white; width: 100%"
                        raised
                        @click="$router.push({ name: 'Dashboard' })"
                    >Protest Organisieren</ui-button>
                    <h5
                        style="margin-top: 1em; margin-bottom: -1em;"
                    >Demokratien leben von Mitsprache - Wir fördern das.</h5>
                </template>
            </card-wrapper>
        </ui-grid-cell>
        <ui-grid-cell columns="6">
            <img src="../assets/protest.jpg" class="protestImg" />
        </ui-grid-cell>
    </ui-grid>
</template>

<style>
.protestImg {
    width: 100%;
    margin-top: 1em;
    border-radius: 0.5em;
}
.landingListItem:before {
    content: "✅";
    margin-left: -20px;
    margin-right: 10px;
}
</style>
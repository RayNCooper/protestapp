<script setup lang="ts">
import CardWrapper from "../util/CardWrapper.vue";
</script>

<template>
    <card-wrapper
        card-title="Diese Seite existiert nicht 😕"
        actionBarHeadlineSize="1"
        class="notFoundCard"
    >
        <template #content>
            <div :class="$tt('subtitle1')">
                Leider ist die Seite, die du angefragt hast nicht mehr verfügbar.
                <br />Das könnte daran liegen, dass die Ressource nicht mehr existiert oder dein Link falsch ist.
            </div>
            <ui-button
                style="width: 100%; margin-top:1em; height: 4em; color: #36c78f"
                raised
                icon="space_dashboard"
                @click="$router.replace({ name: 'Dashboard' })"
            >Zum Dashboard</ui-button>
        </template>
    </card-wrapper>
</template>

<style>
@media (min-width: 820px) {
    .notFoundCard {
        margin-top: 2em;
        border: 1px solid rgba(255, 0, 0, 0.304);
    }
}
</style>
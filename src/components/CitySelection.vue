<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <ui-grid>
        <ui-grid-cell :columns="6">
            <ui-card>
                <ui-card-content>
                    <ui-card-media square class="berlin_card_media"></ui-card-media>
                    <ui-card-text>Berlin</ui-card-text>
                </ui-card-content>
            </ui-card>
        </ui-grid-cell>
        <ui-grid-cell nested :columns="6">
            <ui-grid-cell :columns="6">
                <ui-card>
                    <ui-card-content>
                        <ui-card-media square class="koeln_card_media"></ui-card-media>
                        <ui-card-text>Köln</ui-card-text>
                        <ui-list-divider></ui-list-divider>
                    </ui-card-content>
                </ui-card>
            </ui-grid-cell>
            <ui-grid-cell :columns="6">
                <ui-card>
                    <ui-card-content>
                        <ui-card-media square class="hamburg_card_media"></ui-card-media>
                        <ui-card-text>Hamburg</ui-card-text>
                        <ui-list-divider></ui-list-divider>
                    </ui-card-content>
                </ui-card>
            </ui-grid-cell>
        </ui-grid-cell>
    </ui-grid>
</template>

<style>
.berlin_card_media {
    background-image: url(../assets/berlin.jpg);
}
.hamburg_card_media {
    background-image: url(../assets/hamburg.jpg);
}
.koeln_card_media {
    background-image: url(../assets/koeln.jpg);
}
</style>

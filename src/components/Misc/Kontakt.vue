<script setup lang="ts">
import CardWrapper from "../util/CardWrapper.vue";
</script>

<template>
    <h2 style="margin-top: 3em; margin-bottom: 0em;">Kontakt</h2>

    <card-wrapper style="margin-top:1em; text-align: center; max-width: 440px;">
        <template #content>
            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
            >
                <ui-list nonInteractive>
                    <ui-item>
                        <ui-item-first-content>
                            <ui-icon style="color: #3ec994">phone</ui-icon>
                        </ui-item-first-content>
                        <ui-item-text-content>
                            <a
                                href="tel:+491785279425"
                                style="text-decoration: none; color:black"
                            >+49 178 5279425</a>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-first-content>
                            <ui-icon style="color: #3ec994">email</ui-icon>
                        </ui-item-first-content>
                        <ui-item-text-content>
                            <a
                                href="mailto:dennis@reinkober.it"
                                style="text-decoration: none; color:black"
                            >dennis@reinkober.it</a>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </div>
        </template>
    </card-wrapper>
</template>

<style>
</style>
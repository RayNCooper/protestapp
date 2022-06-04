<script setup lang="ts">
import CardWrapper from "../util/CardWrapper.vue";
import me from "../../assets/me.png"
</script>

<template>
    <h2 style="margin-top: 3em; margin-bottom: 0em;">Über Uns</h2>

    <card-wrapper style="margin-top:1em; text-align: center; max-width: 440px;">
        <template #content>
            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
            >
                <div
                    :class="$tt('subtitle1')"
                    style="font-weight: bold; margin-bottom: 0.5em;"
                >"Wir" - das bin momentan nur ich.</div>
                <img :src="me" style=" width: 10em; border-radius: 100%;" />
                <div :class="$tt('caption')">Dennis R, 0C9C Hex UG</div>

                <div :class="$tt('subtitle1')" style="font-weight: 450; margin-top: 1em;">
                    Seit Mitte 2022 arbeite ich an DeinProtest,
                    um reibungslosere Versammlungen für alle zu ermöglichen.
                </div>

                <div :class="$tt('subtitle2')" style="font-weight: 300; margin-top: 1em;">
                    Ich realisiere Softwareprojekte
                    für kleine sowieso mittelgroße Kunden
                    und vertreibe
                    Web Software nach dem Software-as-a-Service Modell.
                </div>
            </div>
        </template>
    </card-wrapper>
</template>

<style>
</style>
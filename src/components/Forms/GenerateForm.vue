<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { useRouter } from 'vue-router';
import CardWrapper from '../util/CardWrapper.vue';
import { useStore } from 'vuex';
import { Registration } from '../../../types/Registration';

const router = useRouter()
const store = useStore()

const loading = ref(true)
const loadingText = ref("")

const formUrl = ref("")
const failedGenerate = ref(false)
const showFailedGenerateSnackbar = ref(false)
const errorMessage = ref("")

onBeforeMount(async () => {
    setLoadingText(0)
    const draftJSON = localStorage.getItem("draftedRegistration")
    if (draftJSON) {
        const registration = JSON.parse(draftJSON) as Registration
        setTimeout(async () => {
            try {
                const result = await store.dispatch("callGenerateForm", registration)
                formUrl.value = result.data.url
                if (result.data.error == false) {
                    result as { data: { error: boolean, url: string } }
                    process.env.NODE_ENV == "production" && localStorage.removeItem("draftedRegistration")
                    if (!store.getters.getUser) {
                        if (localStorage.getItem("registrations")) {
                            const localRegistrations = JSON.parse(localStorage.getItem("registrations")!)
                            localRegistrations.push({ registration: registration, publicUrl: result.data.url })
                            localStorage.setItem("registrations", JSON.stringify(localRegistrations))
                        } else localStorage.setItem("registrations", JSON.stringify([{ registration: registration, publicUrl: result.data.url }]))
                    }
                } else {
                    errorMessage.value = result.data.message
                    showFailedGenerateSnackbar.value = true;
                    failedGenerate.value = true
                }

                loading.value = false
            } catch (error) {
                errorMessage.value = "Fehler: Backend ist nicht verfügbar"
                showFailedGenerateSnackbar.value = true;
                failedGenerate.value = true
                console.log(error)
                loading.value = false
            }
        }, process.env.NODE_ENV == "production" ? 4000 : 1000);

    }
})

async function setLoadingText(i: number) {
    switch (i) {
        case 0:
            await setTimeout(() => {
                setLoadingText(1)
            }, 3000)
            loadingText.value = "Finde Droiden... 🤖"
            return
        case 1:
            await setTimeout(() => {
                setLoadingText(2)
            }, 3000)
            loadingText.value = "Berechne Umlaufbahn... 🚀"
            return
        case 2:
            await setTimeout(() => {
                setLoadingText(3)
            }, 3000)
            loadingText.value = "Betrete Orbit... 🪐"
            return
        case 3:
            await setTimeout(() => {
                setLoadingText(0)
            }, 3000)
            loadingText.value = "Verbiege Raum und Zeit... ⏰🌌"
            return
        default:
            return;
    }
}

</script>

<template>
    <div
        style="position: absolute; top: 40%; display: flex; justify-content: center; flex-direction: column; align-items: center;"
    >
        <template v-if="loading">
            <ui-spinner size="large" fourColored active></ui-spinner>
            <h1 style="margin-bottom: 2px">Generiere Formular</h1>
            <h4 style="margin-top: 0em; color: gray;">{{ loadingText }}</h4>
        </template>
        <template v-if="(!loading && !failedGenerate)">
            <h1 style="margin-bottom: 0">Fertig.</h1>
            <h4
                v-if="store.getters.getUser"
                style="margin-top: 2px; color: #4bcd9b"
            >Das Formular wurde im Dashboard gespeichert</h4>
            <h4
                v-else
                style="margin-top: 2px; color: #4bcd9b"
            >Der Link zum Formular wird im Browser gespeichert</h4>

            <div class="buttonFlex">
                <a
                    v-if="formUrl != ''"
                    v-button
                    :href="formUrl"
                    target="_noreferrer"
                    style="margin-top:2px; color:white; background-color: #4bcd9b;height: 3em;"
                    raised
                >Zum Formular</a>
                <ui-button
                    style="margin-top:2px; color:white; background-color:black;height: 3em;"
                    raised
                    @click="router.replace({ name: 'Dashboard' })"
                >Zum Dashboard</ui-button>
            </div>
        </template>
        <template v-else-if="failedGenerate">
            <h2 style="margin-bottom: 0; color: #ff1919;">Ein Fehler ist aufgetreten</h2>
            <h4
                style="margin-bottom: 2em;margin-top: 2px; color: gray;"
            >Versuche es jetzt oder später erneut.</h4>

            <div class="buttonFlex">
                <ui-button
                    style="margin-top:2px; color:white; background-color:#4bcd9b;height: 3em;"
                    raised
                    icon="description"
                    @click="router.replace({ name: 'CheckForm' })"
                >Zur Übersicht</ui-button>
                <ui-button
                    style="margin-top:2px; color:white; background-color:black;height: 3em;"
                    raised
                    icon="space_dashboard"
                    @click="router.replace({ name: 'Dashboard' })"
                >Zum Dashboard</ui-button>
            </div>
        </template>
        <ui-snackbar
            v-model="showFailedGenerateSnackbar"
            :message="errorMessage"
            timeout-ms="3000"
            :action-type="1"
        ></ui-snackbar>
        <ui-button icon="mail">Kontakt</ui-button>
    </div>
</template>

<style scoped>
@media (max-width: 820px) {
    .buttonFlex {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
}
@media (min-width: 820px) {
    .buttonFlex {
        display: flex;
        flex-direction: row;
        gap: 3px;
    }
}
</style>

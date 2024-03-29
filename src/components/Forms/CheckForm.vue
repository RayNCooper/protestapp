<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { FlowForm, Question, ChoiceOption, LinkOption } from '@ditdot-dev/vue-flow-form'
import { useRouter } from 'vue-router';
import CardWrapper from '../util/CardWrapper.vue';
import { useStore } from 'vuex';
import { assertionError } from '@firebase/util';
import { Registration } from '../../../types/Registration';
import { capitalize } from 'lodash-es';

const router = useRouter()
const store = useStore()

const loading = ref(true)
const registration = ref()
const showFailedSubmitSnackbar = ref(false)

const utilities = computed(() => {
    return registration.value.assembly.utilityKinds.map((utility: { name: string, itemCount: number }, i: number) => {
        if (utility.itemCount > 0) {
            const label = utility.itemCount + " " + utility.name
            return i > 0 ? (" " + label) : label
        }
        else return null
    }).filter((n: any) => n).toString()
})

onBeforeMount(async () => {
    const draftJSON = localStorage.getItem("draftedRegistration")
    if (draftJSON) {
        registration.value = JSON.parse(draftJSON) as Registration
    }
    setTimeout(() => loading.value = false
        , 1000)
})

function submitForm() {
    if (registration.value.assembly.topic && registration.value.assembly.participantCount > 0 && registration.value.assembly.covidPrecautions)
        router.push({ name: 'GenerateForm' })
    else showFailedSubmitSnackbar.value = true
}

</script>

<template>
    <template v-if="loading">
        <ui-spinner style="position: relative; top:30vh" fourColored active></ui-spinner>
    </template>
    <template v-if="!registration && !loading">
        <h3 style="margin-top: 3em">Es scheint als hättest du noch keine Anmeldung angefangen.</h3>
        <router-link
            :to="{ name: 'Dashboard', query: { hasNoDraftedRegistration: true } }"
        >Zur Startseite</router-link>
    </template>
    <template v-else-if="registration && !loading">
        <h2 class="checkFormHeading">{{ capitalize(registration.assembly.type) }}</h2>
        <card-wrapper
            card-title="Assoziierte Personen"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventPeopleSelection"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list
                    :type="2"
                    v-if="(registration.applicant || registration.organizer || registration.manager)"
                >
                    <ui-item>
                        <template #before="{ iconClass }">
                            <ui-icon :class="iconClass">article</ui-icon>
                        </template>
                        <ui-item-text-content>
                            <ui-item-text1>
                                {{
                                    `${registration.applicant.firstName} ${registration.applicant.lastName}
                                                                ${registration.applicant.institutionName ? " - " +
                                            registration.applicant.institutionName : ""} `
                                }}
                            </ui-item-text1>
                            <ui-item-text2>Anmelder</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <template #before="{ iconClass }">
                            <ui-icon :class="iconClass">campaign</ui-icon>
                        </template>
                        <ui-item-text-content>
                            <ui-item-text1>
                                {{
                                    `${registration.manager.firstName} ${registration.manager.lastName}
                                                                ${registration.manager.institutionName ? " - " + registration.manager.institutionName :
                                            ""} `
                                }}
                            </ui-item-text1>
                            <ui-item-text2>Veranstalter</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <template #before="{ iconClass }">
                            <ui-icon :class="iconClass">emoji_people</ui-icon>
                        </template>
                        <ui-item-text-content>
                            <ui-item-text1>
                                {{
                                    `${registration.organizer.firstName} ${registration.organizer.lastName}
                                                                ${registration.organizer.institutionName ? " - " +
                                            registration.organizer.institutionName : ""} `
                                }}
                            </ui-item-text1>
                            <ui-item-text2>Leiter</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <card-wrapper
            :card-title="registration.assembly.topic ? 'Allgemeine Information' : 'Allgemeine Information (ausstehend)'"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventLocationSelection"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list :type="2" v-if="registration.assembly.topic">
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ capitalize(registration.location) }}</ui-item-text1>
                            <ui-item-text2>Ort der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ capitalize(registration.assembly.type) }}</ui-item-text1>
                            <ui-item-text2>Typ der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.topic }}</ui-item-text1>
                            <ui-item-text2>Thema der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.date }}</ui-item-text1>
                            <ui-item-text2>Datum der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.startTime }}</ui-item-text1>
                            <ui-item-text2>Startzeit der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.endTime }}</ui-item-text1>
                            <ui-item-text2>Endzeit der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.location }}</ui-item-text1>
                            <ui-item-text2
                                v-if="registration.assembly.type == 'aufzug'"
                            >Startort der Veranstaltung</ui-item-text2>
                            <ui-item-text2 v-else>Ort der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item v-if="registration.assembly.type == 'aufzug'">
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.route }}</ui-item-text1>
                            <ui-item-text2>Route der Veranstaltung</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <card-wrapper
            :card-title="registration.assembly.participantCount > 0 ? 'Teilnahme' : 'Teilnahme (ausstehend)'"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventParticipationForm"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list v-if="registration.assembly.participantCount > 0" :type="2">
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.participantCount }}</ui-item-text1>
                            <ui-item-text2>Geschätzte Anzahl an Teilnehmern</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.usingStewards ? "Ja" : "Nein" }}</ui-item-text1>
                            <ui-item-text2>Einsatz von Ordnern</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item v-if="registration.assembly.usingStewards">
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.stewardCount }}</ui-item-text1>
                            <ui-item-text2>Anzahl Eingesetzter Ordner</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <card-wrapper
            card-title="Fahrzeuge"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventVehicleForm"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list :type="2">
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.usingVehicles ? "Ja" : "Nein" }}</ui-item-text1>
                            <ui-item-text2>Einsatz von Fahrzeugen</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item v-if="registration.assembly.usingVehicles">
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.vehicleKinds }}</ui-item-text1>
                            <ui-item-text2>Arten Eingesetzter Fahrzeuge</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <card-wrapper
            card-title="Hilfsmittel"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventUtilityForm"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list :type="2" v-if="utilities">
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ utilities }}</ui-item-text1>
                            <ui-item-text2>Arten Eingesetzter Hilfsmittel</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <card-wrapper
            :card-title="registration.assembly.covidPrecautions ? 'Andere' : 'Andere (ausstehend)'"
            action-bar-top="true"
            action-bar-top-icon="edit"
            action-bar-button-link-name="EventOtherForm"
            class="checkFormCard"
        >
            <template v-slot:content>
                <ui-list :type="2" v-if="registration.assembly.covidPrecautions">
                    <ui-item>
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.covidPrecautions }}</ui-item-text1>
                            <ui-item-text2>COVID Konformität</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                    <ui-item v-if="registration.assembly.comments">
                        <ui-item-text-content>
                            <ui-item-text1>{{ registration.assembly.comments }}</ui-item-text1>
                            <ui-item-text2>Kommentare</ui-item-text2>
                        </ui-item-text-content>
                    </ui-item>
                </ui-list>
            </template>
        </card-wrapper>
        <ui-button
            icon="table_view"
            class="generateButton"
            raised
            @click="submitForm"
        >Formular Generieren</ui-button>
    </template>
    <ui-snackbar
        v-model="showFailedSubmitSnackbar"
        :timeout-ms="1000"
        message="Fehler: Anmeldung unvollständig"
        :action-type="1"
    ></ui-snackbar>
</template>

<style scoped>
@media (min-width: 820px) {
    .checkFormCard {
        width: 80%;
    }
    .generateButton {
        margin-bottom: 1em;
        background-color: #4bcd9b;
        color: white;
        height: 4em;
        width: 80%;
    }
    .checkFormHeading {
        margin-top: 2em
    }
}
@media (max-width: 820px) {
    .checkFormCard {
        width: 95%;
        border: 1px solid #eaeaea;
        margin-top: 0;
    }
    .generateButton {
        margin-bottom: 1em;
        background-color: #4bcd9b;
        color: white;
        height: 4em;
        width: 95%;
    }
    .checkFormHeading {
        margin-top: 1em
    }
}
</style>

<script setup lang="ts">
import { Registration } from "../../../types/Registration";
import { useStore } from "vuex";
import CardWrapper from "../util/CardWrapper.vue";
import { computed, onBeforeMount } from "vue";
import { capitalize } from "lodash-es";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

onBeforeMount(async () => {
  await store.dispatch("setRegistrationsState")
})

const draftedData = computed(() => {
  const regJson = localStorage.getItem("draftedRegistration")
  if (regJson) {
    const draft = JSON.parse(regJson) as Registration
    return [{
      titel: draft.assembly.topic ? draft.assembly.topic : "-",
      datum: draft.assembly.date ? draft.assembly.date : "-",
      teilnehmerzahl: draft.assembly.participantCount ? draft.assembly.participantCount : "-",
      anmelder: draft.applicant.firstName + " " + draft.applicant.lastName,
      ort: draft.assembly.topic ? capitalize(draft.location) : "-",
    }]
  } else return null
})

const data = computed(() => {
  const remoteRegistrations = store.getters.getRegistrations as { registration: Registration, publicUrl: string }[]

  if (remoteRegistrations.length > 0) return remoteRegistrations.map((r) => {
    const asm = r.registration.assembly
    const app = r.registration.applicant
    return {
      titel: asm.topic,
      datum: asm.date,
      teilnehmerzahl: asm.participantCount,
      anmelder: app.firstName + " " + app.lastName,
      ort: capitalize(r.registration.location),
      publicUrl: r.publicUrl,
    }
  }); else return [{ titel: "-", datum: "-", anmelder: "-", teilnehmerzahl: "-", ort: "-" }]
})

const collapseData = computed(() => {
  const remoteRegistrations = store.getters.getRegistrations
  return remoteRegistrations.map((r: { registration: Registration, publicUrl: string }) => {
    const asm = r.registration.assembly
    const app = r.registration.applicant
    return {
      titel: asm.topic,
      datum: asm.date,
      teilnehmerzahl: asm.participantCount,
      anmelder: app.firstName + " " + app.lastName,
      ort: capitalize(r.registration.location),
      publicUrl: r.publicUrl
    }
  }).filter((a) => a);
})

const thead = ['Titel der Versammlung', 'Datum', 'Anz. Teilnehmer', 'Anmelder', 'Ort', "Aktionen"]
const tbody = ['titel', 'datum', 'teilnehmerzahl', 'anmelder', 'ort', {
  slot: 'actions'
}]
const thead2 = ['Titel der Versammlung', 'Datum', 'Anz. Teilnehmer', 'Anmelder', 'Ort', 'Formular']
const tbody2 = ['titel', 'datum', 'teilnehmerzahl', 'anmelder', 'ort', { slot: 'form' }]
</script>

<template>
  <card-wrapper v-if="draftedData" card-title="In Bearbeitung 🚧" class="draftCardWrapper">
    <template #content>
      <ui-collapse with-icon ripple class="dashboardCollapse">
        <template #toggle>
          <div
            class="tet"
            style="font-size: larger; font-weight: 500; padding-bottom: 1em; padding-top: 1em;"
          >
            {{
              '🚧 ' + draftedData[0].titel
            }}
          </div>
        </template>
        <div class="dashboardCollapseContent">
          <p style="margin-top: 0em; font-weight: 400;font-size: medium">
            🚩
            <span style="padding-left:0.5em; font-size: small;">{{ draftedData[0].anmelder }}</span>
          </p>
          <p style="font-weight: 400; font-size: medium;">
            📅
            <span style="padding-left:0.5em">{{ draftedData[0].datum }}</span>
          </p>
          <p style="font-weight: 400;font-size: medium;">
            🏠
            <span style="padding-left:0.5em">{{ draftedData[0].ort }}</span>
          </p>
          <ui-button
            style="background-color: white;  color: green; width: 100%; height: 3em;"
            raised
            icon="description"
            @click="$router.push({ name: 'CheckForm' })"
          >Zur Übersicht</ui-button>
        </div>
      </ui-collapse>

      <p v-if="!draftedData">Derzeit ist keine Veranstaltung in Bearbeitung.</p>
      <ui-table
        v-else
        class="dashboardTable"
        fullwidth
        :data="draftedData"
        :thead="thead"
        :tbody="tbody"
      >
        <template #actions="{ data }">
          <ui-icon outlined @click="router.push({ name: 'CheckForm' })">edit</ui-icon>
        </template>
      </ui-table>
    </template>
  </card-wrapper>
  <card-wrapper
    card-title="Deine Protestveranstaltungen ✅"
    action-bar-top="true"
    action-bar-top-icon="add"
    action-bar-button-tooltip="Neue Anmeldung nach VersammlG erstellen"
    action-bar-button-link-name="EventPeopleSelection"
    action-bar-button-c-s-s-id="dashboardFab"
    style="width: 95%; margin-top: 2em;"
  >
    <template #content>
      <template v-if="collapseData.length > 0" v-for="(reg, i) in collapseData">
        <ui-collapse v-if="reg" :key="i + reg.titel" with-icon ripple class="dashboardCollapse">
          <template #toggle>
            <div
              class="tet"
              style="font-size: larger; font-weight: 500; padding-bottom: 1em; padding-top: 1em;"
            >
              {{
                reg.entwurf ? '🚧 ' + reg.titel : reg.titel
              }}
            </div>
          </template>
          <div class="dashboardCollapseContent">
            <p style="margin-top: 0em; font-weight: 400;font-size: medium">
              🚩
              <span style="padding-left:0.5em; font-size: small;">{{ reg.anmelder }}</span>
            </p>
            <p style="font-weight: 400; font-size: medium;">
              📅
              <span style="padding-left:0.5em">{{ reg.datum }}</span>
            </p>
            <p style="font-weight: 400;font-size: medium;">
              🏠
              <span style="padding-left:0.5em">{{ reg.ort }}</span>
            </p>
            <a v-if="reg.publicUrl" :href="reg.publicUrl" target="_noreferrer">
              <ui-button
                style="background-color: white;  color: green; width: 100%; height: 3em;"
                raised
                icon="open_in_new"
              >Zum Formular</ui-button>
            </a>
          </div>
        </ui-collapse>
      </template>

      <p v-if="collapseData.length == 0">Keine Veranstaltungen gefunden.</p>
      <ui-table class="dashboardTable" fullwidth :data="data" :thead="thead2" :tbody="tbody2">
        <template #form="{ data }">
          <a
            style="color: black;"
            v-if="data.publicUrl"
            :href="data.publicUrl"
            target="_noreferrer"
          >
            <ui-icon outlined>open_in_new</ui-icon>
          </a>
        </template>
      </ui-table>
    </template>
  </card-wrapper>
</template>

<style>
@media (min-width: 820px) {
  .draftCardWrapper {
    width: 95%;
    margin-top: 2em;
  }
  .dashboardCollapse {
    display: none;
  }
  .dashboardTable {
    margin-top: 2em;
  }
}
@media (max-width: 820px) {
  .draftCardWrapper {
    margin-bottom: -4em;
    width: 95%;
    margin-top: 0;
  }
  .dashboardTable {
    display: none;
  }
  .dashboardCollapse {
    font-size: large;
    margin-bottom: 1em;
  }
  #dashboardFab {
    position: fixed;
    height: 5em;
    width: 5em;
    right: 2em;
    bottom: 2em;
    z-index: 4;
  }
  .mdc-collapse__header {
    background-color: rgba(53, 199, 143, 0.3);
    border-radius: 0.5em;
    font-size: medium;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .dashboardCollapseContent {
    background-color: rgba(53, 199, 143, 0.1);
    border-radius: 0.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-top: 2em;
    padding-bottom: 1em;
  }
}
</style>
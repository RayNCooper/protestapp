<script setup lang="ts">
import { Registration } from "../../../types/Registration";
import { useStore } from "vuex";
import CardWrapper from "../util/CardWrapper.vue";
import { computed, onBeforeMount } from "vue";
import { capitalize } from "lodash";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

onBeforeMount(async () => {
  await store.dispatch("setRegistrationsState")
})

const data = computed(() => {
  const draft = store.getters.getDraftedRegistration as Registration
  const remoteRegistrations = store.getters.getRegistrations as Registration[]
  const registrations = draft.organizer?.id ? [draft, remoteRegistrations].flat() : remoteRegistrations

  if (registrations.length > 0) return registrations.map((r: Registration) => {
    return { titel: r.assembly.topic ? r.assembly.topic : "-", datum: r.assembly.date ? r.assembly.date : "-", teilnehmerzahl: r.assembly.participantCount ? r.assembly.participantCount : "-", anmelder: r.applicant.firstName + " " + r.applicant.lastName, ort: r.assembly.topic ? capitalize(r.location) : "-", entwurf: draft.id === r.id ? "✅" : "" }
  }); else return [{ titel: "-", datum: "-", anmelder: "-", teilnehmerzahl: "-", ort: "-", entwurf: "-" }]
})

const collapseData = computed(() => {
  const draft = store.getters.getDraftedRegistration as Registration
  const remoteRegistrations = store.getters.getRegistrations as Registration[]
  const registrations = draft.organizer?.id ? [draft, remoteRegistrations].flat() : remoteRegistrations

  return registrations.map((r: Registration) => {
    return r.assembly.topic ? { titel: r.assembly.topic ? r.assembly.topic : "-", datum: r.assembly.date ? r.assembly.date : "-", teilnehmerzahl: r.assembly.participantCount ? r.assembly.participantCount : "-", anmelder: r.applicant.firstName + " " + r.applicant.lastName, ort: r.assembly.topic ? capitalize(r.location) : "-", entwurf: draft.id === r.id ? "✅" : "" } : null
  }).filter((a) => a);
})

const thead = ['Titel der Versammlung', 'Datum', 'Anzahl der Teilnehmer', 'Anmelder', 'Ort', "Entwurf", "Aktionen"]
const tbody = ['titel', 'datum', 'teilnehmerzahl', 'anmelder', 'ort', 'entwurf', {
  slot: 'actions'
}]
</script>

<template>
  <card-wrapper
    card-title="Deine Protestveranstaltungen"
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
            <ui-button
              v-if="reg.entwurf"
              style="background-color: white;  color: green; width: 100%; height: 3em;"
              raised
              icon="attach_file"
              @click="$router.push({ name: 'CheckForm' })"
            >Zur Übersicht</ui-button>
          </div>
        </ui-collapse>
      </template>

      <p v-if="collapseData.length == 0">Keine Veranstaltungen gefunden.</p>
      <ui-table class="dashboardTable" fullwidth :data="data" :thead="thead" :tbody="tbody">
        <template #actions="{ data }">
          <ui-icon
            v-if="data.entwurf && data.entwurf !== '-'"
            outlined
            @click="router.push({ name: 'CheckForm' })"
          >edit</ui-icon>
        </template>
      </ui-table>
    </template>
  </card-wrapper>
</template>

<style>
@media (min-width: 820px) {
  .dashboardCollapse {
    display: none;
  }
  .dashboardTable {
    margin-top: 2em;
  }
}
@media (max-width: 820px) {
  .dashboardTable {
    display: none;
  }
  .dashboardCollapse {
    font-size: large;
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
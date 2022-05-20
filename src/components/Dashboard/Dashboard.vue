<script setup lang="ts">
import { Registration } from "../../../types/Registration";
import { useStore } from "vuex";
import CardWrapper from "../util/CardWrapper.vue";
import { computed } from "vue";
import { capitalize } from "lodash";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const data = computed(() => {
  const draft = store.getters.getDraftedRegistration as Registration
  const remoteRegistrations = store.getters.getRegistrations as Registration[]
  const registrations = draft.organizer?.id ? [draft, remoteRegistrations].flat() : remoteRegistrations
  console.log(registrations)
  if (registrations.length > 0) return registrations.map((r: Registration) => {
    return { titel: r.assembly.topic ? r.assembly.topic : "-", datum: r.assembly.date ? r.assembly.date : "-", teilnehmerzahl: r.assembly.participantCount ? r.assembly.participantCount : "-", anmelder: r.applicant.firstName + " " + r.applicant.lastName, ort: r.assembly.topic ? capitalize(r.location) : "-", entwurf: draft.id === r.id ? "✅" : "" }
  }); else return [{ titel: "-", datum: "-", anmelder: "-", teilnehmerzahl: "-", ort: "-", entwurf: "-" }]
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
    style="width: 95%"
  >
    <template #content>
      <ui-table style="margin-top: 2em;" fullwidth :data="data" :thead="thead" :tbody="tbody">
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
</style>
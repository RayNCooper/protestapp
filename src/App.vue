<script setup lang="ts">
import { ref } from 'vue';
import CitySelection from './components/CitySelection.vue';
import EventGeneralForm from './components/EventGeneralForm.vue';
import LegalEntityForm from './components/LegalEntityForm.vue';
const showDrawer = ref(false)
</script>

<template>
  <ui-drawer v-model="showDrawer" type="modal" viewport-height nav-id="menu">
    <ui-drawer-header>
      <img src="./assets/logo.jpg" style="width: 80%; margin: -1em; margin-left: -2em;" />
      <ui-drawer-title style="margin-top: -1em;">Organizer</ui-drawer-title>
      <ui-drawer-subtitle>deinprotest.net</ui-drawer-subtitle>
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <ui-nav-item href="#">Item</ui-nav-item>
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <!-- Content -->
  <ui-drawer-app-content>
    <!-- App bar -->
    <ui-top-app-bar :type="1" content-selector=".app-content" nav-id="menu">
      <img src="./assets/logo.jpg" style="height: 3em; margin-left: -1em; margin-top: 0.3em;" />

      <!-- <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button :class="toolbarItemClass" icon="file_download"></ui-icon-button>
        <ui-icon-button :class="toolbarItemClass" icon="print"></ui-icon-button>
        <ui-icon-button :class="toolbarItemClass" icon="bookmark"></ui-icon-button>
      </template>-->
    </ui-top-app-bar>
    <!-- App content -->
    <div class="content">
      <LegalEntityForm></LegalEntityForm>
      <!-- <EventGeneralForm></EventGeneralForm> -->
    </div>
  </ui-drawer-app-content>
</template>

<style>
@import "vue-flow-form-css";
@import "vue-flow-form-theme-css";
body {
  margin: 0;
}

.content {
  width: 100vw;
  margin-top: 8em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
}

.berlin_card_media {
  background-image: url(./assets/berlin.jpg);
}
</style>

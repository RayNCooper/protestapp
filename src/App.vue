<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import logoLarge from "./assets/logo_large.png"
import logoWide from "./assets/logo_wide.png"

const showDrawer = ref(false)
const router = useRouter()
const store = useStore()

onBeforeMount(() => {
  const jsonStorage = localStorage.getItem('draftedRegistration')
  jsonStorage ? store.commit("setDraftedRegistration", JSON.parse(jsonStorage)) : null
})
</script>

<template>
  <ui-drawer v-model="showDrawer" type="modal" viewport-height nav-id="menu">
    <ui-drawer-header>
      <img :src="logoLarge" style="width: 100%;  margin-left: -2em; margin-bottom: -1em;" />
      <!-- <ui-drawer-title style="margin-top: -1em;">Organizer</ui-drawer-title>
      <ui-drawer-subtitle>deinprotest.net</ui-drawer-subtitle>-->
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <ui-nav-item :href="router.resolve({ name: 'Dashboard' }).href">
          <ui-item-first-content>
            <ui-icon>space_dashboard</ui-icon>
          </ui-item-first-content>
          <ui-item-text-content>Dashboard</ui-item-text-content>
        </ui-nav-item>
        <!--  <ui-nav-item :href="router.resolve({ name: 'History' }).href">
          <ui-item-first-content>
            <ui-icon>history</ui-icon>
          </ui-item-first-content>
          <ui-item-text-content>Verlauf</ui-item-text-content>
        </ui-nav-item>-->
        <ui-nav-item :href="router.resolve({ name: 'Settings' }).href">
          <ui-item-first-content>
            <ui-icon>settings</ui-icon>
          </ui-item-first-content>
          <ui-item-text-content>Einstellungen</ui-item-text-content>
        </ui-nav-item>
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <!-- Content -->
  <ui-drawer-app-content>
    <!-- App bar -->
    <ui-top-app-bar
      :type="1"
      content-selector=".app-content"
      nav-id="menu"
      style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
    >
      <img :src="logoWide" style="height: 2.5em; margin-left: -1.2em; margin-top: 0.4em" />
      <!-- <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button :class="toolbarItemClass" icon="file_download"></ui-icon-button>
        <ui-icon-button :class="toolbarItemClass" icon="print"></ui-icon-button>
        <ui-icon-button :class="toolbarItemClass" icon="bookmark"></ui-icon-button>
      </template>-->
    </ui-top-app-bar>
    <div class="content">
      <router-view></router-view>
    </div>
  </ui-drawer-app-content>
</template>

<style>
@import "@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "./assets/vue-flow-form.theme-custom.css";

body {
  margin: 0;
}

.content {
  width: 100vw;
  margin-top: 6em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
}
</style>

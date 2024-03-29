<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import logoLarge from "./assets/logo_large.png"
import logoWide from "./assets/logo_wide.png"
import Footer from "./components/Footer.vue"

const showDrawer = ref(false)
const router = useRouter()
const store = useStore()

const contentClass = computed(() => {
  var cssClass = "content"
  if (router.currentRoute.value.name === "Landing") cssClass += " svgBackground landing center"
  if (router.currentRoute.value.name != "Landing") cssClass += " center"
  return cssClass
})

onBeforeMount(() => {
  const draftedRegJson = localStorage.getItem('draftedRegistration')
  const legalEntJson = localStorage.getItem('legalEntities')
  if (draftedRegJson) store.commit("setDraftedRegistration", JSON.parse(draftedRegJson))
  if (legalEntJson) store.commit("addLegalEntities", JSON.parse(legalEntJson))
})
</script>

<template>
  <ui-drawer v-model="showDrawer" type="modal" viewport-height nav-id="menu">
    <ui-drawer-header>
      <img :src="logoLarge" style="width: 100%;  margin-left: -2em; margin-bottom: -1em;" />
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <ui-nav-item :href="router.resolve({ name: 'Dashboard' }).path">
          <ui-item-first-content>
            <ui-icon>space_dashboard</ui-icon>
          </ui-item-first-content>
          <ui-item-text-content>Dashboard</ui-item-text-content>
        </ui-nav-item>

        <div style="position: absolute; bottom: 0.5em; width: 100%;">
          <ui-nav-item :href="router.resolve({ name: 'Kontakt' }).path">
            <ui-item-first-content>
              <ui-icon>call</ui-icon>
            </ui-item-first-content>
            <ui-item-text-content>Kontakt</ui-item-text-content>
          </ui-nav-item>

          <ui-nav-item :href="router.resolve({ name: 'FAQ' }).path">
            <ui-item-first-content>
              <ui-icon>help</ui-icon>
            </ui-item-first-content>
            <ui-item-text-content>FAQ</ui-item-text-content>
          </ui-nav-item>
        </div>

        <!-- <ui-nav-item :href="router.resolve({ name: 'Settings' }).href">
          <ui-item-first-content>
            <ui-icon>settings</ui-icon>
          </ui-item-first-content>
          <ui-item-text-content>Einstellungen</ui-item-text-content>
        </ui-nav-item>-->
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <!-- Content -->
  <ui-drawer-app-content
    :style="router.currentRoute.value.name === 'Landing' ? 'overflow:hidden' : ''"
  >
    <!-- App bar -->
    <ui-top-app-bar
      :type="1"
      content-selector=".app-content"
      nav-id="menu"
      style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
    >
      <img :src="logoWide" style="height: 2.5em; margin-left: -1.2em; margin-top: 0.4em" />
      <template #toolbar="{ toolbarItemClass }">
        <ui-tooltip
          id="authStateTooltip"
          style="width: 12em"
        >{{ store.getters.getUser ? `Eingeloggt als ${store.getters.getUser.email}` : "Nicht eingeloggt" }}</ui-tooltip>
        <ui-icon-button
          v-if="store.getters.getUser"
          aria-describedby="authStateTooltip"
          :class="toolbarItemClass"
          style="color: green"
          icon="person_outline"
          @click="router.push({ name: 'Login' })"
        ></ui-icon-button>
        <ui-icon-button
          v-else-if="!store.getters.getUser"
          aria-describedby="authStateTooltip"
          :class="toolbarItemClass"
          style="color: red"
          icon="lock_outline"
          @click="router.push({ name: 'Login' })"
        ></ui-icon-button>
      </template>
    </ui-top-app-bar>
    <div :class="contentClass">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </ui-drawer-app-content>
</template>

<style>
@import "@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "./assets/vue-flow-form.theme-custom.css";

html {
  height: 100%;
}

body {
  min-height: 100%;
  position: relative;
  margin: 0;
}

.content {
  width: 100vw;
  min-height: 100%;
  margin-top: 3.5em;
  margin-bottom: 1em;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
}
.svgBackground {
  height: 100%;
  background-image: url(./assets/protest1.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
}
.landing {
  padding-top: 2em;
}
.drawerDivider {
  width: 90% !important;
  margin: 0em auto 0em auto;
}
</style>

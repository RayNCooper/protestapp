<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import CardWrapper from "../util/CardWrapper.vue";
import { useStore } from "vuex";
import * as firebaseui from "firebaseui"
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
import logoLarge from "../../assets/logo_large.png"

const router = useRouter()
const store = useStore()
onMounted(() => {
    var ui = new firebaseui.auth.AuthUI(store.state.firebaseAuth);

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup',
        signInSuccessUrl: router.resolve({ name: "Dashboard" }).fullPath,
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                store.commit("setUser", authResult.user)
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                router.push({ name: "Dashboard" })
                return true;
            },
            signInFailure: function (error) {
                console.log(error)
            }
        }
        // Other config options...
    });


})
</script>

<template>
    <card-wrapper style="width: 20em">
        <template #content>
            <img
                :src="logoLarge"
                style="height: 10em; display: block; margin-left: auto; margin-right: auto;"
                alt="Logo"
            />
            <div id="firebaseui-auth-container"></div>
        </template>
    </card-wrapper>
</template>
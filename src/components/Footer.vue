<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="footer">
        <div class="footerItem copyrightItem">
            <h4 class="footerItemHead copyrightItemHead">deinprotest.com</h4>
            <div :class="$tt('caption')">
                <a class="footerItemLink">
                    Made with ❤️ in Berlin, Europe
                    <br />©0C9C Hex UG (haftungsbeschränkt)
                </a>
            </div>
        </div>

        <div class="footerItem">
            <h4 class="footerItemHead">Recht</h4>
            <div :class="$tt('caption')">
                <a :href="router.resolve({ name: 'TOS' }).path" class="footerItemLink">AGB</a>
            </div>
            <div :class="$tt('caption')">
                <a
                    :href="router.resolve({ name: 'Impressum' }).path"
                    class="footerItemLink"
                >Impressum</a>
            </div>
        </div>

        <div class="footerItem">
            <h4 class="footerItemHead">Team</h4>
            <div :class="$tt('caption')">
                <a :href="router.resolve({ name: 'About' }).path" class="footerItemLink">Über Uns</a>
            </div>
            <!-- <div :class="$tt('caption')">
                <a
                    :href="router.resolve({ name: 'Join' }).path"
                    class="footerItemLink"
                >Mitglied werden</a>
            </div> -->
        </div>

        <div class="footerItem">
            <h4 class="footerItemHead">Hilfe</h4>
            <div :class="$tt('caption')">
                <a :href="router.resolve({ name: 'FAQ' }).path" class="footerItemLink">FAQ</a>
            </div>
            <div :class="$tt('caption')">
                <a :href="router.resolve({ name: 'Kontakt' }).path" class="footerItemLink">Kontakt</a>
            </div>
        </div>
    </div>
</template>

<style>
.footer {
    position: relative;
    width: 100%;

    background-image: url(../assets/wave.svg);
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    gap: 0em 2em;

    border-top: 1px solid #eaeaea;

    margin: 1em auto 0em auto;
    padding-top: 0.5em;
    padding-bottom: 1em;
}
.footerItem {
    margin-top: 1em;
}
.footerItemHead {
    margin-top: 0;
    margin-bottom: 0.5em;
}
.footerItemLink {
    text-decoration: initial;
    color: gray;
    font-weight: bold;
}
.copyrightItemHead {
    color: #36c78f;
    font-weight: bolder;
}
@media (min-width: 600px) {
    .copyrightItem {
        border-right: 1px dotted #36c78f;
        padding-right: 2em;
    }
}
@media (max-width: 600px) {
    .footer {
        flex-direction: column;

        background-color: white;
        z-index: 5;
    }
    .footerItem {
        padding-left: 1em;
    }
}
@media (max-width: 820px) {
    .footer {
        background-color: white;
        z-index: 5;
    }
}
</style>
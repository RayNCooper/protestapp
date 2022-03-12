<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['imageSrc', 'cardTitle', 'actionBarTop', 'actionBarButtonTooltip', 'actionBarButtonLinkName'])
/* const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
}) */
const router = useRouter()

</script>

<template>
    <div class="card_container">
        <img v-if="props.imageSrc" :src="props.imageSrc" class="card_media" />

        <div class="card_content">
            <div class="card_flex">
                <h3 v-if="props.cardTitle" class="$tt('headline3')">{{ props.cardTitle }}</h3>
                <ui-fab
                    v-if="props.actionBarTop"
                    :aria-describedby="props.actionBarButtonTooltip + '-id'"
                    icon="add"
                    @click="router.push({ name: props.actionBarButtonLinkName })"
                ></ui-fab>
                <ui-tooltip
                    v-if="props.actionBarButtonTooltip"
                    :id="props.actionBarButtonTooltip + '-id'"
                >{{ props.actionBarButtonTooltip }}</ui-tooltip>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style>
.card_container {
    border: 1px solid #eaeaea;
    border-radius: 0.5em;
    margin-bottom: 1em;
    margin-top: 1em;
}
.card_media {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    max-height: 20em;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
}
.card_content {
    margin: 2em;
}
.card_textfield {
    width: 100%;
}
.card_flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
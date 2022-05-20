<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['imageSrc', 'cardTitle',
    'actionBarTop', 'actionBarTopIcon',
    'actionBarButtonTooltip', 'actionBarButtonLinkName',
    'actionBarButtonMini', 'actionBarHeadlineSize', 'actionBarButtonCSSId'])
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
                <h1 v-if="props.cardTitle && props.actionBarHeadlineSize == 1">{{ props.cardTitle }}</h1>
                <h2 v-if="props.cardTitle && props.actionBarHeadlineSize == 2">{{ props.cardTitle }}</h2>
                <h3
                    v-if="props.cardTitle && !props.actionBarHeadlineSize || props.actionBarHeadlineSize == 3"
                >{{ props.cardTitle }}</h3>
                <h4 v-if="props.cardTitle && props.actionBarHeadlineSize == 4">{{ props.cardTitle }}</h4>

                <ui-fab
                    v-if="props.actionBarTop"
                    :mini="props.actionBarButtonMini"
                    :aria-describedby="props.actionBarButtonTooltip + '-id'"
                    :id="props.actionBarButtonCSSId"
                    :icon="props.actionBarTopIcon"
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
    margin-bottom: 1em;
    margin-top: 1em;
    border-radius: 0.5em;
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

@media (min-width: 820px) {
    .card_container {
        border: 1px solid #eaeaea;
    }
}
</style>
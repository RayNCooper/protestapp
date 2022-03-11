<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['imageSrc', 'formTitle'])
/* const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
}) */
</script>

<template>
    <div class="form_container">
        <img v-if="props.imageSrc" :src="props.imageSrc" class="form_media" />

        <div class="form_content">
            <h3 class="$tt('headline3')">{{ props.formTitle }}</h3>
            <slot name="form"></slot>
        </div>
    </div>
    <slot></slot>
</template>

<style>
.form_container {
    border: 1px solid #eaeaea;
    border-radius: 0.5em;
    margin-bottom: 1em;
    margin-top: 1em;
}
.form_media {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    max-height: 20em;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
}
.form_content {
    margin-top: 2em;
    margin-left: 2em;
    margin-bottom: 2em;
}
.form_textfield {
    width: 100%;
}
</style>
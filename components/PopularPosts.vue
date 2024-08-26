<template>
    <div>
        {{ popularPosts }}
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from "../stores/posts";

const postsStore = usePostsStore();

const { getPopularPosts } = postsStore;
const { popularPosts } = storeToRefs(postsStore);

onBeforeMount(() => {
    getPopularPosts();
});
</script>

<style scoped>

</style>
<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();

const { getAllPosts } = postsStore;

try {
    await getAllPosts();
} catch (err: any) {
    console.log(err?.message);
}
</script>

<style scoped>

</style>
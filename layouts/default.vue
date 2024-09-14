<template>
    <!--eslint-disable-->
    <header>
        <Navbar />
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <Footer />
    </footer>
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
<template>
    <div>
        <Jumbotron />
        
        <div id="LatestPosts" class="w-full py-20 min-h-screen flex flex-col justify-center items-center">
            <Spinner v-if="posts.length === 0" />
            <div v-else class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
                <h3 class="mb-5 font-bold text-lg tracking-wider">Latest Posts</h3>
            </div>
            <Posts />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();

const { posts } = storeToRefs(postsStore);

definePageMeta({
    name: "Index Page",
})

</script>

<style scoped></style>
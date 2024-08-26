<template>
    <div>
        {{ selectedPost?.title }}
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const route = useRoute();

const { selectedPost } = storeToRefs(postsStore);
const { getPost } = postsStore;

const id = route.params?.id as string;

console.log(id)

try {
    await getPost(id);

} catch (err: any) {
    console.log(err?.message);
}
</script>

<style scoped>

</style>
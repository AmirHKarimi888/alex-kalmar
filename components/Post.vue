<template>
    <div class="w-full">
        <div class="lg:w-[70%] md:w-[80%] sm:w-[90%] max-sm:w-[95%] mx-auto mt-32 p-5 bg-zinc-50 shadow-md shadow-zinc-300 box-border">
            <div id="PostContent">
            
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const route = useRoute();

const { selectedPost } = storeToRefs(postsStore);
const { getPost } = postsStore;

const id = route.params?.id as string;

try {
    await getPost(id);

} catch (err: any) {
    console.log(err?.message);
}

onMounted(() => {
    const postContentEl = document.querySelector("#PostContent") as HTMLElement;
    postContentEl.insertAdjacentHTML("afterbegin", selectedPost.value?.content)
})
</script>

<style scoped>

</style>
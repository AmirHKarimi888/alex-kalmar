<template>
    <div class="py-3">
        <div>
            <h2 class="mb-5 font-bold text-lg tracking-wider">Comments ({{comments.length}})</h2>
        </div>
        
        <ul>
            <li v-for="comment in comments" :key="comment?.id" class="border-b py-5 box-border w-full text-wrap">
                <div>
                    <span class="text-sm">At {{ created(comment) }} by <span class="font-bold">{{ comment?.name }}</span></span>
                    <span class="text-xs text-zinc-500 inline-block">{{comment?.email}}</span>
                </div>

                <div class="w-full overflow-hidden text-zinc-700 pt-3">
                    <p class="box-border text-wrap">{{comment?.message}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const { comments } = storeToRefs(postsStore);
const { getComment } = postsStore;

const props = defineProps<{
    post: any
}>()

const getFormattedDate = useDateFormatter();

const created = (comment: any) => getFormattedDate(comment?.created);

props.post?.comments.forEach(async (comment: any) => {
    comments.value.push(await getComment(comment))
})

</script>

<style scoped>

</style>
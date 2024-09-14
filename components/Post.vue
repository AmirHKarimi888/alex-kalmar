<template>
    <div class="w-full mt-32 mb-24">
        <div
            class="lg:w-[60%] md:w-[75%] sm:w-[85%] max-sm:w-[90%] mx-auto p-5 bg-zinc-50 shadow-md shadow-zinc-400 box-border">
            <div class="w-full p-2 border-b text-zinc-700">
                <div class="flex text-xs gap-3 mt-1">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17" />
                        </svg>
                        {{ selectedPost?.views }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
                        </svg>
                        {{ selectedPost?.likes?.length }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z" />
                        </svg>
                        {{ selectedPost?.comments?.length }}
                    </span>
                </div>

                <div class="flex flex-col text-xs gap-1 my-2 font-bold tracking-wider">
                    <span class="flex items-center gap-1">
                        Created at {{ created }}
                    </span>
                    <span class="flex items-center gap-1">
                        Updated at {{ updated }}
                    </span>
                </div>
            </div>

            <div id="PostContent" class="box-border overflow-x-auto mt-5">

            </div>

            <div class="w-full p-2 text-zinc-700 mt-5">
                <div class="flex text-xs gap-3 mt-1">
                    <span class="flex items-center gap-1 cursor-pointer" @click="like">
                        <svg v-if="isLiked" class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="32"
                            height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
                        </svg>
                    </span>

                    <span class="flex items-center gap-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92" />
                        </svg>
                    </span>
                </div>
            </div>

            <div class="w-full p-2 text-zinc-700 mt-5 border-t">
                <LeaveComment />
                <Comments :post="selectedPost" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const route = useRoute();

const { selectedPost } = storeToRefs(postsStore);
const { getPost, addViews, likePost } = postsStore;

const getFormattedDate = useDateFormatter();

const created = computed(() => getFormattedDate(selectedPost.value?.created));
const updated = computed(() => getFormattedDate(selectedPost.value?.updated));

const id = route.params?.id as string;

const isLiked = computed(() => JSON.parse(localStorage.getItem("likedPosts") as any).includes(selectedPost.value?.id))

try {
    await getPost(id)
        .then(async () => await addViews(selectedPost.value))
        .then(() => selectedPost.value = { ...selectedPost.value, views: +selectedPost.value?.views + 1 })

} catch (err: any) {
    console.log(err?.message);
}

onMounted(() => {
    const postContentEl = document.querySelector("#PostContent") as HTMLElement;
    postContentEl.insertAdjacentHTML("afterbegin", selectedPost.value?.content);
})

useHead({
    title: `${selectedPost.value?.title} - KALMAR`
})

const like = async () => {
    let likes: any = [];

    if (JSON.parse(localStorage.getItem("likedPosts") as any).includes(selectedPost.value?.id)) {
        likes = selectedPost.value?.likes.filter((like: any) => like !== selectedPost.value?.id);
    } else {
        likes = [...selectedPost.value?.likes, selectedPost.value?.id]
    }

    try {
        await likePost(selectedPost.value, likes)
            .then(() => {
                localStorage.setItem("likedPosts", JSON.stringify(likes));
                selectedPost.value = { ...selectedPost.value, likes: likes }
            })
    } catch (err: any) {
        null;
    }
}
</script>

<style scoped>
#PostContent iframe {
    display: table;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    aspect-ratio: 16/9;
}
</style>
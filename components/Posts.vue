<template>
    <ul class="mx-auto md:w-[80%] sm:w-[85%] max-sm:w-[90%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <li v-for="post in posts" :key="post"
            class="border border-zinc-300 shadow-xl shadow-zinc-300 p-5 bg-zinc-100 flex flex-col justify-between">
            <div>
                <div class="pb-3 border-b text-zinc-500 text-sm tracking-wider">
                    <div>
                        {{ created(post) }} by <span class="text-zinc-800">{{ post?.author }}</span>
                    </div>

                    <div class="flex text-xs gap-3 mt-1">
                        <span class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17" />
                            </svg>
                            {{ post?.views }}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
                            </svg>
                            {{ post?.likes.length }}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z" />
                            </svg>
                            {{ post?.comments.length }}
                        </span>
                    </div>
                </div>

                <div class="py-3 text-zinc-800 font-bold">
                    {{ post?.title }}
                </div>

                <div>
                    <img class="w-full aspect-square" :src="post?.poster" :alt="post?.title">
                </div>
            </div>

            <div>
                <div class="pt-3">
                    {{ post?.description.split(" ").length > 10 ? post?.description.split(" ").slice(0, 10).join(" ") +
                        "..." : post?.description }}
                </div>
                <div>
                    <NuxtLink :to="`/posts/${post?.id}`">
                        <button
                        class="p-2 bg-black text-white border hover:border-black hover:bg-white hover:text-black duration-200 mt-3 tracking-wider">Read
                        Full</button>
                    </NuxtLink>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { dbUrl } from "~/pocketbase";
import { usePostsStore } from "../stores/posts";

const postsStore = usePostsStore();

const { getPosts } = postsStore;
const { posts } = storeToRefs(postsStore);

try {
    await getPosts(1, 6)
        .then(() => {
            posts.value.filter(async (post: any) => {
                await fetch(`${dbUrl}api/files/posts/${post?.id}/${post?.poster}`)
                    .then(response => response.blob())
                    .then(blob => {
                        post.poster = URL.createObjectURL(blob)
                    })
            })
        })

} catch (err: any) {
    console.log(err?.message);
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

const created = (post: any) => {
    let dateList = post?.created.split("-");
    let year = dateList[0];
    let month = months[+dateList[1] - 1];
    let day = dateList[2].split(" ")[0]
    return `${day}${+day === 1 ? 'st' : +day === 2 ? 'nd' : +day === 3 ? 'rd' : 'th'} ${month} ${year}`;
}

</script>

<style scoped></style>
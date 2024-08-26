import { pb } from "~/pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const posts = ref<any[]>([]);
    const popularPosts = ref<any[]>([]);

    const getPosts = async (page: number, perPage: number) => {
        await pb.collection('posts').getList(page, perPage, {
            sort: '-created',
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => posts.value = data?.items)
    }

    const getPopularPosts = async () => {
        await pb.collection('posts').getList(1, 3, {
            sort: "-created " + "&&" + " -likes",
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => popularPosts.value = data)
    }

    return { posts, popularPosts, getPosts, getPopularPosts }
})
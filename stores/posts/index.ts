import { pb } from "~/pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const posts = ref<any[]>([]);
    const allPosts = ref<any[]>([]);
    const popularPosts = ref<any[]>([]);
    const selectedPost = ref<any>({});

    const getAllPosts = async () => {
        await pb.collection('posts').getFullList({
            sort: '-created',
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => allPosts.value = data)
    }

    const getPosts = async (page = 1, perPage = 6) => {
        await pb.collection('posts').getList(page, perPage, {
            sort: '-created',
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => posts.value = data?.items)
    }

    const getPost = async (id: string) => {
        await pb.collection('posts').getOne(id)
        .then(data => selectedPost.value = data);
    }

    const getPopularPosts = async () => {
        await pb.collection('posts').getList(1, 3, {
            sort: "-created " + "&&" + " -likes",
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => popularPosts.value = data)
    }

    return { posts, popularPosts, selectedPost, allPosts, getPosts, getPopularPosts, getPost, getAllPosts }
})
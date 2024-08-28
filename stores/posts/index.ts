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

    const getPopularPosts = () => {
        popularPosts.value = 
        allPosts.value.sort((a: any, b: any) => a?.likes.length - b?.likes.length)
        .slice(0, 3)
    }

    return { posts, popularPosts, selectedPost, allPosts, getPosts, getPopularPosts, getPost, getAllPosts }
})
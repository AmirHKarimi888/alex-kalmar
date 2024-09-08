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

    const addViews = async (post: any) => {
        await pb.collection("posts")
        .update(post?.id, {
            views: +post?.views + 1
        })
    }


    "likedPosts" in localStorage ? null : localStorage.setItem("likedPosts", "[]");
    const likePost = async (post: any) => {
        let likesStore = JSON.parse(localStorage.getItem("likedPosts") as any);
        let likes = [];

        if (likesStore.includes(post?.id)) {
            likes = post?.likes.filter((like: any) => like !== post?.id);
        } else {
            likes = [ ...post?.likes, post?.id ]
        }

        await pb.collection("posts")
        .update(post?.id, {
            likes: likes
        })
        .then(() => {
            localStorage.setItem("likedPosts", JSON.stringify(likes));
            selectedPost.value = { ...selectedPost.value, likes: likes }    
        })
    }

    return { posts, popularPosts, selectedPost, allPosts, getPosts, getPopularPosts, getPost, getAllPosts, addViews, likePost }
})
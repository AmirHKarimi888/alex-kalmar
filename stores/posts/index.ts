import { pb } from "~/pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const posts = ref<any[]>([]);
    const allPosts = ref<any[]>([]);
    const popularPosts = ref<any[]>([]);
    const selectedPost = ref<any>({});

    const comments = ref<any[]>([]);

    const getAllPosts = async () => {
        await pb.collection('posts').getFullList({
            sort: '-created',
            filter: "show = " + "" + true + "" + ""
        })
        .then((data: any) => allPosts.value = data)
    }

    const getPosts = async (page = 1, perPage = 6, keyWord: string) => {
        await pb.collection('posts').getList(page, perPage, {
            sort: '-created',
            filter: "show = " + "" + true + "" + " && category ~ " + "" + '"' + keyWord + '"' + ""
        })
        .then((data: any) => posts.value = data?.items)
    }

    const getPost = async (id: string) => {
        await pb.collection('posts').getOne(id)
        .then(data => selectedPost.value = data);
    }

    const getPopularPosts = () => {
        popularPosts.value = 
        allPosts.value.sort((a: any, b: any) => b?.likes.length - a?.likes.length)
        .slice(0, 3)
    }

    const addViews = async (post: any) => {
        await pb.collection("posts")
        .update(post?.id, {
            views: +post?.views + 1
        })
    }


    "likedPosts" in localStorage ? null : localStorage.setItem("likedPosts", "[]");
    const likePost = async (post: any, likes: any) => {
        await pb.collection("posts")
        .update(post?.id, {
            likes: likes
        })
    }

    const leaveComment = async (comment: any, post: any) => {
        await pb.collection("comments")
        .create(comment)
        .then(async (data) => {
            await pb.collection("posts")
            .update(post?.id, {
                comments: [...post?.comments, data?.id]
            })
        })
    }

    const deleteComment = async (id: string) => {
        await pb.collection("comments")
        .delete(id)
    }

    const getComment = async (id: string) => {
        return await pb.collection("comments")
        .getOne(id)
    }

    return { posts, popularPosts, selectedPost, allPosts, comments, getPosts, getPopularPosts, getPost, getAllPosts, addViews, likePost, leaveComment, deleteComment, getComment }
})
<template>
    <div>
        {{ selectedPost?.title }}

        <div>
            {{ x }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { pb } from '~/pocketbase';
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

const x = ref();
await pb.collection('posts').getOne(id)
.then((data) => x.value = data)
.then(data => console.log(data))
</script>

<style scoped>

</style>
<template>
    <div>

        <NotFound v-if="!selectedPage" />

        <PagesJumbotron v-if="selectedPage?.hasBanner" :page="selectedPage" />
        <div v-if="selectedPage?.hasPosts" id="next" class="w-full pt-40 pb-12 min-h-screen flex flex-col justify-center items-center">
            <Suspense>
                <div class="flex flex-col justify-center items-center">
                    <Posts :page="pageNumber" :perPage="6" :keyWord="pageRoute" />

                    <Pagination v-if="posts.length !== 0" :currentPageNumber="pageNumber" :perPage="6" @changePage="changePage" class="mt-12" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>
        
        <div v-if="selectedPage?.hasCustomContent" id="CustomContent" class="">

        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { usePagesStore } from '~/stores/pages';

const route = useRoute();

const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

const pagesStore = usePagesStore();
const { selectedPage } = storeToRefs(pagesStore);
const { getAllPages, getPage } = pagesStore;

const pageRoute = `${route.params?.page}`;
const pageNumber = ref(1);

try {
  await getAllPages()
  .then(() => getPage(pageRoute));
} catch (err: any) {
  null;
}

const changePage = (newPage: number, updateThreeMults: Function) => {
    pageNumber.value = newPage;
    updateThreeMults(pageNumber.value);
}

onMounted(() => {
    document.querySelector("#CustomContent")?.insertAdjacentHTML("afterbegin", selectedPage.value?.customContent);
})

useHead({
    title: `${selectedPage.value ? selectedPage.value?.pageTitle : 'Not Found'} - KALMAR`
})
</script>

<style scoped>

</style>
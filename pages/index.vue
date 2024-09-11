<template>
    <div>
        <MainJumbotron />

        <div id="PopularPosts" class="w-full py-20 min-h-screen flex flex-col justify-center items-center">
            <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
                <h3 class="mb-5 font-bold text-lg tracking-wider">Popular Posts</h3>
            </div>
            <PopularPosts />
        </div>

        <div id="LatestPosts" class="w-full py-20 min-h-screen flex flex-col justify-center items-center">
            <Suspense>
                <div class="flex flex-col justify-center items-center">
                    <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
                        <h3 class="mb-5 font-bold text-lg tracking-wider">Latest Posts</h3>
                    </div>
                    <Posts :page="1" :perPage="6" :keyWord="''" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>

        <Contact />
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "KALMAR - Designer, Song Writer, Enterpreneur; a Polymath"
})
</script>

<style scoped></style>
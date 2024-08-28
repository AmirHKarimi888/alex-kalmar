<template>
    <div>
        <Jumbotron />

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
                    <Posts :page="1" :perPage="6" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
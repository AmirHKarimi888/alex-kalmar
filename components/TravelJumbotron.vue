<template>
    <section
        class="w-full h-screen bg-center bg-no-repeat bg-[url('../assets/travel.jpg')] bg-gray-700 bg-cover grid justify-center items-center">
        <div class="px-4 mx-auto max-w-screen-xl text-center" v-motion :initial="{ opacity: 0, x: 200 }"
            :visible-once="{ opacity: 1, x: 0 }" :delay="200" :duration="1200">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                Travel</h1>
            <p class="mb-8 text-lg font-normal text-gray-100 lg:text-xl sm:px-16 lg:px-48">Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Eveniet, rem!</p>
            <div class="flex flex-row justify-center space-y-0">
                <a href="#Travel"
                    class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                    Continue
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
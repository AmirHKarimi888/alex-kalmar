<template>
    <div>
        <nav class="fixed top-0 left-0 w-full border-gray-200 z-50" :class="navbarBg">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../assets/logo.png" class="h-8" alt="Flowbite Logo" />
                </a>
                <button @click="visibleRight = true" data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="flex gap-5 text-zinc-100 font-bold">
                        <li>
                            <NuxtLink to="/">Home</NuxtLink>
                        </li>
    
                        <li>
                            <NuxtLink to="/blog">Blog</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <Drawer v-model:visible="visibleRight" header="" position="right" class="w-[200px]">

                <ul class="flex flex-col text-zinc-600 dark:text-zinc-100 font-bold">
                    <li class="p-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md">
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>

                    <li class="p-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md">
                        <NuxtLink to="/blog">Blog</NuxtLink>
                    </li>
                </ul>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
const topOfPage = ref(true);
const visibleRight = ref(false);

const route = useRoute();

const handleScroll = () => {
    if (window.scrollY > 0) {
        if (topOfPage.value) topOfPage.value = false
    } else {
        if (!topOfPage.value) topOfPage.value = true
    }
}

onBeforeMount(() => {
    window.addEventListener('scroll', handleScroll);
})

onMounted(() => {
    window.scrollY > 0 ? topOfPage.value = false : topOfPage.value = true;
})

const navbarBg = computed(() => {
    if (route.path === "/") {
        if (!topOfPage.value) {
            return "bg-zinc-800/70";
        }
    } else {
        return "bg-zinc-800/70";
    }
})
</script>

<style scoped></style>
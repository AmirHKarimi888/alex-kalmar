<template>
    <div class="w-full h-screen grid justify-center items-center">
        <div class="mx-auto">
            <Suspense>
                <Post />
    
                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
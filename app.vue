<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePagesStore } from './stores/pages';


const pagesStore = usePagesStore();

const { getAllPages } = pagesStore;

useSeoMeta({
  description: 'KALMAR - Designer, Song Writer, Enterpreneur; a Polymath',
  ogDescription: 'KALMAR - Designer, Song Writer, Enterpreneur; a Polymath',
  ogImage: './logo.png',
})

try {
  await getAllPages("categoryPages");
} catch (err: any) {
  null;
}

try {
  await getAllPages("otherPages");
} catch (err: any) {
  null;
}
</script>

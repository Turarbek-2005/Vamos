<script setup lang="ts">
import { MENU_DATA } from "./menu.data";
</script>

<template>
  <div class="flex sm:flex-col">
    <NuxtLink
      class="flex items-center sm:py-3 px-1.5 sm:px-3 rounded-lg w-full dark:hover:bg-zinc-800 hover:bg-neutral-200 hover:shadow transition-all sm:mb-2.5 text-2xl"
      v-for="item in MENU_DATA"
      :key="item.name"
      :to="item.url"
    >
      <Icon :name="item.icon" class="lg:mr-5" size="24" />
      <span class="hidden lg:block">{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

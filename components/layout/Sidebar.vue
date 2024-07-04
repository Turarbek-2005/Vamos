<script setup lang="ts"></script>
<template>
    <div class="h-screen relative w-full">
        <aside
            class="fixed dark:bg-black border-r-zinc-800 border-r-2 h-full dark:text-white text-black px-5"
        >
            <NuxtLink to="/" class="pt-5 block h-1/5">
                <NuxtImg src="/logo.png" alt="" width="100px" class="mx-auto" />
            </NuxtLink>
            <NuxtLink
                class="absolute top-2 right-3 transition-colors hover:text-primary"
                to="/login"
            >
                <Icon name="line-md:logout" size="20" />
            </NuxtLink>
            <div class="flex flex-col justify-between h-4/5 pb-5">
                <LayoutMenu />
                <Button @click="darkMode" class="rounded-full flex w-14">
                    <Icon
                        v-if="mode == 'light'"
                        name="i-carbon-sun"
                        size="20"
                    />
                    <Icon v-else name="i-carbon-moon" size="20" />
                </Button>
            </div>
        </aside>
    </div>
</template>
<style scoped></style>

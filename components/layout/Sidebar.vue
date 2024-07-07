<script setup lang="ts"></script>
<template>
    <div class="h-screen relative border-r-zinc-800 border-r-2 w-24 lg:w-48">
        <aside
            class="fixed w-24 lg:w-48 dark:bg-black h-full border-r-zinc-800 border-r-2 dark:text-white text-black px-5"
        >
            <NuxtLink to="/" class="pt-5 block h-1/5">
                <NuxtImg src="/logo.png" alt="" width="100px" class="mx-auto" />
            </NuxtLink>
            <NuxtLink
                class="absolute right-1/2 leave top-24 lg:top-2 lg:right-3 transition-colors hover:text-primary"
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
<style scoped>
.leave {
    transform: translateX(50%);
}
@media (min-width: 1024px) {
    .leave {
        transform: none;
    }
}
</style>

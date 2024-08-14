<script setup lang="ts"></script>
<template>
  <div
    class="sm:h-screen bottom-0 sm:top-0 relative border-r-zinc-800 sm:border-r-2 w-full sm:w-24 lg:w-48"
  >
    <aside
      class="fixed bottom-0 sm:top-0 w-full sm:w-24 lg:w-48 bg-white dark:bg-black h-16 sm:h-full border-r-zinc-800 border-t-2 sm:border-t-0 sm:border-r-2 dark:text-white text-black px-2 sm:px-5 z-10"
    >
      <div
        class="flex items-center sm:items-start sm:flex-col h-full w-full justify-between sm:justify-start"
      >
        <div class="flex sm:flex-col items-center sm:items-start sm:h-1/5">
          <NuxtLink to="/" class="sm:pt-5 block h-12 w-12 sm:w-full mr-0">
            <NuxtImg src="/logo.png" alt="" class="mx-auto" />
          </NuxtLink>
          <NuxtLink
            class="sm:absolute sm:right-1/2 leave top-24 lg:top-2 lg:right-3 transition-colors hover:text-primary"
            to="/login"
          >
            <Icon name="line-md:logout" size="20" />
          </NuxtLink>
        </div>
        <LayoutMenu class="block sm:hidden" />
        <div class="flex sm:flex-col justify-between sm:h-4/5 sm:pb-5">
          <LayoutMenu class="hidden sm:block" />
          <Button @click="darkMode" class="rounded-full flex w-12 sm:w-14">
            <Icon v-if="mode == 'light'" name="i-carbon-sun" size="20" />
            <Icon v-else name="i-carbon-moon" size="20" />
          </Button>
        </div>
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

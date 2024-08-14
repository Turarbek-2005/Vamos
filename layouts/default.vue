<script setup lang="ts">
useSeoMeta({
  title: "Vamos",
});

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) store.set(user);
  } catch (error) {
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && from.path !== "/login") {
    logout();
  }
  next();
});
</script>
<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{ grid: store.isAuth }">
    <LayoutSidebar v-if="store.isAuth" />
    <div>
      <slot></slot>
    </div>
  </section>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 5fr;
  min-height: 100vh;
}
@media screen and (max-width: 639px) {
  .grid {
    display: block;
  }
}
</style>

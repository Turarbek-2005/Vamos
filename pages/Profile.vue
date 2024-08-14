<script setup lang="ts">
import { useRibbonQuery } from "~/components/ribbon/useRibbonQuery";

const authStore = useAuthStore();
const store = useDialogSlideStore();
const publications = ref<any>([]);

onMounted(() => {
  const { data } = useRibbonQuery();
  if (data.value) {
    publications.value = data.value.filter((item) => {
      return item.name === authStore.user.name;
    });
  }
});
</script>
<template>
  <div class="dark:text-white w-2/3 mx-auto pt-5 pb-20 sm:py-0 sm:my-5">
    <div
      class="flex flex-col md:flex-row items-center md:px-0 lg:px-4 sm:px-10 w-full"
    >
      <NuxtImg
        :src="authStore.user.prefs.avatarUrl"
        class="w-24 h-24 md:w-36 md:h-36 rounded-full mr-0 md:mr-5 mb-4 md:mb-0"
      />
      <div class="text-center md:text-left flex-grow">
        <h4 class="text-xl md:text-2xl mb-2">
          {{ authStore.user.name }}
        </h4>
        <p>{{ publications?.length }} publications</p>
      </div>
      <NuxtLink to="/Settings" class="mt-4 md:mt-0">
        <Button>Edit data</Button>
      </NuxtLink>
    </div>

    <div
      class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 flex-wrap"
    >
      <div v-for="item in publications" :key="item.id" class="w-full">
        <Dialog>
          <DialogTrigger @click="store.set(item)" as-child>
            <NuxtImg
              :src="item.photoes[0]"
              class="w-full h-48 sm:h-64 md:h-72 lg:h-80 hover:opacity-60 cursor-pointer object-cover"
            />
          </DialogTrigger>
          <Model />
        </Dialog>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

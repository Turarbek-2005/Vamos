<script setup lang="ts">
import { useRibbonQuery } from '~/components/ribbon/useRibbonQuery';

const authStore = useAuthStore();
const { data } = useRibbonQuery();
const store = useDialogSlideStore();
const publications = data.value?.filter((item) => {
    return item.name === authStore.user.name;
});
</script>
<template>
    <div class="dark:text-white w-2/3 mx-auto mt-5 mb-5">
        <div class="flex items-center px-10">
            <NuxtImg
                :src="authStore.user.prefs.avatarUrl"
                class="w-36 h-36 rounded-full mr-5"
            />
            <div>
                <h4 class="text-2xl mb-2 mr-10">{{ authStore.user.name }}</h4>
                <p>{{ publications?.length }} publications</p>
            </div>
            <NuxtLink to="/Settings">
                <Button>Edit data</Button>
            </NuxtLink>
        </div>
        <div class="mt-8 grid grid-cols-3 w-full gap-2">
            <div v-for="item in publications">
                <Dialog>
                    <DialogTrigger @click="store.set(item)" as-child>
                        <NuxtImg
                            :src="item.photoes[0]"
                            class="w-full h-72 hover:opacity-60 cursor-pointer"
                        />
                    </DialogTrigger>
                    <Model />
                </Dialog>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

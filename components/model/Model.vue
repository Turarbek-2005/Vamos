<script setup lang="ts">
import { useDialogSlideStore } from '~/store/dialog-slide.store';

const store = useDialogSlideStore();
</script>
<template>
    <DialogContent class="dark:text-white">
        <div class="flex items-center mb-3">
            <NuxtImg
                :src="store.card?.avatar"
                width="50"
                class="rounded-full mr-3 h-14 w-14"
            />
            <h4 class="dark:text-white text-xl mr-3">{{ store.card?.name }}</h4>
            <!-- <p class="dark:text-white">
                    {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
                </p> -->
        </div>
        <div class="flex">
            <Carousel class="relative carousel ml-8 mr-14">
                <CarouselContent class="relative">
                    <CarouselItem
                        v-for="photo in store.card?.photoes"
                        :key="store.card?.$id"
                    >
                        <NuxtImg class="rounded w-full img" :src="photo" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious class="dark:text-white" />
                <CarouselNext class="dark:text-white" />
            </Carousel>
            <ModelComments />
        </div>
    </DialogContent>
</template>
<style scoped>
.carousel {
    height: 30rem;
    width: 25rem;
}
.img {
    height: 30rem;
}
</style>

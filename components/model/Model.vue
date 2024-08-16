<script setup lang="ts">
import { useDialogSlideStore } from "~/store/dialog-slide.store";

const store = useDialogSlideStore();
</script>
<template>
  <DialogContent class="dark:text-white overflow-scroll">
    <div class="flex items-center mb-3">
      <NuxtImg
        :src="store.card?.avatar"
        width="50"
        class="rounded-full mr-3 h-14 w-14"
      />
      <h4 class="dark:text-white text-xl mr-3">{{ store.card?.name }}</h4>
    </div>
    <div class="flex flex-col lg:flex-row mx-auto lg:mx-0 w-2/3 lg:w-full">
      <Carousel class="relative carousel mx-auto mb-5 lg:mb-0 lg:ml-8 lg:mr-14">
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
@media screen and (max-width: 1023px) {
  .carousel {
    height: 30rem;
    width: 100%;
  }
  .img {
    height: 30rem;
  }
}
@media screen and (max-width: 767px) {
  .carousel {
    height: 20rem;
    width: 18rem;
  }
  .img {
    height: 20rem;
  }
}
@media screen and (max-width: 639px) {
  .carousel {
    height: 16rem;
    width: 12rem;
  }
  .img {
    height: 16rem;
  }
}
</style>

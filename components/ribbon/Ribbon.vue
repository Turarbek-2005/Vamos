<script setup lang="ts">
import { useDialogSlideStore } from "~/store/dialog-slide.store";
import { useRibbonQuery } from "./useRibbonQuery";
import dayjs from "dayjs";

const { data } = useRibbonQuery();
const store = useDialogSlideStore();
const authStore = useAuthStore();
const user = authStore.user;
</script>
<template>
  <div class="flex justify-between my-10 sm:my-5 lg:ml-14">
    <div class="flex flex-col items-center w-56 sm:w-72 md:w-96 mx-auto">
      <div v-for="item in data" :key="item.id" class="mb-5">
        <div class="flex items-center mb-3">
          <NuxtImg :src="item.avatar" class="rounded-full mr-3 h-12 w-12" />
          <h4 class="dark:text-white text-lg sm:text-xl mr-3">
            {{ item.name }}
          </h4>
          <p class="dark:text-white text-sm sm:text-lg">
            {{ dayjs(item.$createdAt).format("DD MMMM YYYY") }}
          </p>
        </div>
        <Carousel class="relative">
          <CarouselContent class="relative">
            <CarouselItem v-for="photo in item.photoes" :key="item.$id">
              <NuxtImg class="rounded img w-full" :src="photo" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="dark:text-white" />
          <CarouselNext class="dark:text-white" />
        </Carousel>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 48 48"
            class="cursor-pointer"
            v-if="mode == 'light'"
          >
            <path
              fill="#000000"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 48 48"
            class="cursor-pointer"
            v-else
          >
            <path
              fill="#ffffff"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
            />
          </svg>
          <Dialog>
            <DialogTrigger
              @click="store.set(item)"
              as-child
              class="m-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                v-if="mode === 'light'"
              >
                <path
                  fill="#000000"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.891 1 4.127L3 21l4.873-1c1.236.64 2.64 1 4.127 1"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                v-else
              >
                <path
                  fill="#ffffff"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.891 1 4.127L3 21l4.873-1c1.236.64 2.64 1 4.127 1"
                />
              </svg>
            </DialogTrigger>
            <Model />
          </Dialog>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            v-if="mode == 'light'"
          >
            <g
              fill="#000000"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <circle cx="4" cy="8" r="2.25" />
              <circle cx="12" cy="12" r="2.25" />
              <circle cx="12" cy="4" r="2.25" />
              <path d="m6 9l4 2M6 7l4-2" />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            v-else="mode == 'light'"
          >
            <g
              fill="#ffffff"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <circle cx="4" cy="8" r="2.25" />
              <circle cx="12" cy="12" r="2.25" />
              <circle cx="12" cy="4" r="2.25" />
              <path d="m6 9l4 2M6 7l4-2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="w-72 h-screen relative hidden lg:block">
      <div class="w-full fixed">
        <NuxtLink to="/Profile" class="flex items-center">
          <NuxtImg
            :src="user.prefs.avatarUrl"
            class="rounded-full mr-3 h-14 w-14"
          />
          <h4 class="dark:text-white text-xl mr-3">
            {{ user.name }}
          </h4>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.img {
  height: 30rem;
}

@media screen and (max-width: 767px) {
  .img {
    height: 20rem;
  }
}
</style>

<script setup lang="ts">
import { GoogleGenerativeAI } from "@google/generative-ai";
const config = useRuntimeConfig();

const send = ref<string>("");
const receive = ref<string>("");
const isLoading = ref<boolean>(false);

const genAI = new GoogleGenerativeAI(config.public.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  if (send.value) {
    isLoading.value = true;
    const result = await model.generateContent(send.value);
    const response = result.response;
    receive.value = response.text();
    isLoading.value = false;
    send.value = "";
  }
}
</script>
<template>
  <div class="px-4 py-5 sm:pr-10">
    <div
      class="h-14 z-10 fixed bottom-20 sm:bottom-5 w-11/12 sm:w-4/5 flex gap-3 bg-zinc-900 rounded-2xl p-3 items-center"
    >
      <input
        class="w-full bg-zinc-900 text-white outline-none"
        placeholder="Write a request"
        type="text"
        v-model="send"
      />
      <Button class="h-8" @click="run">Send</Button>
    </div>
    <p class="dark:text-white" v-if="isLoading">Loading...</p>
    <div v-else>
      <p class="dark:text-white" v-if="!isLoading && !receive">
        Привет! Чем могу быть полезен?
      </p>
      <p class="dark:text-white" v-else>{{ receive }}</p>
    </div>
  </div>
</template>
<style scoped></style>

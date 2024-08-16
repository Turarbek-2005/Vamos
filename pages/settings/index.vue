<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { uuid } from "vue-uuid";
import { useCommentQuery } from "./useCommentQuery";
import { useRibbonQuery } from "~/components/ribbon/useRibbonQuery";
import {
  COLLECTION_PUBLICATIONS,
  COLLECTION_COMMENTS,
  DB_ID,
  STORAGE_ID,
} from "@/app.constants";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const { data: PublicationsData } = useRibbonQuery();
const { data: commentsData } = useCommentQuery();
const authStore = useAuthStore();

const publications = PublicationsData.value?.filter(
  (item) => item.name === authStore.user.name
);

const comments = commentsData.value?.filter(
  (item) => item.name === authStore.user.name
);

const user = authStore.user;

const formData = reactive({
  name: user.name,
  email: user.email,
  password: "",
  oldPassword: "",
});

const { mutate: updateComments } = useMutation({
  mutationKey: ["update comments avatar"],
  mutationFn: async ({ Url, name }: { Url: String; name: String }) => {
    if (comments) {
      for (const item of comments) {
        const formattedData = {
          text: item.text,
          name: name ? name : item.name,
          avatar: Url ? Url : item.avatar,
        };

        await DB.updateDocument(
          DB_ID,
          COLLECTION_COMMENTS,
          item.$id,
          formattedData
        );
      }
    }
  },
  onSuccess() {
    console.log("Suiiii");
  },
  onError(error) {
    console.log(error);
  },
});

const { mutate: updatePublications } = useMutation({
  mutationKey: ["update publications avatar"],
  mutationFn: async ({ Url, name }: { Url: String; name: String }) => {
    console.log(name);
    if (publications) {
      for (const item of publications) {
        const formattedData = {
          photoes: item.photoes,
          name: name ? name : item.name,
          avatar: Url ? Url : item.avatar,
        };

        await DB.updateDocument(
          DB_ID,
          COLLECTION_PUBLICATIONS,
          item.$id,
          formattedData
        );
      }
    }
  },
  onSuccess() {
    console.log("Vamosssssss");
  },
  onError(error) {
    console.log(error);
  },
});
function updateInfo(formData: any) {
  if (formData.name) {
    account.updateName(formData.name);
    updateComments({ Url: "", name: formData.name });
    updatePublications({ Url: "", name: formData.name });
    console.log("Имя успешно обновлено.");
  }
  if (formData.password && formData.oldPassword) {
    account.updatePassword(formData.password, formData.oldPassword);
    console.log("Пароль успешно обновлен.");
  }
  if (formData.email && formData.oldPassword) {
    account.updateEmail(formData.email, formData.oldPassword);
    console.log("Электронная почта успешно обновлена.");
  }
}

const { mutate: uploadImage } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: async (file: File) => {
    const user = await account.get();
    if (!user) {
      throw new Error("User is not logged in");
    }

    const uploadedFile = await storage.createFile(STORAGE_ID, uuid.v4(), file);
    const fileUrl = storage.getFileView(STORAGE_ID, uploadedFile.$id).href;
    account.updatePrefs({ avatarUrl: fileUrl });
    authStore.user.prefs.avatarUrl = fileUrl;
    updatePublications({ Url: fileUrl, name: "" });
    updateComments({ Url: fileUrl, name: "" });
    return { uploadedFile, fileUrl };
  },
  onSuccess(data) {
    console.log("Avatar changed successfully", data);
  },
  onError(error) {
    console.error("Avatar changed failed", error);
  },
});

function changeAvatar(e: InputFileEvent) {
  if (e.target?.files && e.target.files.length > 0) {
    uploadImage(e.target.files[0]);
  }
}
</script>
<template>
  <div
    class="flex flex-col justify-center w-64 sm:w-96 mt-5 dark:text-white ml-5 sm:ml-10"
  >
    <NuxtImg :src="user.prefs.avatarUrl" class="w-36 h-36 rounded-full" />
    <Input
      type="file"
      :onchange="changeAvatar"
      class="w-72 mt-5 mb-5 dark:bg-white dark:text-black"
    />
    <div class="mb-3 flex gap-5 items-center">
      <label>Name: </label>
      <Input v-model="formData.name" />
    </div>
    <div class="mb-3 flex gap-5 items-center">
      <label>Old password: </label>
      <Input type="password" v-model="formData.oldPassword" />
    </div>
    <div class="mb-3 flex gap-5 items-center">
      <label>New password: </label>
      <Input type="password" v-model="formData.password" />
    </div>
    <p class="mb-3">
      In order to change your email you need to write your old password
    </p>
    <div class="mb-3 flex gap-5 items-center">
      <label>Email: </label>
      <Input type="email" v-model="formData.email" />
    </div>
    <Button @click="updateInfo(formData)">Save</Button>
  </div>
</template>
<style scoped></style>

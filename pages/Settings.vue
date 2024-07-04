<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { uuid } from 'vue-uuid';
import { STORAGE_ID } from '@/app.constants';

interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

const authStore = useAuthStore();
const user = authStore.user;

const formData = reactive({
    name: user.name,
    email: user.email,
    password: '',
    oldPassword: '',
});

function updateInfo() {
    account.updateName(formData.name);
    account.updatePassword(formData.password, formData.oldPassword);
    account.updateEmail(formData.email, formData.oldPassword);
}

const { mutate: uploadImage } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: async (file: File) => {
        const user = await account.get();
        if (!user) {
            throw new Error('User is not logged in');
        }

        const uploadedFile = await storage.createFile(
            STORAGE_ID,
            uuid.v4(),
            file
        );
        const fileUrl = storage.getFileView(STORAGE_ID, uploadedFile.$id).href;
        account.updatePrefs({ avatarUrl: fileUrl });
        authStore.user.prefs.avatarUrl = fileUrl;

        return { uploadedFile, fileUrl };
    },
    onSuccess(data) {
        // const fileUrl = storage.getFileView(STORAGE_ID, data.$id).href;
        // authStore.user.prefs.avatarUrl = fileUrl;
        console.log('Avatar changed successfully', data);
    },
    onError(error) {
        console.error('Avatar changed failed', error);
    },
});

function changeAvatar(e: InputFileEvent) {
    if (e.target?.files && e.target.files.length > 0) {
        uploadImage(e.target.files[0]);
    }
}
</script>
<template>
    <div class="w-96 mt-5 dark:text-white ml-10">
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
            <Input v-model="formData.email" />
        </div>
        <Button @click="updateInfo">Save</Button>
    </div>
</template>
<style scoped></style>

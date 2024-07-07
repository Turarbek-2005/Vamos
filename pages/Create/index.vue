<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { uuid } from 'vue-uuid';
import { toast } from 'vue3-toastify';
import { DB_ID, COLLECTION_PUBLICATIONS, STORAGE_ID } from '@/app.constants';

interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

const authStore = useAuthStore();
const photoes = ref<string[]>([]);

function addPhoto(e: InputFileEvent) {
    if (e.target?.files && e.target.files.length > 0) {
        uploadImage(e.target.files[0]);
    }
}

const { mutate: createPublication } = useMutation({
    mutationKey: ['create a new publication'],
    mutationFn: (data) => {
        const formattedData = {
            photoes: photoes.value,
            name: authStore.user.name,
            avatar: authStore.user.prefs.avatarUrl,
        };

        console.log('Formatted Data:', formattedData);

        return DB.createDocument(
            DB_ID,
            COLLECTION_PUBLICATIONS,
            uuid.v4(),
            formattedData
        );
    },
    onSuccess() {
        toast('Публикация успешно создана', {
            theme: 'auto',
            dangerouslyHTMLString: true,
        });
        photoes.value = [];
    },
});

const { mutate: uploadImage } = useMutation({
    mutationKey: ['upload images'],
    mutationFn: async (file: File) => {
        const user = await account.get();
        if (!user) {
            console.log('User is not logged in');
        }

        return await storage.createFile(STORAGE_ID, uuid.v4(), file);
    },
    onSuccess(data) {
        const fileUrl = storage.getFileView(STORAGE_ID, data.$id).href;
        photoes.value.push(fileUrl);
        console.log('File uploaded successfully', data);
    },
    onError(error) {
        console.error('File upload failed', error);
    },
});

async function create() {
    try {
        if (photoes.value.length > 0) {
            createPublication();
        } else {
            console.log('No photos to upload');
        }
    } catch (error) {
        console.error(
            'Ошибка при загрузке изображений или создании публикации:',
            error
        );
    }
}
</script>
<template>
    <div class="w-full pt-5 pl-14">
        <h2 class="dark:text-white text-4xl mb-5">Creating a publication</h2>
        <Carousel v-if="photoes.length > 0" class="relative w-96 mb-5">
            <CarouselContent>
                <CarouselItem v-for="photo in photoes">
                    <NuxtImg :src="photo" class="rounded img" />
                    <!-- <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/I3TDakzL_d0?si=1-zZB-PyObih6yhW"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> -->
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="dark:text-white" />
            <CarouselNext class="dark:text-white" />
        </Carousel>
        <Input
            type="file"
            :onchange="addPhoto"
            class="w-72 mb-5 dark:bg-white dark:text-black"
        />
        <p class="dark:text-white mb-5 text-xl">
            Files must be selected one at a time
        </p>
        <Button @click="create">Create</Button>
    </div>
</template>
<style scoped>
.img {
    height: 30rem;
}
</style>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IPublication } from '@/types/publication.types';
import { useComments } from './useComments';
import { useCreateComment } from './useCreateComment';

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IPublication;
</script>

<template>
    <div class="w-2/4">
        <Input
            placeholder="Оставьте комментарий"
            v-model="commentRef"
            @keyup.enter="writeComment"
            class="w-full"
        />
        <Button class="mt-4" @click="writeComment">Отправить</Button>
        <Skeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
        <div v-else-if="card" class="overflow-y-scroll h-2/3 mt-3">
            <div
                v-for="comment in card?.comments"
                :key="comment.$id"
                class="flex items-center mt-5"
            >
                <NuxtImg
                    :src="comment.avatar"
                    class="rounded-full mr-3 h-12 w-12"
                />
                <div class="border-border bg-black/20 rounded w-full">
                    <div class="mb-2 text-xl">
                        {{ comment.name }}
                        <!-- {{ dayjs(comment.$createdAt).format('') }} -->
                        <label class="text-zinc-400 text-sm">{{
                            dayjs(comment.$createdAt).format(
                                'DD MMMM YYYY HH:mm'
                            )
                        }}</label>
                    </div>
                    <p>{{ comment.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

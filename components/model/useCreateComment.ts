import { useMutation } from "@tanstack/vue-query";
import { uuid } from "vue-uuid";
import { COLLECTION_COMMENTS, DB_ID } from "~/app.constants";

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const authStore = useAuthStore();
  const store = useDialogSlideStore();
  const commentRef = ref<string>();
  
  const { mutate } = useMutation({
    mutationKey: ["add comments", commentRef.value],
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid.v4(), {
        text: commentRef.value,
        publication: store.card?.$id,
        name: authStore.user.name,
        avatar: authStore.user.prefs.avatarUrl,
      }),
    onSuccess: () => {
      refetch();
      commentRef.value = "";
    },
  });
  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };
  return {
    
    writeComment,
    commentRef,
  };
}

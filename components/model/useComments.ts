import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_PUBLICATIONS, DB_ID } from "~/app.constants";

export function useComments() {
  const store = useDialogSlideStore();
  const cardId = store.card?.$id || "";

  return useQuery({
    queryKey: ["publication", cardId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_PUBLICATIONS, cardId),
  });
}

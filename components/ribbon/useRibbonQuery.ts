import { useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_PUBLICATIONS} from "@/app.constants";

export function useRibbonQuery() {
  return useQuery({
    queryKey: ["publications"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_PUBLICATIONS),
    select(data) {
      return data.documents; 
    },
  });
}

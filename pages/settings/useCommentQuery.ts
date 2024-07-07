import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_COMMENTS, DB_ID } from '@/app.constants';

export function useCommentQuery() {
    return useQuery({
        queryKey: ['comments'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_COMMENTS),
        select(data) {
            return data.documents;
        },
    });
}

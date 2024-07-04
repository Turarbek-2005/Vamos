import { object } from "zod";

interface IAuthStore {
  email: string;
  name: string;
  status: boolean;
  prefs: {
    avatarUrl: string;
  };
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
    prefs: {avatarUrl:'https://cloud.appwrite.io/v1/storage/buckets/666d3731002118273329/files/668157ae0032b004cee0/view?project=666779c3001bd901dc45&mode=admin'},
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});

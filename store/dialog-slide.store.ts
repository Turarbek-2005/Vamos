const defaultValue: { card:any} = {
  card: null
};

export const useDialogSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: any) {
      this.$patch({ card});
    }
  },
});

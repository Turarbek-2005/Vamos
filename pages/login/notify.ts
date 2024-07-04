import { toast } from "vue3-toastify";

function notifyError(text: string) {
  toast(text, {
    theme: "auto",
    type: "error",
    dangerouslyHTMLString: true,
  });
}

export { notifyError };

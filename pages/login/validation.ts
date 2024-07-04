import { z } from "zod";

const state = z.object({
  email: z.string().email("Email написан не корректно"),
  password: z
    .string()
    .min(4, {
      message: "Пароль не должен быть меньше 4 символов и больше 25 символов",
    })
    .max(25),
});

const validateErrors = ref<
  z.ZodFormattedError<
    {
      email: string;
      password: string;
    },
    string
  >
>({ _errors: [] });

const formData = reactive({
  email: "",
  password: "",
  name: "",
});

export { formData, state, validateErrors };

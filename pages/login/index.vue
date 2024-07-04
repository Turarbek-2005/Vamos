<script setup lang="ts">
import 'vue3-toastify/dist/index.css';
import { uuid } from 'vue-uuid';
import { notifyError } from './notify';
import { formData, state, validateErrors } from './validation';
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
    if (handleOnValidate()) {
        isLoadingStore.set(true);
        try {
            const currentSession = await account.get();

            if (currentSession) {
                console.log('Current session exists:', currentSession);
                await account.deleteSession('current');
            }
        } catch (error: any) {
            if (error.code !== 401) {
                console.error('Failed to get current session:', error);
            }
        }

        try {
            await account.createEmailPasswordSession(
                formData.email,
                formData.password
            );
            const response = await account.get();
            if (response) {
                authStore.set({
                    email: response.email,
                    name: response.name,
                    status: response.status,
                    prefs: { avatarUrl: '' },
                });
            }

            formData.email = '';
            formData.password = '';
            formData.name = '';

            await router.push('/');
            isLoadingStore.set(false);
        } catch (error: any) {
            isLoadingStore.set(false);
            notifyError('Неправильная почта или пароль');
        }
    }
};

const register = async () => {
    handleOnValidate();
    await account.create(
        uuid.v4(),
        formData.email,
        formData.password,
        formData.name
    );
    await login();
};

function handleOnValidate() {
    const validationResult = state.safeParse(formData);
    if (!validationResult.success) {
        const errors = validationResult.error.format();
        validateErrors.value = errors;
        console.log(validateErrors.value);
        if (!!errors.email?._errors[0]) {
            notifyError(errors.email?._errors[0]);
        }
        if (!!errors.password?._errors[0]) {
            notifyError(errors.password?._errors[0]);
        }
    } else {
        validateErrors.value = { _errors: [] };
        return true;
    }
}
</script>
<template>
    <div class="relative flex items-center justify-center min-h-screen w-full">
        <Button
            @click="darkMode"
            class="rounded-full absolute right-10 top-5 flex w-14"
        >
            <Icon size="20" v-if="mode == 'light'" name="i-carbon-sun" />
            <Icon size="20" v-else name="i-carbon-moon" />
        </Button>
        <div class="rounded w-96 p-5 dark:bg-black">
            <h1 class="text-4xl font-bold text-center mb-5 dark:text-white">
                Login
            </h1>
            <form class="flex flex-col">
                <Input
                    v-model="formData.email"
                    placeholder="Email"
                    type="email"
                    class="mb-3"
                />
                <Input
                    v-model="formData.password"
                    placeholder="Password"
                    type="password"
                    class="mb-5"
                />
                <Input
                    v-model="formData.name"
                    placeholder="name"
                    type="name"
                    class="mb-5"
                />
                <div class="flex items-center justify-center gap-5">
                    <Button @click="login" class="w-1/4">Login</Button>
                    <Button @click="register" class="w-1/4">Register</Button>
                </div>
            </form>
        </div>
    </div>
</template>

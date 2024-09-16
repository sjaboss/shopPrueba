<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="fullName" class="block text-gray-600">Nombre</label>
      <input
        ref="fullNameInputRef"
        v-model="myFormRegister.fullName"
        type="text"
        id="fullName"
        name="fullName"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        ref="emailInputRef"
        v-model="myFormRegister.email"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="myFormRegister.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidé mi contraseña</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Ingresar por Aquí</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();
const fullNameInputRef = ref<HTMLAnchorElement | null>(null);
const emailInputRef = ref<HTMLAnchorElement | null>(null);
const passwordInputRef = ref<HTMLAnchorElement | null>(null);

const myFormRegister = reactive({
  fullName: '',
  email: '',
  password: '',
  remenberMe: false,
});

const onRegister = async () => {
  if (myFormRegister.fullName == '') {
    return fullNameInputRef.value?.focus;
  }
  if (myFormRegister.email == '') {
    return emailInputRef.value?.focus;
  }

  if (myFormRegister.password == '' || myFormRegister.password.length < 6) {
    return passwordInputRef.value?.focus;
  }

  const { ok, message } = await authStore.register(
    myFormRegister.fullName,
    myFormRegister.email,
    myFormRegister.password,
  );
  if (ok) return;
  toast.error(message);
};
</script>

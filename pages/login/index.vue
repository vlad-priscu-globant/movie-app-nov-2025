<script setup lang="ts">
const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')

async function login() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMsg.value = error.message
  } else {
    successMsg.value = 'Logged in successfully!'
    setTimeout(() => {
      navigateTo('/')
    }, 500)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl mb-4">Login</h1>
    <form class="space-y-4" @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" />
      <div class="flex justify-between ">
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <NuxtLink to="/register">Register</NuxtLink>
      </div>
    </form>

    <div v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</div>
    <div v-if="successMsg" class="text-green-600 mt-2">{{ successMsg }}</div>
  </div>
</template>
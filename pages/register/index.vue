<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const loading = ref(false)

async function register() {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
  } else {
    successMsg.value = '✅ Check your email to confirm your registration.'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Register</h1>

    <form class="space-y-4" @submit.prevent="register">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full border rounded p-2 text-black"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full border text-black rounded p-2"
      >
      <button
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
    </form>

    <div v-if="errorMsg" class="text-red-600 mt-4">{{ errorMsg }}</div>
    <div v-if="successMsg" class="text-green-600 mt-4">{{ successMsg }}</div>
  </div>
</template>
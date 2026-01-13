<script setup>
const client = useSupabaseClient()

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <button @click="logout" class="text-sm text-red-500">Logout</button>
</template>
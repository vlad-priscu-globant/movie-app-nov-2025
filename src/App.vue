<script lang="ts" setup>
import Search from "./components/Search.vue";
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <header class="flex justify-between items-center p-4 bg-gradient-to-b from-black via-gray-900 to-transparent">
      <RouterLink to="/"><h1 class="text-3xl font-bold text-red-600">MovieApp</h1></RouterLink>
      <nav class="flex gap-6">
        <Search></Search>
        <button class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700">Login</button>
      </nav>
    </header>
    <main class="p-4">
      <RouterView/>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      © 2025 MovieApp.
    </footer>
    <SpeedInsights />
  </div>
</template>

<style scoped>

</style>
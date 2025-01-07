<script setup lang="ts">
import { Button } from 'ant-design-vue';
import ThemeToggle from './ThemeToggle.vue';
import { useSidebar } from '../composables/useSidebar';

const { toggleSidebar } = useSidebar();
</script>

<template>
  <header class="header">
    <div class="h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full">
        <!-- Mobile menu button -->
        <button class="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"  @click="toggleSidebar">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="/vite.svg" alt="Logo" />
          </div>
          <nav class="hidden md:flex space-x-4">
            <a v-for="item in ['Models', 'Datasets', 'Spaces', 'Docs']" :key="item" href="#"
              class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 text-sm font-medium">
              {{ item }}
            </a>
          </nav>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <div class="hidden md:flex space-x-2">
            <Button type="primary" class="btn-primary">Sign Up</Button>
            <Button>Log In</Button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
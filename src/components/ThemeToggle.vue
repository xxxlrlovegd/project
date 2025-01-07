<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { Button } from 'ant-design-vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Button @click="toggleDark()" class="theme-toggle">
    {{ isDark ? '🌞' : '🌙' }}
  </Button>
</template>

<style scoped>
.theme-toggle {
  @apply fixed top-4 right-4 z-50;
}
</style>
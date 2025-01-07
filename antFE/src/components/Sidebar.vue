<script setup lang="ts">
import { IconReset } from './icons';
import { useSidebar } from '../composables/useSidebar';
const { isOpen } = useSidebar();
import { useFilterStore } from '../stores/useFilterStore';
import { Button } from 'ant-design-vue';
const filterStore = useFilterStore();
const categories = [
  { id: 'main', label: 'Main', active: true },
  { id: 'tasks', label: 'Tasks' },
  { id: 'libraries', label: 'Libraries' },
  { id: 'languages', label: 'Languages' },
  { id: 'licenses', label: 'Licenses' },
];

const modalities = [
  { id: '3d', label: '3D', icon: '📊' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'geospatial', label: 'Geospatial', icon: '🌍' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'tabular', label: 'Tabular', icon: '📑' },
  { id: 'text', label: 'Text', icon: '📝' },
  { id: 'time-series', label: 'Time-series', icon: '⏱️' },
  { id: 'video', label: 'Video', icon: '🎥' },
];

const formats = [
  'json', 'csv', 'parquet', 'imagefolder',
  'soundfolder', 'webdataset', 'text', 'arrow'
];
</script>

<template>
  <aside :class="[{ 'sidebar': !isOpen, 'sidebar-mobile': isOpen, 'open': isOpen, }]">
    <div class="py-4">
      <!-- Categories -->
      <div class="mb-8">
        <div class="h-4 flex items-center justify-between mb-1">
          <div class="pl-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            Categories
          </div>
          <!-- Clear all filters button -->

          <div v-if="filterStore.activeCategory || filterStore.activeModality || filterStore.activeFormat">
            <Button type="text" @click="filterStore.clearFilters">
              <template #icon>
                 <IconReset class="w-4 h-4 inline"/>
              </template>
            </Button>
          </div>
        </div>

        <nav class="grid grid-cols-2 gap-2">
          <a v-for="category in categories" :key="category.id" :class="[
            'block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer',
            filterStore.activeCategory === category.id
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
          ]" @click="filterStore.setActiveCategory(category.id)">
            {{ category.label }}
          </a>
        </nav>
      </div>

      <!-- Modalities -->
      <div class="mb-8">
        <h3 class="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Modalities
        </h3>
        <div class="grid grid-cols-2 gap-2 px-2">
          <a v-for="modality in modalities" :key="modality.id" :class="[
            'flex items-center px-3 py-2 text-sm rounded-md transition-colors cursor-pointer',
            filterStore.activeModality === modality.id
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
          ]" @click="filterStore.setActiveModality(modality.id)">
            <span class="mr-2">{{ modality.icon }}</span>
            {{ modality.label }}
          </a>
        </div>
      </div>

      <!-- Formats -->
      <div class="mb-4">
        <h3 class="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Format
        </h3>
        <div class="space-y-1 px-2">
          <a v-for="format in formats" :key="format" :class="[
            'flex items-center px-3 py-2 text-sm rounded-md transition-colors cursor-pointer',
            filterStore.activeFormat === format
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
          ]" @click="filterStore.setActiveFormat(format)">
            {{ format }}
          </a>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" @click="isOpen = false"></div>
</template>
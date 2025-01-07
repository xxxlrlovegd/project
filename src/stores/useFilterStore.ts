import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  const activeCategory = ref('');
  const activeModality = ref('');
  const activeFormat = ref('');

  const setActiveCategory = (category: string) => {
    activeCategory.value = activeCategory.value === category ? '' : category; // 切换选中状态
  };

  const setActiveModality = (modality: string) => {
    activeModality.value = activeModality.value === modality ? '' : modality; // 切换选中状态
  };

  const setActiveFormat = (format: string) => {
    activeFormat.value = activeFormat.value === format ? '' : format; // 切换选中状态
  };

  const clearFilters = () => {
    activeCategory.value = '';
    activeModality.value = '';
    activeFormat.value = '';
  };

  return {
    activeCategory,
    activeModality,
    activeFormat,
    setActiveCategory,
    setActiveModality,
    setActiveFormat,
    clearFilters,
  };
});
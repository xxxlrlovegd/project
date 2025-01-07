<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFilterStore } from '../stores/useFilterStore'
import { Dataset } from '../types/dataset';
import { Input, Select, DatePicker, Button, Pagination, Empty } from 'ant-design-vue';
import { IconDownload, IconHeart, IconCalendar, IconBuilding, IconSort } from './icons';
import { formatDate, isDateInRange } from '../utils/date';
import dayjs, { Dayjs } from 'dayjs';
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const searchText = ref('');
const organization = ref('');
const dateRange = ref([]);
const sortBy = ref('likes');

const datasets = ref<Dataset[]>([
  {
    id: '1',
    name: 'fka/awesome-chatgpt-prompts',
    downloads: 5650,
    lastUpdated: '2024-03-04',
    likes: 6700,
    size: '170KB',
    viewer: 'Viewer',
    organization: 'OpenAI',
    category: 'main',
    modality: 'text',
    format: 'json'
  },
  {
    id: '2',
    name: 'HuggingFaceFM/fineweb',
    downloads: 199000,
    lastUpdated: '2024-03-10',
    likes: 1800,
    size: '48.4B',
    viewer: 'Viewer',
    organization: 'HuggingFace',
    category: 'tasks',
    modality: 'text',
    format: 'csv'
  },
  {
    id: '3',
    name: 'microsoft/coco-dataset',
    downloads: 890000,
    lastUpdated: '2024-03-08',
    likes: 12500,
    size: '25GB',
    viewer: 'Viewer',
    organization: 'Microsoft',
    category: 'main',
    modality: 'image',
    format: 'imagefolder'
  },
  {
    id: '4',
    name: 'google/audioset',
    downloads: 45000,
    lastUpdated: '2024-03-01',
    likes: 3200,
    size: '2.4TB',
    viewer: 'Viewer',
    organization: 'Google',
    category: 'libraries',
    modality: 'audio',
    format: 'soundfolder'
  },
  {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  },
  {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }, {
    id: '5',
    name: 'nvidia/synthetic-3d',
    downloads: 28000,
    lastUpdated: '2024-03-05',
    likes: 2100,
    size: '500GB',
    viewer: 'Viewer',
    organization: 'NVIDIA',
    category: 'tasks',
    modality: '3d',
    format: 'parquet'
  }
]);

const filterStore = useFilterStore();
const filteredData = computed(() => {
  currentPage.value = 1;
  return datasets.value.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchText.value.toLowerCase());
    const orgMatch = !organization.value || item.organization.toLowerCase().includes(organization.value.toLowerCase());
    const dateMatch = !dateRange.value?.length || isDateInRange(item.lastUpdated, dateRange.value[0], dateRange.value[1]);
    const categoryMatch = !filterStore.activeCategory || item.category === filterStore.activeCategory;
    const modalityMatch = !filterStore.activeModality ||
      item.modality === filterStore.activeModality;
    const formatMatch = !filterStore.activeFormat || item.format === filterStore.activeFormat;

    return nameMatch && orgMatch && dateMatch && categoryMatch && modalityMatch && formatMatch;
  });
});
const rangePresets = ref([
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
]);
const onChange = (date: Dayjs) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};
const itemsPerPage = ref(5); // 每页显示的项目数量
const currentPage = ref(1);
// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

// 更新当前页
const updatePage = (page: any) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Search and filters -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input v-model:value="searchText" placeholder="Filter by name" class="w-full" allowClear>
      <template #prefix>
        <i class="fas fa-search"></i>
      </template>
      </Input>

      <Input v-model:value="organization" placeholder="Filter by organization" class="w-full" allowClear>
      <template #prefix>
        <IconBuilding class="w-4 h-4" />
      </template>
      </Input>

      <DatePicker.RangePicker v-model:value="dateRange" :presets="rangePresets" class="w-full">
        <!-- <template #prefix>
          <IconCalendar class="w-4 h-4" />
        </template> -->
      </DatePicker.RangePicker>
      <div class="flex justify-end items-center">
        <!-- <Button :size="small" >搜索</Button> -->
        <Select class="md:w-3/4 w-full md:pl-6" v-model:value="sortBy">
          <template #suffixIcon>
            <IconSort class="w-4 h-4 ant-select-suffix" />
          </template>
          <Select.OptGroup value="likes" title="Sort:likes">
            <template #label>
              <span class="flex justify-start items-center  text-gray-500 text-sm">
                SortBy
                <IconSort class="w-4 h-4 mt-1  ml-1 inline" />
              </span>
            </template>
            <Select.Option value="likes" title="Sort:likes">Most likes</Select.Option>
            <Select.Option value="downloads">Most downloads</Select.Option>
            <Select.Option value="recent">Recently updated</Select.Option>
          </Select.OptGroup>
        </Select>
      </div>

      <!-- <div class="flex items-center border-b border-gray-300 py-1 px-2 text-gray-500"><span>SortBy:</span></div> -->

    </div>

    <!-- Dataset cards -->
    <div v-if="paginatedData.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="dataset in paginatedData" :key="dataset.id" class="card group">
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-baseline">
              <h3 class="text-lg font-medium text-blue-600 dark:text-blue-400 line-clamp-2">
                {{ dataset.name }}
              </h3>
              <span
                class="w-14 h-6 leading-6  text-xs text-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {{ dataset.size }}
              </span>
            </div>

            <div class="space-y-2">
              <div class="flex items-center text-sm text-[var(--text-secondary)]">
                <IconBuilding class="w-4 h-4 mr-2" />
                <span>{{ dataset.organization }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
              <div class="flex items-center text-sm">
                <IconDownload class="w-4 h-4 mr-1" />
                <span>{{ formatNumber(dataset.downloads) }}</span>
              </div>
              <div class="flex items-center text-sm text-pink-600 dark:text-pink-400">
                <IconHeart class="w-4 h-4 mr-1" />
                <span>{{ dataset.likes.toLocaleString() }}</span>
              </div>
              <div class="flex items-center text-sm text-[var(--text-secondary)]">
                <IconCalendar class="w-4 h-4 mr-2" />
                <span>Updated {{ formatDate(dataset.lastUpdated) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagenation -->
      <div class="text-center my-8">
        <Pagination :current="currentPage" :pageSize="itemsPerPage" :total="filteredData.length" @change="updatePage"
          :show-total="total => `Total ${total} items`" />
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-96">
      <Empty :image="simpleImage" />
    </div>
  </div>
</template>
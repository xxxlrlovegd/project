<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import DatasetList from './components/DatasetList.vue';
import { useSidebar } from './composables/useSidebar';

const { isOpen } = useSidebar();
</script>

<template>
  <div class="main-layout">
    <Header />
    
    <!-- PC端统一滚动容器 -->
    <div class="unified-scroll">
      <div class="unified-container">
        <!-- PC端侧边栏 -->
        <Sidebar class="sidebar" />
        
        <!-- 内容区域 -->
        <main class="content">
          <DatasetList />
        </main>
      </div>
    </div>

    <!-- 移动端侧边栏 -->
    <!-- <Sidebar :class="['sidebar-mobile', { 'open': isOpen }]" /> -->
    
    <!-- 移动端遮罩 -->
    <div v-if="isOpen" class="mobile-overlay" @click="isOpen = false" />
  </div>
</template>
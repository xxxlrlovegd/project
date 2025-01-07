import { ref, watch } from 'vue';

const isOpen = ref(false);

export function useSidebar() {
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  // 监听窗口大小，自动关闭侧边栏在移动设备上
  watch(() => window.innerWidth, (newWidth) => {
    if (newWidth > 768) { // 假设768px为移动端和PC端的分界线
      isOpen.value = false; // 在PC端时关闭侧边栏
    }
  });

  return {
    isOpen,
    toggleSidebar,
  };
}
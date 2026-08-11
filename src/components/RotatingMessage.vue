<template>
  <div class="flex-1 text-center overflow-hidden h-4 relative">
    <transition name="fade" mode="out-in">
      <span :key="indice" class="block">{{ mensajes[indice] }}</span>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mensajes: { type: Array, default: () => [] },
  intervalo: { type: Number, default: 4000 },
});

const indice = ref(0);
let temporizador;

onMounted(() => {
  if (props.mensajes.length > 1) {
    temporizador = setInterval(() => {
      indice.value = (indice.value + 1) % props.mensajes.length;
    }, props.intervalo);
  }
});

onUnmounted(() => clearInterval(temporizador));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

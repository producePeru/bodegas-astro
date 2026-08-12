<script setup>
import { ref, computed, onMounted } from 'vue';
import HomeView from './HomeView.vue';
import MarcaView from './MarcaView.vue';
import WelcomeModal from './WelcomeModal.vue';

function leerRuta() {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash.slice(1) || '/';
  return hash.startsWith('/marca/') || hash === '/' ? hash : '/';
}

const ruta = ref(leerRuta());

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    ruta.value = leerRuta();
    window.scrollTo(0, 0);
  });
}

const marcaMatch = computed(() => ruta.value.match(/^\/marca\/(\d+)$/));

const vista = computed(() => (marcaMatch.value ? MarcaView : HomeView));

const propsVista = computed(() =>
  marcaMatch.value ? { id: Number(marcaMatch.value[1]) } : {}
);

const modalAbierto = ref(false);

onMounted(() => {
  if (!sessionStorage.getItem('welcome_modal_visto')) {
    modalAbierto.value = true;
  }
});
</script>

<template>
  <component :is="vista" v-bind="propsVista" />
  <WelcomeModal :abierto="modalAbierto" @cerrar="modalAbierto = false; sessionStorage.setItem('welcome_modal_visto', '1')" />
</template>
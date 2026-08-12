<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { fetchTiendas } from '../../services/api';

const tiendas = ref([]);
const cargando = ref(true);
const error = ref('');
const busqueda = ref('');

const visibles = computed(() => {
  const termino = busqueda.value.trim().toLowerCase();
  if (!termino) return tiendas.value;
  return tiendas.value.filter((t) =>
    (t.nombre || '').toLowerCase().includes(termino)
  );
});

async function cargar() {
  cargando.value = true;
  error.value = '';
  try {
    const resultado = await fetchTiendas();
    tiendas.value = resultado?.data?.data || resultado?.data || [];
  } catch (e) {
    console.error('Error fetching tiendas:', e);
    error.value = 'Error al cargar las tiendas. Intenta nuevamente.';
  } finally {
    cargando.value = false;
  }
}

let miniaturarando;
function setMiniatura(e, tienda) {
  if (miniaturarando) return;
  const t = e.target;
  t.outerHTML = `<span class="cae-texto-logo font-body font-semibold text-center leading-tight text-sm md:text-base">${tienda.nombre}</span>`;
}

onMounted(cargar);
onUnmounted(() => clearTimeout(miniaturarando));
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 text-center">


    <div id="buscador" class="mt-6 max-w-sm mx-auto">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-4 h-4 text-[#00a1d4] absolute left-4 top-1/2 -translate-y-1/2">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
          </path>
        </svg>
        <input v-model="busqueda" type="search" placeholder="Buscar marca aliada..." autocomplete="off"
          class="w-full pl-11 pr-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm text-stone-600 focus:border-[#00a1d4] focus:ring-2 focus:ring-[#00a1d4]/20 outline-none transition placeholder:text-stone-400" />
      </div>
      <p v-if="!cargando && !error && visibles.length === 0" class="mt-4 text-sm text-[#00a6db]">
        No se encontraron marcas.
      </p>
      <p v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</p>
    </div>
  </section>

  <section class="w-full px-4 md:px-8 py-10 md:py-14">
    <div v-if="cargando" class="w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      <div v-for="n in 8" :key="n" class="bg-white border border-stone-200/60 rounded-lg overflow-hidden">
        <div class="h-28 md:h-72 bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
          <div class="w-14 h-14 md:w-24 md:h-24 rounded-full bg-stone-200/70 animate-pulse"></div>
        </div>
        <div class="h-10 md:h-11 px-2 border-t border-stone-100 flex items-center justify-center">
          <div class="h-3.5 bg-stone-200/70 rounded-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>

    <div v-else id="grid-marcas" class="w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      <a v-for="tienda in visibles" :key="tienda.id" :href="`#/marca/${tienda.id}`"
        class="group flex flex-col bg-white border border-stone-200 rounded-lg hover:border-[#e31d1a]/50 hover:shadow-md transition-all overflow-hidden h-full">
        <div
          class="w-full h-28 md:h-72 flex items-center justify-center text-stone-500 group-hover:text-[#00a6db] transition-colors p-4">
          <img v-if="tienda.imagen" :src="tienda.imagen" :alt="`Logo de ${tienda.nombre}`" loading="lazy"
            class="max-w-[75%] md:max-w-[85%] max-h-full md:max-h-[80%] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
            @error="setMiniatura($event, tienda)" />
          <span v-else class="font-body font-semibold text-center leading-tight text-sm md:text-base">{{ tienda.nombre
          }}</span>
        </div>
        <span
          class="w-full h-10 md:h-11 flex items-center justify-center text-center text-xs md:text-sm font-medium text-stone-600 border-t border-stone-100 group-hover:text-[#e31d1a] group-hover:border-[#e31d1a]/30 transition-colors truncate px-2 shrink-0">
          {{ tienda.nombre }}
        </span>
      </a>

      <p v-if="!cargando && visibles.length === 0" class="col-span-full text-center text-stone-400">
        No hay tiendas disponibles.
      </p>
    </div>
  </section>
</template>

<style scoped>
.cae-texto-logo {
  display: block;
  max-width: 80%;
}
</style>
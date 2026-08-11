<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ marca: string }>();

const nombre = ref('');
const celular = ref('');
const correo = ref('');
const producto = ref('');
const enviado = ref(false);
const error = ref('');

function validarCorreo(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function validarCelular(valor: string): boolean {
  return /^[+\d][\d\s-]{6,}$/.test(valor);
}

function enviar(e: Event) {
  e.preventDefault();
  error.value = '';
  if (!nombre.value.trim()) {
    error.value = 'Por favor ingresa tu nombre.';
    return;
  }
  if (!validarCelular(celular.value)) {
    error.value = 'Ingresa un número de celular válido.';
    return;
  }
  if (!validarCorreo(correo.value)) {
    error.value = 'Ingresa un correo electrónico válido.';
    return;
  }
  enviado.value = true;
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-11 h-11 rounded-xl bg-[#00a6db] flex items-center justify-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </div>
      <div>
        <h2 class="font-display text-xl font-bold text-neutral-900 leading-tight">Contáctanos</h2>
        <p class="text-xs text-neutral-500">Te respondemos en menos de 24h</p>
      </div>
    </div>
    <p class="text-neutral-500 mb-6 text-sm">
      Completa el formulario y nos pondremos en contacto con la tienda <strong>{{ marca }}</strong>.
    </p>

    <form v-if="!enviado" @submit="enviar" novalidate class="space-y-4">
      <div>
        <label for="nombre" class="block text-sm font-medium text-neutral-700 mb-1">Nombre</label>
        <input
          id="nombre"
          v-model="nombre"
          type="text"
          placeholder="Tu nombre completo"
          class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition"
        />
      </div>

      <div>
        <label for="celular" class="block text-sm font-medium text-neutral-700 mb-1">Celular</label>
        <input
          id="celular"
          v-model="celular"
          type="tel"
          placeholder="+51 999 999 999"
          class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition"
        />
      </div>

      <div>
        <label for="correo" class="block text-sm font-medium text-neutral-700 mb-1">Correo electrónico</label>
        <input
          id="correo"
          v-model="correo"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition"
        />
      </div>

      <div>
        <label for="producto" class="block text-sm font-medium text-neutral-700 mb-1">Indicar producto de interés</label>
        <input
          id="producto"
          v-model="producto"
          type="text"
          placeholder="Ej: Vino tinto, Lavadora, Zapatos..."
          class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition"
        />
      </div>

      <p v-if="error" role="alert" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
        {{ error }}
      </p>

      <button
        type="submit"
        class="w-full bg-[#00a6db] hover:bg-[#0090bd] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
      >
        Enviar mensaje
      </button>
    </form>

    <div v-else class="text-center py-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 text-emerald-500 mx-auto mb-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <h3 class="font-display text-xl font-bold text-neutral-900 mb-1">¡Mensaje enviado!</h3>
      <p class="text-neutral-500">Gracias {{ nombre }}, pronto nos pondremos en contacto contigo.</p>
      <button
        type="button"
        @click="enviado = false; nombre = ''; celular = ''; correo = ''; producto = ''"
        class="mt-4 text-sm text-[#00a6db] hover:text-[#0090bd] font-medium underline"
      >
        Enviar otro mensaje
      </button>
    </div>
  </div>
</template>

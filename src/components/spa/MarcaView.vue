<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { fetchTiendaById, enviarContacto } from '../../services/api';
import SocialIconsView from './SocialIconsView.vue';

const props = defineProps({
  id: { type: Number, required: true },
});

const apiBase = import.meta.env.DEV
  ? import.meta.env.PUBLIC_API_URL_LOCAL
  : import.meta.env.PUBLIC_API_URL_PRODUCTION;

const tienda = ref(null);
const cargando = ref(true);
const noEncontrada = ref(false);

const redesSociales = computed(() => {
  const r = {};
  (tienda.value?.socials || []).forEach((social) => {
    const name = social.name.toLowerCase();
    if (name === 'facebook') r.facebook = social.link;
    if (name === 'instagram') r.instagram = social.link;
    if (name === 'tiktok') r.tiktok = social.link;
    if (name === 'whatsapp') r.whatsapp = social.link;
  });
  return r;
});

const baseSinApi = (base) => base.replace(/\/api\/?$/, '');

const imagenUrl = computed(() => {
  const url = tienda.value?.image?.url;
  if (!url) return '';
  if (/^https?:\/\//.test(url)) return url;
  return `${baseSinApi(apiBase)}/${url}`;
});

async function cargar() {
  cargando.value = true;
  noEncontrada.value = false;
  tienda.value = null;
  try {
    const resultado = await fetchTiendaById(props.id);
    tienda.value = resultado?.data || resultado;
    if (!tienda.value) {
      noEncontrada.value = true;
    }
  } catch (e) {
    console.error('Error fetching tienda:', e);
    noEncontrada.value = true;
  } finally {
    cargando.value = false;
  }
}

watch(() => props.id, cargar);
onMounted(cargar);

function navegarInicio() {
  window.location.hash = '/';
}

// ---- Formulario de contacto ----
const contactoEnviado = ref(false);
const enviando = ref(false);
const mensajeContacto = ref('');
const form = ref({
  nombre: '',
  celular: '',
  correo: '',
  producto: '',
});

async function enviarFormulario() {
  enviando.value = true;

  try {
    await enviarContacto({
      nombre: form.value.nombre.trim() || 'amigo empresario',
      celular: form.value.celular.trim(),
      correo: form.value.correo.trim(),
      productos: form.value.producto.trim(),
      id_empresa: props.id,
    });
    mensajeContacto.value =
      'Mensaje enviado correctamente. Te contactaremos pronto.';
    contactoEnviado.value = true;
    form.value = { nombre: '', celular: '', correo: '', producto: '' };
  } catch (error) {
    mensajeContacto.value = 'Error al enviar. Intenta nuevamente.';
    contactoEnviado.value = true;
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <div v-if="cargando" class="max-w-7xl mx-auto px-4 py-14 text-center text-stone-400">
    <div class="flex gap-1.5 justify-center">
      <span class="w-2 h-2 rounded-full bg-[#00a6db] animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-[#00a6db] animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-2 h-2 rounded-full bg-[#00a6db] animate-bounce" style="animation-delay: 300ms"></span>
    </div>
    <p class="mt-4 text-xs text-stone-400 tracking-wide uppercase font-medium">Cargando tienda</p>
  </div>

  <div v-else-if="noEncontrada" class="max-w-7xl mx-auto px-4 py-14 text-center">
    <p class="text-stone-500">La tienda no existe o no está disponible.</p>
    <button @click="navegarInicio" class="mt-4 inline-flex items-center gap-1 text-sm text-[#00a6db] hover:underline">
      Volver al inicio
    </button>
  </div>

  <div v-else-if="tienda">
    <nav class="bg-white border-b border-neutral-200" aria-label="Ruta">
      <div class="max-w-7xl mx-auto px-4 py-3 text-sm text-neutral-500">
        <a href="#/" class="hover:text-[#00a6db] transition-colors">Inicio</a>
        <span class="mx-2 text-neutral-300">›</span>
        <span class="text-neutral-800 font-medium">{{ tienda.nombre }}</span>
      </div>
    </nav>

    <section class="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="mb-12">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div
                class="relative w-36 h-36 md:w-44 md:h-44 shrink-0 rounded-2xl bg-gradient-to-br from-[#00a6db]/15 via-white to-[#e31d1a]/10 border border-neutral-200 flex items-center justify-center p-5 shadow-sm">
                <img v-if="imagenUrl" :src="imagenUrl" :alt="`Logo de ${tienda.nombre}`"
                  class="max-h-full max-w-full object-contain" />
                <span v-else class="font-display text-3xl font-extrabold text-neutral-700 text-center leading-tight">
                  {{ tienda.nombre }}
                </span>
                <span
                  class="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                    </path>
                  </svg>
                  Verificada
                </span>
              </div>

              <div class="flex-1 min-w-0 text-center md:text-left">
                <h1 class="font-display text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
                  {{ tienda.nombre }}
                </h1>
              </div>
            </div>

            <div v-if="tienda.descripcion"
              class="mt-8 border-t border-neutral-200 pt-6 text-neutral-600 leading-relaxed text-lg text-center md:text-left max-w-3xl"
              v-html="tienda.descripcion" />
          </div>

          <div class="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-8">
            <h2 class="font-display text-2xl font-bold text-neutral-900 mb-4">
              Ficha de la tienda
            </h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt class="text-xs uppercase tracking-wide text-neutral-400 mb-1">
                  RUC
                </dt>
                <dd class="font-mono font-semibold text-neutral-800">
                  {{ tienda.ruc }}
                </dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wide text-neutral-400 mb-1">
                  Rubro
                </dt>
                <dd class="font-semibold text-neutral-800">{{ tienda.celular }}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wide text-neutral-400 mb-1">
                  Correo
                </dt>
                <dd class="font-semibold text-neutral-800 break-all">
                  {{ tienda.correo }}
                </dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wide text-neutral-400 mb-1">
                  región
                </dt>
                <dd class="font-semibold text-neutral-800">
                  {{ tienda.categoria || 'No especificada' }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h2 class="font-display text-2xl font-bold text-neutral-900 mb-4">
              Redes sociales
            </h2>
            <div class="flex gap-4">
              <SocialIconsView :redes="redesSociales" tamano="lg" coloreado />
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="lg:sticky lg:top-24">
            <div class="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-xl bg-[#00a6db] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                    <path
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z">
                    </path>
                  </svg>
                </div>
                <div>
                  <h2 class="font-display text-xl font-bold text-neutral-900 leading-tight">
                    Contáctanos
                  </h2>
                  <p class="text-xs text-neutral-500">
                    Te respondemos en menos de 24h
                  </p>
                </div>
              </div>
              <p class="text-neutral-500 mb-6 text-sm">
                Completa el formulario y nos pondremos en contacto con la tienda
                <strong>{{ tienda.nombre }}</strong>.
              </p>

              <form id="contact-form" class="space-y-4" @submit.prevent="enviarFormulario">
                <div>
                  <label for="nombre" class="block text-sm font-medium text-neutral-700 mb-1">Razón social / Nombre
                    comercial</label>
                  <input id="nombre" v-model="form.nombre" type="text" placeholder="Tu nombre completo"
                    class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition" />
                </div>
                <div>
                  <label for="celular" class="block text-sm font-medium text-neutral-700 mb-1">Celular *</label>
                  <input id="celular" v-model="form.celular" type="tel" required maxlength="9" pattern="9[0-9]{8}"
                    placeholder="999 999 999"
                    class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition" />
                </div>
                <div>
                  <label for="correo" class="block text-sm font-medium text-neutral-700 mb-1">Correo electrónico</label>
                  <input id="correo" v-model="form.correo" type="email" placeholder="tucorreo@ejemplo.com"
                    class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition" />
                </div>
                <div>
                  <label for="producto" class="block text-sm font-medium text-neutral-700 mb-1">Producto de interés
                    *</label>
                  <input id="producto" v-model="form.producto" type="text" required
                    placeholder="Ej: Vino tinto, Lavadora..."
                    class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#00a6db] focus:ring-2 focus:ring-[#00a6db]/20 outline-none transition" />
                </div>
                <button id="btn-enviar" type="submit" :disabled="enviando"
                  class="w-full bg-[#00a6db] hover:bg-[#0090bd] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
                </button>
                <p id="form-mensaje" :class="[
                  'text-sm text-center',
                  contactoEnviado
                    ? mensajeContacto.startsWith('Mensaje enviado')
                      ? 'text-emerald-600'
                      : 'text-red-500'
                    : 'hidden',
                ]">
                  {{ mensajeContacto }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
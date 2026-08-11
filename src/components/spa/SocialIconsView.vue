<script setup>
const props = defineProps({
  redes: { type: Object, default: () => ({}) },
  tamano: { type: String, default: 'sm' },
  coloreado: { type: Boolean, default: false },
  circulos: { type: Boolean, default: false },
});

const tamanos = {
  sm: { icono: 'w-4 h-4', circulo: 'w-8 h-8' },
  md: { icono: 'w-5 h-5', circulo: 'w-10 h-10' },
  lg: { icono: 'w-7 h-7', circulo: 'w-12 h-12' },
};
const t = tamanos[props.tamano] ?? tamanos.sm;
const claseIcono = t.icono;
const claseCirculo = t.circulo;

const colores = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  tiktok: '#000000',
  whatsapp: '#25D366',
};

const fill = (red) => (props.coloreado ? colores[red] : 'currentColor');
</script>

<template>
  <div class="flex items-center gap-3">
    <a
      v-if="redes.facebook"
      :href="redes.facebook"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      class="hover:opacity-80 transition-opacity shrink-0"
    >
      <span
        v-if="circulos"
        :class="`flex items-center justify-center rounded-full text-white shadow-sm ${claseCirculo}`"
        :style="{ backgroundColor: colores.facebook }"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" :class="claseIcono">
          <path
            d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"
          />
        </svg>
      </span>
      <svg v-else :fill="fill('facebook')" viewBox="0 0 24 24" :class="claseIcono">
        <path
          d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"
        />
      </svg>
    </a>

    <a
      v-if="redes.instagram"
      :href="redes.instagram"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      class="hover:opacity-80 transition-opacity shrink-0"
    >
      <span
        v-if="circulos"
        :class="`flex items-center justify-center rounded-full text-white shadow-sm ${claseCirculo}`"
        :style="{ backgroundColor: colores.instagram }"
      >
        <svg viewBox="0 0 448 512" fill="currentColor" :class="claseIcono">
          <path
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
          />
        </svg>
      </span>
      <svg v-else :fill="fill('instagram')" viewBox="0 0 448 512" :class="claseIcono">
        <path
          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        />
      </svg>
    </a>

    <a
      v-if="redes.tiktok"
      :href="redes.tiktok"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      class="hover:opacity-80 transition-opacity shrink-0"
    >
      <span
        v-if="circulos"
        :class="`flex items-center justify-center rounded-full text-white shadow-sm ${claseCirculo}`"
        :style="{ backgroundColor: colores.tiktok }"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" :class="claseIcono">
          <path
            d="M16.6 5.8a4.3 4.3 0 0 1-2.6-2.6h-2.7v11.5a2.6 2.6 0 1 1-1.8-2.5V9.3a5.4 5.4 0 1 0 4.5 5.4V9.1a6.9 6.9 0 0 0 3.9 1.2V7.6a4.3 4.3 0 0 1-1.3-1.8z"
          />
        </svg>
      </span>
      <svg v-else :fill="fill('tiktok')" viewBox="0 0 24 24" :class="claseIcono">
        <path
          d="M16.6 5.8a4.3 4.3 0 0 1-2.6-2.6h-2.7v11.5a2.6 2.6 0 1 1-1.8-2.5V9.3a5.4 5.4 0 1 0 4.5 5.4V9.1a6.9 6.9 0 0 0 3.9 1.2V7.6a4.3 4.3 0 0 1-1.3-1.8z"
        />
      </svg>
    </a>

    <a
      v-if="redes.whatsapp"
      :href="`https://wa.me/${redes.whatsapp}`"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      class="hover:opacity-80 transition-opacity shrink-0"
    >
      <span
        v-if="circulos"
        :class="`flex items-center justify-center rounded-full text-white shadow-sm ${claseCirculo}`"
        :style="{ backgroundColor: colores.whatsapp }"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" :class="claseIcono">
          <path
            d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.3.1-.2 0-.4 0-.5L8.7 8.4c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
          />
        </svg>
      </span>
      <svg v-else :fill="fill('whatsapp')" viewBox="0 0 24 24" :class="claseIcono">
        <path
          d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.3.1-.2 0-.4 0-.5L8.7 8.4c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
        />
      </svg>
    </a>
  </div>
</template>
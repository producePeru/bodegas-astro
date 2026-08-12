<script setup>
defineProps({
  abierto: { type: Boolean, default: false },
});

const emit = defineEmits(['cerrar']);

function cerrar() {
  emit('cerrar');
}

function verMypes() {
  emit('cerrar');
  document.getElementById('grid-marcas')?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="">
      <div v-if="abierto" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="modal-fondo fixed inset-0"></div>

        <div class="flotante" aria-hidden="true">🛍️</div>
        <div class="flotante" aria-hidden="true">🔎</div>
        <div class="flotante" aria-hidden="true">❤️</div>
        <div class="flotante" aria-hidden="true">🤝</div>
        <div class="flotante" aria-hidden="true">👕</div>
        <div class="flotante" aria-hidden="true">✨</div>

        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animated-card"
          role="dialog" aria-modal="true" aria-labelledby="welcome-title">
          <div class="gonzi-barra"></div>

          <button
            class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-[#e31d1a] hover:text-white text-stone-400 transition-colors"
            aria-label="Cerrar" @click="cerrar">✕</button>

          <div class="p-6 pt-8 text-left">
            <div class="font-display text-2xl md:text-3xl leading-tight font-extrabold gradient-titulo"
              id="welcome-title">🛍️ Descubre. Elige. Conecta.</div>
            <p class="mt-2 text-sm text-stone-500">
              Conoce los productos de nuestras MYPE y conecta directamente con quienes los hacen posibles.
            </p>

            <div class="mt-5 space-y-3">
              <div class="flex gap-3 items-start">
                <span class="step-badge">🔎</span>
                <div>
                  <p class="text-sm font-bold text-stone-800">1. DESCUBRE</p>
                  <p class="text-[13px] text-stone-500 leading-snug mt-0.5">
                    Explora las MYPE participantes y encuentra el producto que más te guste.
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start">
                <span class="step-badge">❤️</span>
                <div>
                  <p class="text-sm font-bold text-stone-800">2. ELIGE</p>
                  <p class="text-[13px] text-stone-500 leading-snug mt-0.5">
                    Ingresa a la MYPE que te interesa, conoce sus productos y descubre más sobre su emprendimiento.
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start">
                <span class="step-badge">🤝</span>
                <div>
                  <p class="text-sm font-bold text-stone-800">3. CONECTA</p>
                  <p class="text-[13px] text-stone-500 leading-snug mt-0.5">
                    Déjanos tus datos y la MYPE se pondrá en contacto contigo para brindarte más información.
                  </p>
                </div>
              </div>
            </div>

            <p class="mt-5 text-center text-[13px] font-semibold text-[#00a1d4]">
              Tu elección impulsa a una MYPE.
            </p>
            <p class="mt-1 text-center text-[11px] text-stone-400 italic">
              Al registrarte, recibirás en tu correo la información y los canales de contacto de la MYPE que elegiste.
            </p>

            <button class="mt-5 w-full py-3 rounded-full font-bold text-white text-base boton-mypes"
              @click="verMypes">Ver MYPEs</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fondo {
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 161, 212, 0.35), transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(227, 29, 26, 0.35), transparent 45%),
    rgba(15, 23, 42, 0.85);
  animation: pulso-fondo 5s ease-in-out infinite;
}

@keyframes pulso-fondo {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.85;
  }
}

.animated-card {
  animation: entrada-carta 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes entrada-carta {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.6) rotate(-2deg);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
}

.gonzi-barra {
  height: 6px;
  background: linear-gradient(90deg, #00a1d4, #7ac943, #f7b500, #e31d1a, #00a1d4);
  background-size: 300% 100%;
  animation: barra-mover 6s linear infinite;
}

@keyframes barra-mover {
  from {
    background-position: 0% 0;
  }

  to {
    background-position: 300% 0;
  }
}

.gradient-titulo {
  background-image: linear-gradient(90deg, #00a1d4, #0f7bc6, #e31d1a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: brillo 4s ease-in-out infinite;
}

@keyframes brillo {

  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(0, 161, 212, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(0, 161, 212, 0.45));
  }
}

.step-badge {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 12px;
  background: linear-gradient(145deg, #f0fbff, #e6f6ff);
  border: 1px solid rgba(0, 161, 212, 0.25);
  animation: float 3s ease-in-out infinite;
}

.step-badge:nth-child(2) {
  animation-delay: 0.3s;
}

.step-badge:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.boton-mypes {
  /* background-image: linear-gradient(90deg, #00a1d4, #0f8fd4, #e31d1a); */
  background-color: #00a1d4;
  background-size: 200% 100%;
  animation: boton-grad 4s ease infinite, boton-glow 2.2s ease-in-out infinite;
  transition: transform 0.2s ease;
}

.boton-mypes:hover {
  transform: scale(1.04);
  animation: boton-grad 4s ease infinite, boton-glow 1s ease-in-out infinite;
}

@keyframes boton-grad {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes boton-glow {

  0%,
  100% {
    box-shadow: 0 0 0 rgba(0, 161, 212, 0);
  }

  50% {
    box-shadow: 0 0 22px rgba(0, 161, 212, 0.55);
  }
}

.flotante {
  position: absolute;
  z-index: 5;
  opacity: 0;
  font-size: 30px;
  pointer-events: none;
  animation: emoji-flotante 6s ease-in-out infinite;
}

.flotante:nth-child(2) {
  top: 6%;
  left: 8%;
  animation-delay: 0s;
}

.flotante:nth-child(3) {
  top: 15%;
  right: 10%;
  animation-delay: 1s;
}

.flotante:nth-child(4) {
  bottom: 25%;
  left: 7%;
  animation-delay: 2s;
}

.flotante:nth-child(5) {
  bottom: 30%;
  right: 8%;
  animation-delay: 3s;
}

.flotante:nth-child(6) {
  top: 40%;
  left: 45%;
  animation-delay: 4s;
}

.flotante:nth-child(7) {
  bottom: 5%;
  right: 40%;
  animation-delay: 5s;
}

@keyframes emoji-flotante {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.6);
  }

  20%,
  80% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.4) rotate(10deg);
  }
}

.modal-enter-active {
  transition: opacity 0.4s ease;
}

.modal-enter-active .animated-card {
  animation-duration: 0.8s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
<template>
  <Teleport v-if="open" to="body">
    <div class="modal__blackout" @click="doClose" @keydown="doClose"></div>
    <div class="modal__content">
      <button class="modal__btn" @click="doClose">X</button>
      <slot></slot>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    open: { type: Boolean },
  },
  methods: {
    doClose() {
      this.$emit('update:open', false);
    },
  },
};
</script>

<style scoped>
.modal__content {
  position: absolute;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  max-width: 1200px;
}

.modal__blackout {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.5;
}

.modal__btn {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  background: none;
  width: 50px;
  height: 50px;
  transition: .3s;
  border: none;
}

.modal__btn:hover {
  background: #9eff00;
}
</style>

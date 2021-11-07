<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="blackout"></div>
    <div class="modal" @click.prevent="doClsoe">
      <div class="modal__content">
        <button class="modal__close">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import useModal from "@/hooks/useModal.js";

export default defineComponent({
  props: {
    open: Boolean,
  },
  setup(props, { emit }) {
    const { doOpenModal, doCloseModal } = useModal();

    const contentElement = ref(null);

    const onOutsideClick = ($event) => {
      if (
        $event.target !== contentElement.value &&
        $event.target.contains(contentElement.value)
      ) {
        doClsoe();
      }
    };
    const doClsoe = () => {
      emit("update:open", false);
      doCloseModal();
    };

    if (props.open) {
      doOpenModal;
    }

    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          doOpenModal();
        } else if (!isOpen) {
          doCloseModal();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      doClsoe,
      onOutsideClick,
    };
  },
});
</script>

<style scoped>
.blackout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: rgb(0, 0, 0);
  z-index: 1010;
}

.modal {
  overflow: scroll;
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 1010;
}

.modal__content {
  position: relative;
  max-width: 1000px;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  padding: 20px;
}

.modal__close {
  position: absolute;
  right: -10px;
  top: -10px;
}
</style>

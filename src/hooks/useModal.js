import {
  ref,
  getCurrentInstance,
  computed,
  watch
} from 'vue'

const openModalsCounts = ref(new Set());

export default function() {
  const uid = getCurrentInstance().uid;
  const isOpen = ref(false)

  const doOpenModal = () => {
    isOpen.value = true;
    openModalsCounts.value.add(uid);
  };
  const doCloseModal = () => {
    isOpen.value = false;
    openModalsCounts.value.delete(uid);
  };

  const isSomeOpen = computed(() => {
    return !!openModalsCounts.value.size
  });

  const checkBlakoutState = () => {
    if (!isSomeOpen.value) {
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
    } else if (isSomeOpen.value) {
      document.body.style.paddingRight =
        `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  }

  watch(isSomeOpen, () => {
    checkBlakoutState()
  })

  return {
    doOpenModal,
    doCloseModal
  }
}

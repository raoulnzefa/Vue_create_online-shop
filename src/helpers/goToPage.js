import eventsBus from '@/eventsBus';

export default function goToPage(pageName, pageParams) {
  eventsBus.$emit('goToPage', pageName, pageParams);
}
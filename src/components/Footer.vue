<template>
  <v-footer v-if="content">
    <v-spacer></v-spacer>
    <div v-html="content"></div>
    <v-spacer></v-spacer>
  </v-footer>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});
</script>
  
<style lang="scss" scoped>

</style>
  
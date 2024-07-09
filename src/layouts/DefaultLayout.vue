<template>

  <div class="app-wrapper">

    <Calendar :eventStyles="eventStylesInstance1" />

  </div>

</template>

<script setup>
import Calendar from '@/views/Calendar.vue';

const eventStylesInstance1 = {
  'd6ef1e8d-c49f-4231-91cb-c3363a943fd8': {
    class: 'holiday',
    style: 'background-color: yellow',
    title: (name) => `<b>${name}</b>`,
    additionalElements: '<p class="py-2 px-4">This is a holiday event!</p>'
  },
  '4d115ae7-ef38-45b7-baf3-8fd9e080a596': {
    class: 'conference',
    style: 'font-weight: bold;',
    title: (name) => `${name} ★`,
    additionalElements: '<p class="py-2 px-4">Conference details here</p>'
  }
};

const eventStylesInstance2 = {
  'd6ef1e8d-c49f-4231-91cb-c3363a943fd8': {
    class: 'holiday',
    style: 'background-color: lightblue',
    title: (name) => `<i>${name}</i>`,
    additionalElements: '<p>This is a holiday event!</p>'
  },
  '4d115ae7-ef38-45b7-baf3-8fd9e080a596': {
    class: 'conference',
    style: 'font-weight: bold; color: red;',
    title: (name) => `<u>${name}</u> ★`,
    additionalElements: '<p>Conference details here</p>'
  }
};

</script>


<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: -moz-available; /* WebKit-based browsers will ignore this. */
  min-height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  min-height: 100vh;
}
</style>

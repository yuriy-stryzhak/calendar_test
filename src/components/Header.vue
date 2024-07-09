<template>
  <v-toolbar class="header"> 
    <v-toolbar-title>Календар подій</v-toolbar-title>
    <v-spacer></v-spacer>
    Фільтри:
    <DatePicker v-model="date" class="date-picker" @update:modelValue="onDateChange" />

    <v-select
      v-model="selectedCategory"
      :items="categories"
      label="Категорія"
      multiple
      chips
      hide-details="true"
      variant="outlined"
      closable-chips
      class="category-selector"
      @change="onCategoryChange"
    ></v-select>
    
  </v-toolbar>
</template>

<script setup>
import { computed, ref, watch, defineEmits } from 'vue';
import { useEventStore } from '@/store/store';
import DatePicker from "@/components/UI/Datepicker";

const selectedDate = ref(new Date());
const selectedCategory = ref([]);
const eventStore = useEventStore();
const categories = eventStore.categories;

const emit = defineEmits(['date-changed', 'category-changed']);

const date = computed({
  get() {
    return selectedDate.value;
  },
  set(newVal) {
    selectedDate.value = newVal;
  },
});

const onDateChange = (newVal) => {
  selectedDate.value = newVal;
  emit('date-changed', newVal);
};

const onCategoryChange = () => {
  emit('category-changed', selectedCategory.value);
};

watch(selectedCategory, onCategoryChange);

</script>

<style lang="scss" scoped>
.header {
  padding: 16px;
  :deep(.v-toolbar__content) {
    gap: 24px;
  }
}
.date-picker {
  flex-grow: 1;
  max-width: 234px;
}

.category-selector {
  max-width: 500px;
}

</style>

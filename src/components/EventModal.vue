<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center pt-5">
        <span class="headline">Створити подію</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field 
            label="Назва"
            v-model="eventData.name"
            :rules="[rules.required]"
            :error="showErrors && !eventData.name"
            required
            class="mb-3"
          ></v-text-field>
          <v-select
            v-model="eventData.categoryId"
            :items="categories"
            label="Категорія"
            :rules="[rules.required]"
            :error="showErrors && !eventData.categoryId"
            required
            class="mb-3"
          ></v-select>

          <DatePicker v-model="eventData.startDate" class="mb-7" />

          <DatePicker v-model="eventData.endDate" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Відміна</v-btn>
        <v-btn color="blue darken-1" text @click="validateAndCreateEvent">Зберегти</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification'
import DatePicker from "@/components/UI/Datepicker";
import { useEventStore } from '@/store/store';

const toast = useToast()

const show = ref(false);
const eventData = ref({
  name: '',
  categoryId: null,
  startDate: new Date(),
  endDate: new Date(),
});
const showErrors = ref(false);

const eventStore = useEventStore();
const categories = eventStore.categories;

const rules = {
  required: value => !!value || 'Це поле обов\'язкове',
};

const open = () => {
  show.value = true;
  showErrors.value = false;
};

const close = () => {
  show.value = false;
  showErrors.value = false;
};

const resetForm = () => {
  eventData.value = {
    name: '',
    categoryId: null,
    startDate: new Date(),
    endDate: new Date(),
  };
};

const validateAndCreateEvent = async () => {
  showErrors.value = true;

  // Manually validate each field
  const isValid = !!eventData.value.name && !!eventData.value.categoryId;

  if (isValid) {
    // Convert dates to ISO string format
    const formattedEventData = {
      ...eventData.value,
      startDate: new Date(eventData.value.startDate).toISOString(),
      endDate: new Date(eventData.value.endDate).toISOString(),
    };

    await eventStore.createEvent(formattedEventData);
    toast.success(`Подію "${formattedEventData.name}" створено`);
    close();
    resetForm();
  }
};

defineExpose({
  open,
});
</script>

<style scoped>
</style>

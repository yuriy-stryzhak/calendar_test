<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      v-model="menu"
      class="date-picker"
      min-width="auto"
    >
      <template v-slot:activator="{ on, props }">
        <v-text-field
          v-model="dateRangeText"
          :label="label"
          hint="MM/DD/YYYY format"
          :loading="loading"
          :disabled="disabled"
          readonly
          variant="outlined"
          hide-details
          v-bind="props"
          v-on="{ ...on }"
          class="date-picker"
        >
          <template v-slot:append-inner>
            <v-icon color="grayMiddle" @click.stop="menu = !menu" size="20">mdi-calendar-blank</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        show-adjacent-months
        :active="activePicker"
        v-model="tempDate"
        :max="max"
        :min="min"
        color="primary"
        hide-header
        max-width="100%"
      >
        <template v-slot:actions>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="confirmDate"
          >
            Ok
          </v-btn>
        </template>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import { useDate } from 'vuetify';

const adapter = useDate();

// Props definition using defineProps
const props = defineProps({
  modelValue: {
    type: [String, Array, Date],
    required: true,
  },
  label: String,
  activePicker: String,
  min: String,
  max: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// Reactive state
const menu = ref(false);
const tempDate = ref(props.modelValue);
const innerDate = ref(props.modelValue);

const emits = defineEmits(['update:modelValue']);

// Computed property
const dateRangeText = computed(() => {
  return innerDate.value ? transformDateFormat(innerDate.value) : '';
});

// Watcher (if needed, to react on 'value' prop changes)
watch(() => props.modelValue, (newValue) => {
  innerDate.value = newValue;
  tempDate.value = newValue;
});

// Methods
function transformDateFormat(dateString) {
  const dateObject = new Date(dateString);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${day}.${month}.${year}`;
}

function confirmDate() {
  innerDate.value = tempDate.value; // Update the local state
  emits('update:modelValue', tempDate.value); // Emit the changes to the parent
  menu.value = false; // Close the menu
}
</script>


<style lang="scss">

  .date-picker {

      .datepicker {
        max-width: 234px;
      }

      .v-date-picker-month__day {
        @media screen and (max-width: 767px) {
          width: 40px;
          height: 40px;
        }
      }

      .v-field {

        &:hover {
          .v-field__outline {
            --v-field-border-opacity: 0.3;
          }
        }
      }

      .v-field__outline {
        --v-field-border-opacity: 0.15;
      }
  }
  
</style>

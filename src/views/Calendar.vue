<template>
    <div class="calendar">
      <Header @date-changed="fetchEventsByDate" @category-changed="fetchEventsByCategory" class="mb-5" />

      <div class="calendar__actions">
        <v-btn 
            color="primary" 
            @click="showEventModal"
            size="large"
        >Створити подію</v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col v-for="event in filteredEvents" :key="event.id" class="calendar__col">
            <v-card variant="tonal" :class="eventClass(event)" :style="eventStyle(event)">
              <v-card-title v-html="getEventTitle(event)"></v-card-title>
              <v-card-subtitle class="pb-2 calendar__subtitle">{{ new Date(event.startDate).toLocaleDateString() }} - {{ new Date(event.endDate).toLocaleDateString() }}</v-card-subtitle>
              <div v-html="getEventAdditionalElements(event)"></div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <Footer :content="footerContent" class="calendar__footer" />
      <EventModal ref="eventModal" @event-created="fetchEvents" />
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted, watch } from 'vue';
  import { useEventStore } from '@/store/store';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import EventModal from '@/components/EventModal.vue';
  
  const eventStore = useEventStore();
  const events = ref(eventStore.events);
  const footerContent = ref('<p>Footer html content...</p>');

  const eventModal = ref(null);

  const selectedDate = ref(new Date());
  const selectedCategory = ref([]);
  
  const fetchEvents = async () => {
    await eventStore.fetchEvents();
  };

  const fetchEventsByDate = async (date) => {
    selectedDate.value = date;
    await eventStore.fetchEvents();
  };

  const fetchEventsByCategory = async (categories) => {
    selectedCategory.value = categories;
    await eventStore.fetchEvents();
  };

  const filteredEvents = computed(() => {
    return events.value
        .filter(event => {
        const eventDate = new Date(event.startDate);
        const isSameMonth = eventDate.getMonth() === selectedDate.value.getMonth();
        const isSameYear = eventDate.getFullYear() === selectedDate.value.getFullYear();
        const isCategoryMatch = selectedCategory.value.length === 0 || selectedCategory.value.includes(event.categoryId);
        return isSameMonth && isSameYear && isCategoryMatch;
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sort by start date
  });
  
  
  const showEventModal = () => {
      if (eventModal.value && typeof eventModal.value.open === 'function') {
        eventModal.value.open();
    } else {
      console.error("Event modal is not available or does not have an open method");
    }
  };
  
  // Props to accept custom styles and elements for different categories
    const props = defineProps({
        eventStyles: {
            type: Object,
            required: true
        }
    });

    const eventClass = (event) => {
        const categoryId = event.categoryId;
        return props.eventStyles[categoryId]?.class || '';
    };

    const eventStyle = (event) => {
        const categoryId = event.categoryId;
        return props.eventStyles[categoryId]?.style || {};
    };

    const getEventTitle = (event) => {
        const categoryId = event.categoryId;
        return props.eventStyles[categoryId]?.title?.(event.name) || event.name;
    };

    const getEventAdditionalElements = (event) => {
        const categoryId = event.categoryId;
        return props.eventStyles[categoryId]?.additionalElements || '';
    };
  
    // Watch for changes in the store's events
    watch(() => eventStore.events, (newEvents) => {
        events.value = newEvents;
    });

  onMounted(() => {
    fetchEvents();
  });
  </script>
  
  <style lang="scss" scoped>
    .calendar {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        &__footer {
            margin-top: auto;
            flex-grow: 0;
        }

        &__actions {
            text-align: right;
            padding: 0 16px;
            margin-bottom: 40px;
        }

        .teaching {
            background-color: #7eddf7;
        }
        .holiday {
            background-color: #f3f77e;
        }
        .conference {
            background-color: #7ef7c1;
        }

        &__col {
            max-width: 350px;
        }
    }
  </style>
  
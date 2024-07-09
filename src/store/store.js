
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_DOMEN;

const token = `Bearer ${import.meta.env.VITE_TOKEN}`;

export const useEventStore = defineStore('eventStore', () => {
 
    const events =  ref([]),
          categories = [
            { title: 'Конференція', value: '4d115ae7-ef38-45b7-baf3-8fd9e080a596' },
            { title: 'Свято', value: 'd6ef1e8d-c49f-4231-91cb-c3363a943fd8' },
            { title: 'Навчання', value: '23585758-9bdc-4d54-8b98-670c6f1dda5f' },
          ];


    const fetchEvents = async() => {
      try {
        const response = await axios.get(`${baseURL}/api/Event/All`, {
          headers: {
            Authorization: token,
          },
        });
        events.value = response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    const createEvent= async(eventData) => {
      try {
        await axios.post(`${baseURL}/api/Event/Create`, eventData, {
          headers: {
            Authorization: token,
          },
        });
        fetchEvents();
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }

    return {
      events,
      categories,
      fetchEvents,
      createEvent
    }

})

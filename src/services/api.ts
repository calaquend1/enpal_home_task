import axios from "axios";


const api = axios.create({
    baseURL: "/",
    headers: { "Content-Type": "application/json" },
  });

// Function to fetch available slots for a given date
export const getAvailableSlots = async (date: string) => {
  const response = await api.get(`/slots?date=${date}`);
  return response.data;
};

export const getAllSlots = async () => {
  const response = await api.get(`/slots`);
  return response.data;
};

// Function to book a slot with a given slot ID and customer name
export const bookSlot = async (slotId: string, name: string) => {
  const response = await api.post(`/slots/${slotId}/book`, { name });
  return response.data;
};

// Function to cancel an existing booking by its booking ID
export const cancelBooking = async (slotId: string) => {
  const response = await api.post(`/slots/${slotId}/cancel-booking`);
  return response.data;
};

export default api;
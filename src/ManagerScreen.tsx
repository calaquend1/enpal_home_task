import React, { useEffect, useState } from "react";
import { getAvailableSlots, cancelBooking } from "./services/api";

// Define Slot type
type Slot = {
  id: string;
  startDate: string;
  bookedCustomerName: string;
};

function ManagerScreen() {
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);

  useEffect(() => {
    getAvailableSlots("2024-08-01").then((res) => {
      const filteredSlots = res.data.filter((slot: Slot) => slot.bookedCustomerName);
      setBookedSlots(filteredSlots);
    }).catch(console.error);
  }, []);

  const handleCancelBooking = (slotId: string) => {
    cancelBooking(slotId)
      .then(() => {
        alert("Booking cancelled!");
        setBookedSlots(prevSlots => prevSlots.filter(slot => slot.id !== slotId));
      })
      .catch((error) => {
        alert(`Failed to cancel booking: ${error.response?.data?.message || "Unknown error"}`);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Booked Slots</h1>
      <table style={{ margin: "auto", borderCollapse: "collapse", width: "80%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Time</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Customer</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedSlots.map((slot) => (
            <tr key={slot.id}>
              <td style={{ border: "1px solid black", padding: "10px" }}>{new Date(slot.startDate).toLocaleDateString()}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{new Date(slot.startDate).toLocaleTimeString()}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{slot.bookedCustomerName}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <button onClick={() => handleCancelBooking(slot.id)} style={{ background: "red", color: "white", padding: "5px" }}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerScreen;

import React, { useEffect, useState } from "react";
import { getAvailableSlots, bookSlot, cancelBooking } from "./services/api";

// Define Slot type
type Slot = {
  id: string;
  startDate: string;
  isBooked: boolean;
  bookedCustomerName?: string;
};

function CustomerScreen() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedBookedSlot, setSelectedBookedSlot] = useState<Slot | null>(null);
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("2024-08-01");

  useEffect(() => {
    if (!selectedDate) return;
    getAvailableSlots(selectedDate).then((res) => {
      setSlots(res.data);
    }).catch(console.error);
  }, [selectedDate]);

  const handleBooking = () => {
    if (!selectedSlot || !userName.trim()) {
      alert("Please enter your name.");
      return;
    }
  
    bookSlot(selectedSlot.id, userName)
      .then((res) => {
        alert("Slot booked successfully!");
        setSelectedSlot(null);
        setUserName("");
        getAvailableSlots(selectedDate).then((res) => setSlots(res.data));
      })
      .catch((error) => {
        alert(`Failed to book slot: ${error.response?.data?.message || "Unknown error"}`);
      });
  };

  const handleCancelBooking = () => {
    if (!selectedBookedSlot) return;

    cancelBooking(selectedBookedSlot.id)
      .then(() => {
        alert("Booking cancelled!");
        setSelectedBookedSlot(null);
        getAvailableSlots(selectedDate).then((res) => setSlots(res.data));
      })
      .catch((error) => {
        console.error("Cancel error:", error.response?.data || error.message);
        alert(`Failed to cancel booking: ${error.response?.data?.message || "Unknown error"}`);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Available Slots</h1>
      <label>
        Select Date: 
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
        {slots.map((slot) => (
          <button
            data-testid={slot.isBooked ? `booked-slot-${slot.id}` : `slot-${slot.id}`}
            key={slot.id}
            onClick={() => slot.isBooked ? setSelectedBookedSlot(slot) : setSelectedSlot(slot)}
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid black",
              borderRadius: "5px",
              cursor: slot.isBooked ? "pointer" : "pointer",
              background: slot.isBooked ? "#d3d3d3" : "#f0f0f0",
              color: slot.isBooked ? "#777" : "black",
            }}
          >
            {new Date(slot.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            {slot.isBooked && " (Booked)"}
          </button>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedSlot && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)"
        }}>
          <h2>Book this slot?</h2>
          <p><strong>Time:</strong> {new Date(selectedSlot.startDate).toLocaleTimeString()}</p>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ padding: "5px", marginBottom: "10px", display: "block", width: "100%" }}
          />
          <button onClick={() => setSelectedSlot(null)}>Cancel</button>
          <button style={{ marginLeft: "10px" }} onClick={handleBooking}>Book</button>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {selectedBookedSlot && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)"
        }}>
          <h2>{new Date(selectedBookedSlot.startDate).toLocaleTimeString(navigator.language, {
  hour: "2-digit",
  minute: "2-digit",
})} Booked</h2>
          <p><strong>Hello {selectedBookedSlot.bookedCustomerName}!</strong></p>
          <p><strong>Date:</strong> {new Date(selectedBookedSlot.startDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(selectedBookedSlot.startDate).toLocaleTimeString()}</p>
          <p><strong>Duration:</strong> 60 minutes</p>
          <button
            style={{ background: "gray", padding: "10px", marginRight: "10px" }}
            onClick={() => setSelectedBookedSlot(null)}
          >
            Back
          </button>
          <button
            style={{ background: "orange", padding: "10px", marginRight: "10px" }}
            onClick={handleCancelBooking}
          >
            Cancel booking
          </button>
          <button
            style={{ background: "blue", color: "white", padding: "10px" }}
            onClick={() => alert("Joining call...")}
          >
            Join your call
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerScreen;
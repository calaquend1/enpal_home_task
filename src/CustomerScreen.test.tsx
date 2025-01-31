import { render, screen, fireEvent, act } from "@testing-library/react";
import CustomerScreen from "./CustomerScreen";
import { getAvailableSlots, bookSlot, cancelBooking } from "./services/api";
import '@testing-library/jest-dom';
import React from "react";

jest.mock("./services/api");
global.alert = jest.fn(); // Mock window.alert
jest.mock("axios", () => ({
    create: () => ({
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    }),
  }));
// Mock API responses
const mockSlots = [
    {
      id: "1",
      startDate: new Date("2024-08-01T10:00:00.000Z").toLocaleString("de-DE", {
        timeZone: "UTC",
      }),
      isBooked: false,
    },
    {
      id: "2",
      startDate: new Date("2024-08-01T11:00:00.000Z").toLocaleString("de-DE", {
        timeZone: "UTC",
      }),
      isBooked: true,
      bookedCustomerName: "John Doe",
    },
  ];

describe("CustomerScreen", () => {
    beforeEach(() => {
        (getAvailableSlots as jest.Mock).mockResolvedValue({
          data: mockSlots,
        });
      
        (bookSlot as jest.Mock).mockResolvedValue({ success: true });
        (cancelBooking as jest.Mock).mockResolvedValue({ success: true });
      });

    test("renders available slots", async () => {
        await act(async () => render(<CustomerScreen />))
        const slotButton = await screen.findByText("10:00");
        await act(async () => fireEvent.click(slotButton));
        expect(screen.getByText("11:00 (Booked)")).toBeInTheDocument();
        expect(screen.getByText("10:00")).toBeInTheDocument();
    });

    test("opens booking modal when clicking an available slot", async () => {
        await act(async () => render(<CustomerScreen />))
        const slotButton = await screen.findByText("10:00");
        await act(async () => fireEvent.click(slotButton));
        expect(screen.getByText("Book this slot?"));
    });

    test("books a slot successfully", async () => {
        await act(async () => render(<CustomerScreen />))
        const slotButton = await screen.findByText("10:00");
        await act(async () => fireEvent.click(slotButton));
        const input = screen.getByPlaceholderText("Your Name");
        await act(async () => fireEvent.change(input, { target: { value: "Alice" } }));
        await act(async () => fireEvent.click(screen.getByText("Book")));
        expect(bookSlot).toHaveBeenCalledWith("1", "Alice");
    });

    test("opens cancel booking modal when clicking a booked slot", async () => {
        await act(async () => render(<CustomerScreen />))
        const bookedSlotButton = await screen.findByText("11:00 (Booked)");
        await act(async () => fireEvent.click(bookedSlotButton));
        expect(screen.getByText("Hello John Doe!"));
    });

    test("cancels a booking successfully", async () => {
        await act(async () => render(<CustomerScreen />))
        const bookedSlotButton = await screen.findByTestId("booked-slot-2");
        expect(bookedSlotButton).not.toBeNull();
        await act(async () => fireEvent.click(bookedSlotButton));
        await act(async () => fireEvent.click(screen.getByText("Cancel booking")));
        expect(cancelBooking).toHaveBeenCalledWith("2");
      });

    test("handles API failure when fetching slots", async () => {
        (getAvailableSlots as jest.Mock).mockRejectedValue(new Error("API error"));
    
        await act(async () => render(<CustomerScreen />));
    
        expect(screen.getByText("Failed to load slots")).toBeInTheDocument();
    });

    test("shows error when booking a slot without a name", async () => {
        await act(async () => render(<CustomerScreen />));
    
        const slotButton = await screen.findByText("10:00");
        await act(() => fireEvent.click(slotButton));
    
        const bookButton = screen.getByText("Book");
        await act(() => fireEvent.click(bookButton));
    
        expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    });

    test("handles API failure when booking a slot", async () => {
        (bookSlot as jest.Mock).mockRejectedValue(new Error("Booking failed"));
    
        await act(async () => render(<CustomerScreen />));
    
        const slotButton = await screen.findByText("10:00");
        await act(() => fireEvent.click(slotButton));
    
        const input = screen.getByPlaceholderText("Your Name");
        await act(() => fireEvent.change(input, { target: { value: "Alice" } }));
    
        await act(() => fireEvent.click(screen.getByText("Book")));
    
        expect(screen.getByText("Failed to book slot: Unknown error")).toBeInTheDocument();
    });

    test("handles API failure when canceling a booking", async () => {
        (cancelBooking as jest.Mock).mockRejectedValue(new Error("Cancel failed"));
    
        await act(async () => render(<CustomerScreen />));
    
        const bookedSlotButton = await screen.findByText("11:00 (Booked)");
        await act(() => fireEvent.click(bookedSlotButton));
    
        await act(() => fireEvent.click(screen.getByText("Cancel booking")));
    
        expect(screen.getByText("Failed to cancel booking: Unknown error")).toBeInTheDocument();
    });

    test("join call button appears for booked slot", async () => {
        await act(async () => render(<CustomerScreen />))
        const bookedSlotButton = await screen.findByText("11:00 (Booked)");
        await act(async () => fireEvent.click(bookedSlotButton));
        expect(screen.getByText("Join your call")).toBeInTheDocument();
    });
});

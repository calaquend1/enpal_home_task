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
        
        // Find all elements with "13:00 (Booked)" and select the first one
        const bookedSlotButton = await screen.findByTestId("booked-slot-2"); // Select slot by test ID

      
        expect(bookedSlotButton).not.toBeNull(); // Ensure there's at least one match
      
        await act(async () => fireEvent.click(bookedSlotButton));
        await act(async () => fireEvent.click(screen.getByText("Cancel booking")));
        expect(cancelBooking).toHaveBeenCalledWith("2");
      });
});

import { render, screen, fireEvent, act } from "@testing-library/react";
import ManagerScreen from "./ManagerScreen";
import { getAvailableSlots, cancelBooking } from "./services/api";
import React from "react";
import '@testing-library/jest-dom';

global.alert = jest.fn(); // Mock window.alert

jest.mock("./services/api");
jest.mock("axios", () => ({
    create: () => ({
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    }),
  }));
// Mock API responses
const mockBookedSlots = [
    { id: "1", startDate: "2024-08-01T10:00:00.000Z", bookedCustomerName: "Alice" },
    { id: "2", startDate: "2024-08-01T11:00:00.000Z", bookedCustomerName: "Bob" },
];

describe("ManagerScreen", () => {
    beforeEach(() => {
        (getAvailableSlots as jest.Mock).mockResolvedValue({ data: mockBookedSlots });
        (cancelBooking as jest.Mock).mockResolvedValue({ success: true });
    });

    test("renders booked slots", async () => {
        await act(async () => render(<ManagerScreen />));
        expect(await screen.findByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    test("cancels a booking successfully", async () => {
        await act(async () => render(<ManagerScreen />));
        const cancelButton = await screen.findAllByText("Cancel");
        await act(async () => fireEvent.click(cancelButton[0]));
        expect(cancelBooking).toHaveBeenCalledWith("1");
    });
});
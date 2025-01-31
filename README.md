# Appointment Booking App

This is a React-based appointment booking system that allows customers to book meetings with sales managers and allows managers to view and cancel appointments.

## Features

- **Customer View**
  - Select a date to see available slots
  - Book a time slot
  - View and cancel existing bookings

- **Manager View**
  - View all booked slots
  - Cancel bookings

- **API Integration**
  - Fetch available slots from the backend
  - Book appointments
  - Cancel appointments

---

## Installation

### Clone the Repository
```sh
git clone https://github.com/calaquend1/enpal_home_task.git
cd enpal_home_task
```

### Install Dependencies
```sh
npm install
```

### Run the API
The API is provided as a Docker container. You need to build and run it:

```sh
cd api/
docker build -t enpal-fe-challenge-api .
docker run --rm -d -p 3000:3000 enpal-fe-challenge-api
```

Verify that the API is running:

- Open [http://localhost:3000/swagger](http://localhost:3000/swagger) to view the API documentation.
- Or open [http://192.168.99.100:3000/swagger](http://192.168.99.100:3000/swagger)
- 
### Run the Application
```sh
npm start
```
The app will be available at `http://localhost:3000` or `http://192.168.99.100:3000/swagger`.

---

## API Configuration

The frontend uses an Axios instance configured with a **proxy**, so requests are correctly forwarded:

```ts
const api = axios.create({
    baseURL: "/",
    headers: { "Content-Type": "application/json" },
});
```

Ensure that the API is running at the correct host.

---

## Running Tests

The application includes unit and integration tests using Jest and React Testing Library.

### Run all tests:
```sh
npm test
```

### Test Cases Covered:
- Fetching available slots.
- Booking a slot.
- Handling booking failures.
- Cancelling a booking.
- Handling API failures.
- Validation for missing customer names.

---

## Trade-offs and Considerations

Due to time constraints, the following trade-offs were made:

- **Styling**: Minimal inline CSS was used instead of a dedicated styling framework.
- **State Management**: `useState` and `useEffect` were used instead of a more complex solution like Redux.
- **Error Handling**: Only basic UI feedback is provided for API failures.
- **No Separation into Reusable Components**: Since there are only two screens (Customer and Manager), I did not extract common UI components (such as modals, buttons, and input fields) into separate reusable components. While this approach reduces maintainability in larger projects, it was acceptable given the limited scope of the task.

### If more time were available:
- A dedicated UI framework (e.g., Material UI) would be implemented.
- More advanced API error handling with retries and user-friendly messages.
- Enhanced unit and integration tests for deeper coverage.

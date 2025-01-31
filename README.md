## Trade-offs Due to Time Constraints

Due to the limited time available for this project, I made several trade-offs to ensure a functional and testable solution within the deadline:

### 1. Minimal UI Design  
- Focused on core functionality rather than styling and animations.  
- A more polished UI could be implemented with additional time.  

### 2. Basic State Management  
- Used React `useState` and `useEffect` instead of a centralized state management solution like Redux or Context API.  
- A centralized state would be preferable for scaling the app.  

### 3. Limited Validation  
- Basic input checks were added (e.g., ensuring a name is entered before booking).  
- Additional validation (e.g., preventing duplicate bookings, handling invalid API responses) could improve robustness.  

### 4. Basic Testing Coverage  
- Core functionalities like **slot booking** and **cancellation** are covered in tests.  
- More complex edge cases and performance tests were deprioritized due to time constraints.  

### 5. Mock API & Simplified Integration  
- API responses were mocked for testing.  
- No additional API error recovery mechanisms were implemented.  

### Improvements with More Time  
If given more time, I would focus on:  
- Enhancing **UX/UI** with better styling and animations.  
- Implementing a more **scalable state management** approach.  
- Expanding **edge case handling** (e.g., preventing duplicate bookings, better error messages).  
- Improving **test coverage** with more complex scenarios.  



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

export const tasks = [
  {
    id: "1",
    title: "Design Sign Up Flow",
    description: "Create a seamless and intuitive sign up flow for new users. This includes designing the registration form, email verification screen, and welcome page. Ensure the flow is minimal with as few steps as possible to reduce drop-off rates and improve conversion.",
  },
  {
    id: "2",
    title: "Build Dashboard UI",
    description: "Develop the main dashboard interface where users can get an overview of their tasks, progress, and upcoming deadlines. The dashboard should display key metrics, recent activity, and quick action buttons in a clean and organized layout.",
  },
  {
    id: "3",
    title: "Set Up Push Notifications",
    description: "Integrate push notifications into the app to remind users of upcoming deadlines and overdue tasks. Configure notification permissions, set up a notification scheduler, and ensure notifications work correctly on both iOS and Android platforms.",
  },
  {
    id: "4",
    title: "Write Unit Tests",
    description: "Write comprehensive unit tests for all core components and utility functions in the codebase. Aim for at least 80% code coverage. Use Jest and React Native Testing Library to simulate user interactions and verify that components behave as expected under different conditions.",
  },
  {
    id: "5",
    title: "Implement Dark Mode",
    description: "Add dark mode support across the entire application. Use the device's system preference to automatically switch between light and dark themes. Ensure all colors, icons, and images are properly adapted so the UI remains readable and visually appealing in both modes.",
  },
  {
    id: "6",
    title: "Integrate REST API",
    description: "Connect the app to the backend REST API to fetch, create, update, and delete tasks in real time. Handle loading states, error responses, and empty states gracefully. Use Axios or the Fetch API and ensure all requests include proper authentication headers.",
  },
  {
    id: "7",
    title: "Design Onboarding Screens",
    description: "Create a three-step onboarding experience that introduces new users to the core features of the app. Each screen should have an illustration, a short headline, and a brief description. Include a skip button and a progress indicator so users know where they are in the flow.",
  },
  {
    id: "8",
    title: "Add Task Categories",
    description: "Allow users to organize their tasks into custom categories such as Work, Personal, Health, and Finance. Each category should have a unique color and icon. Users should be able to filter their task list by category and create new categories from the settings screen.",
  },
  {
    id: "9",
    title: "Optimize App Performance",
    description: "Profile the app using React Native's performance tools and identify bottlenecks causing slow renders or janky animations. Optimize FlatList rendering with proper key extraction, memoize expensive components, and reduce unnecessary re-renders using React.memo and useCallback.",
  },
  {
    id: "10",
    title: "Implement Search Functionality",
    description: "Add a search bar that allows users to quickly find tasks by title or description. The search should be real-time, filtering results as the user types. Highlight matching keywords in the results and show a friendly empty state when no tasks match the search query.",
  },
  {
    id: "11",
    title: "Set Up Authentication",
    description: "Implement user authentication using email and password as well as Google Sign-In. Set up JWT token storage using secure storage, handle token refresh logic, and protect all authenticated routes. Ensure users are redirected to the login screen when their session expires.",
  },
  {
    id: "12",
    title: "Add Due Date Picker",
    description: "Integrate a date and time picker into the task creation flow so users can set due dates for their tasks. Display the due date prominently on the task card and use color coding to indicate tasks that are due today, upcoming, or overdue to help users prioritize their work.",
  },
  {
    id: "13",
    title: "Create Settings Screen",
    description: "Build a settings screen where users can manage their profile, change their password, configure notification preferences, and toggle dark mode. Include an option to export tasks as a CSV file and a button to delete the account with a confirmation prompt before proceeding.",
  },
  {
    id: "14",
    title: "Add Swipe to Delete",
    description: "Implement swipe-to-delete functionality on task list items so users can quickly remove tasks with a left swipe gesture. Show a red delete background as the user swipes and animate the item out of the list smoothly once deleted. Include an undo snackbar for accidental deletions.",
  },
  {
    id: "15",
    title: "Submit App to Store",
    description: "Prepare the app for production release by generating signed builds for both the App Store and Google Play. Write the app store listing including the description, keywords, and screenshots. Complete all review checklists, set up privacy policy links, and submit the app for review.",
  },
];


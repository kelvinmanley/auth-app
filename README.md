# User Authentication App

This authentication app is built using React for the frontend and Google Firebase for the backend API.

## Getting Started

To run this application locally you'll need to have Node.js and NPM installed. This project utilises NPM for its package management.

Steps to run the application:

1. Request environment variables directly from the developer
2. Clone this repo to your local machine
3. Run `npm install` to install all required packages
4. Create an `.env.local` file in the root folder and add the environment variables
5. Run `npm start` to start the server

## Implementation

Since React provides an SPA out of the box, React Router was utilized to provide a page-like structure.

Redux was used as a global provider to manage cross-component state namely for user authentication and the authentication modal. This was especially helpful for providing context to the navigation bar and making it responsive to a user's auth state.

React hooks were used for component state management especially with form handling as these element states did not require being shared across various components and the simplicity of hooks satisfies the requirements with reduced, more straightforward code.

Sass was used for component styling and allowed for uniformity across elements by using its variable and mixins functionality.

The log in / sign up modal was built as a single component which reads the app state and changes accordingly. This was done due to the similarity of these modals in structure and functionality. The password update modal was built as a separate component as its variation seemed to warrant it being its own component however it could be incorporated with a bit of logic refactoring.

Page redirection was added by creating a hook which reads the global auth state on page load and navigates away if the page should not be accessible in the corresponding auth state.

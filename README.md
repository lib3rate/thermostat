# Thermostat

## Description

A front-end client that allows a user to register a thermostat in their unit with the API, change and synchronize modes with the back-end and regulate the desired indoor temperature.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Features

- Mobile-first design.
- A user is able to access the thermostat UI from both mobile and web.
- A user is able to register their thermostat with a home automation backend.
- When users close their session/browser and open it again, they have access to their thermostat that was previously registered
- A user is able to see the current temperature inside the room.
- A user is able to switch the thermostat off.
- A user is able to switch the thermostat to heating mode.
- A user is able to switch the thermostat to cooling mode.
- A user is able to set the desired temperature and set the thermostat to auto mode.
- While thermostat is in an auto mode, a user is able to see if it is either 1) heating if current temperature is less than desired temperature, 2) cooling if desired temperature is less than current temperature or 3) is in stand-by mode if desired temperature is equal to current temperature.
- The thermostat switches between heating and cooling in real time once the current temperature changes.
- A user cannot switch thermostat to cooling if the current outside temperature is below 0˚C.
- If thermostat is 1) in auto mode and 2) the current temperature in the room is above the desired temperature set by a user, 3) and the current outside temperature is below 0˚C, the thermostat goes to stand-by mode instead of cooling.
- Current temperature is equal to average temperature for the last 15 minutes. However, it’s unreasonable to use less than 3 data points to measure the current temperature.

## Screenshots

!["Mobile view"](https://github.com/lib3rate/thermostat/blob/master/public/Mobile%20view.png)

!["Desktop view"](https://github.com/lib3rate/thermostat/blob/master/public/Desktop%20view.png)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the local server using the `npm start` command in your terminal of choice.
- Direct your browser to http://localhost/3000.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# AI Book Reader

This repository contains a React Native mobile app plus two backend services:

- `app/` - the mobile client built with React Native
- `backend/` - a Node.js + Express API server connected to MongoDB
- `python-backend/` - a FastAPI service for auxiliary processing

The current codebase is mostly a scaffold: the mobile app has navigation, auth state, and a PDF picker UI, while both backends currently expose only basic health-style endpoints. There is not yet a full end-to-end book upload or AI processing pipeline.

## Project Overview

The app is structured around a simple authenticated vs public split:

- Logged in users see a bottom-tab app with Home and About screens.
- Logged out users see a Login screen.
- The Home screen includes a document upload widget that lets the user choose a PDF file locally.

At the moment, the auth state is static and the upload flow stops at local file selection. No API calls are wired from the mobile app to either backend.

## Repository Layout

```text
app/
  App.js
  index.js
  src/
    components/UploadFile/
    features/
      About/
      auth/
      hello/
      Home/
    navigation/
    store/
backend/
  server.js
python-backend/
  main.py
```

## Mobile App Architecture

### Entry Points

- [app/index.js](app/index.js) registers the root component with React Native.
- [app/App.js](app/App.js) wraps the app with Redux, safe-area handling, and the route container.

### State Management

The Redux store is defined in [app/src/store/store.js](app/src/store/store.js) and currently includes two slices:

- `hello` from [app/src/features/hello/helloSlice.js](app/src/features/hello/helloSlice.js)
- `auth` from [app/src/features/auth/services/authSlice.js](app/src/features/auth/services/authSlice.js)

The auth slice currently uses static demo values:

- `isLogin` starts as `true`
- `userData` is seeded with placeholder user information
- `authLoading` controls whether the route container shows a loading indicator

### Navigation

Navigation is organized under [app/src/navigation/](app/src/navigation/):

- [app/src/navigation/services/RoutesContainer.js](app/src/navigation/services/RoutesContainer.js) checks `authLoading` and otherwise renders the main navigator.
- [app/src/navigation/view/AppNavigator.js](app/src/navigation/view/AppNavigator.js) conditionally routes to either the authenticated or public flow.
- [app/src/navigation/view/MainTabNavigator.js](app/src/navigation/view/MainTabNavigator.js) defines the logged-in bottom tab layout.
- [app/src/navigation/view/PublicNavigator.js](app/src/navigation/view/PublicNavigator.js) defines the logged-out stack.
- [app/src/navigation/hooks/useAuth.js](app/src/navigation/hooks/useAuth.js) exposes the auth state selectors.

Current route behavior:

- Authenticated flow: Home and About tabs
- Public flow: Login screen

### Screens

- [app/src/features/auth/view/LoginView.js](app/src/features/auth/view/LoginView.js) shows a static login UI and dispatches `setLogin(true)` when the button is pressed.
- [app/src/features/Home/view/HomeView.js](app/src/features/Home/view/HomeView.js) renders a welcome message and the upload section.
- [app/src/features/About/view/AboutView.js](app/src/features/About/view/AboutView.js) shows a short descriptive screen.

### Upload Flow

The upload feature lives under [app/src/components/UploadFile/](app/src/components/UploadFile/):

- [app/src/components/UploadFile/view/UploadFileMainView.js](app/src/components/UploadFile/view/UploadFileMainView.js) creates a `react-hook-form` provider and renders the upload UI.
- [app/src/components/UploadFile/view/UploadInputSection.js](app/src/components/UploadFile/view/UploadInputSection.js) renders the file-pick button.
- [app/src/components/UploadFile/view/FilePreviewSection.js](app/src/components/UploadFile/view/FilePreviewSection.js) shows the selected file and lets the user remove it.
- [app/src/components/UploadFile/hooks/useUploadFile.js](app/src/components/UploadFile/hooks/useUploadFile.js) handles PDF selection through `@react-native-documents/picker`.
- [app/src/components/UploadFile/services/fileValidation.js](app/src/components/UploadFile/services/fileValidation.js) validates PDFs and formats file size display.

Important behavior:

- Only PDF files are accepted.
- Selection is local to the mobile app.
- There is no API submission or backend upload yet.

## Backend Services

### Node.js API

The Node service is in [backend/server.js](backend/server.js).

What it does today:

- Loads environment variables with `dotenv`
- Starts an Express server
- Enables CORS, JSON parsing, and request logging
- Connects to MongoDB using `mongoose`
- Exposes a single route: `GET /`

Environment variables used by this service are expected in [backend/.env](backend/.env):

- `PORT`
- `MONGO_URI`

The service currently has no domain routes, schema definitions, or controllers.

### Python API

The Python service is in [python-backend/main.py](python-backend/main.py).

What it does today:

- Loads environment variables with `python-dotenv`
- Starts a FastAPI app
- Enables permissive CORS
- Exposes `GET /` and `GET /health`

Environment variables used by this service are expected in [python-backend/.env](python-backend/.env):

- `PORT`

The Python backend currently acts as a health-check scaffold and does not yet perform AI-specific work.

## Scripts And Commands

### Mobile App

From the `app/` directory:

- `npm start` - start Metro
- `npm run android` - run the Android app
- `npm run ios` - run the iOS app
- `npm test` - run Jest tests
- `npm run lint` - run ESLint

### Node Backend

From the `backend/` directory:

- `npm start` - run the Express server
- `npm run dev` - run the server with nodemon

### Python Backend

From the `python-backend/` directory:

- `python main.py` - start the FastAPI server with Uvicorn reload mode

## Dependencies At A Glance

### Mobile App

Notable packages in [app/package.json](app/package.json):

- React Native 0.84.1
- React 19.2.3
- Redux Toolkit and React Redux
- React Navigation for stack and tab navigation
- React Hook Form for form state
- `@react-native-documents/picker` for selecting PDFs
- `react-native-vector-icons` for UI icons

### Node Backend

Notable packages in [backend/package.json](backend/package.json):

- Express
- Mongoose
- CORS
- Morgan
- Dotenv

### Python Backend

The Python service depends on FastAPI, Uvicorn, and supporting libraries listed in [python-backend/requirements.txt](python-backend/requirements.txt).

## Testing

The current test coverage is minimal:

- [app/__tests__/App.test.tsx](app/__tests__/App.test.tsx) verifies that the root app component renders.

There are no dedicated tests yet for:

- Redux reducers or hooks
- Navigation flows
- PDF selection logic
- Node API routes
- Python API endpoints

## Current Gaps

These are the main implementation gaps visible in the current codebase:

- Authentication is static and does not talk to a real backend.
- The upload flow only selects a local file and does not send it anywhere.
- The Node backend connects to MongoDB but does not yet define data models or route handlers.
- The Python backend exposes only basic health endpoints.
- There is no shared integration layer between the mobile app, Node API, and Python API.

## Suggested Next Steps

If you want to turn this scaffold into a working product, the most valuable next steps are:

1. Implement real authentication and persistent auth state.
2. Add a book upload endpoint in the Node API and connect the mobile upload flow to it.
3. Define MongoDB schemas for users, uploads, and book metadata.
4. Add AI-processing endpoints in the Python service and wire them into the upload pipeline.
5. Expand automated tests around auth, upload validation, and API routes.

## Source Map

Key files to inspect when working on the project:

- [app/App.js](app/App.js)
- [app/index.js](app/index.js)
- [app/src/store/store.js](app/src/store/store.js)
- [app/src/navigation/view/AppNavigator.js](app/src/navigation/view/AppNavigator.js)
- [app/src/navigation/view/MainTabNavigator.js](app/src/navigation/view/MainTabNavigator.js)
- [app/src/navigation/view/PublicNavigator.js](app/src/navigation/view/PublicNavigator.js)
- [app/src/components/UploadFile/view/UploadFileMainView.js](app/src/components/UploadFile/view/UploadFileMainView.js)
- [backend/server.js](backend/server.js)
- [python-backend/main.py](python-backend/main.py)

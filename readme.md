# Livestream Application API Documentation

## Overview

This API allows you to manage overlays for a livestream video. An overlay can be text or an image that appears on top of the video. You can create, read, update, and delete these overlays.

## Base URL

All API endpoints will be accessed through the base URL: `http://localhost:5000/api`

## Endpoints

### 1. Create Overlay

**POST** `/overlays`

- **Description**: This endpoint lets you create a new overlay.
- **Request Body**: You need to send a JSON object with the following fields:
  - `text` (String): The text for the overlay.
  - `image` (String): The URL of the image for the overlay (optional).
  - `position` (Object): Where to place the overlay on the video.
    - `x` (Number): The X position (percentage).
    - `y` (Number): The Y position (percentage).
  - `size` (Object): The size of the overlay.
    - `width` (Number): The width of the overlay in pixels.
    - `height` (Number): The height of the overlay in pixels.
- **Response**:
  - **201 Created**: Returns the created overlay object.
  - **500 Internal Server Error**: If there is an error, it returns an error message.

**Example Request**:

```json
{
  "text": "Welcome to the livestream!",
  "image": "https://example.com/image.png",
  "position": { "x": 50, "y": 10 },
  "size": { "width": 200, "height": 100 }
}
```

### 2. Get All Overlays

**GET** `/overlays`

- **Description**: This endpoint retrieves all overlays currently saved.
- **Response**:
  - **200 OK**: Returns an array of overlay objects.
  - **500 Internal Server Error**: If there is an error, it returns an error message.

**Example Response**:

```json
[
  {
    "_id": "60d5f5f5f5f5f5f5f5f5f5f5",
    "text": "Welcome to the livestream!",
    "image": "https://example.com/image.png",
    "position": { "x": 50, "y": 10 },
    "size": { "width": 200, "height": 100 }
  }
]
```

### 3. Update Overlay

**PUT** `/overlays/:id`

- **Description**: This endpoint allows you to update an existing overlay.
- **Parameters**:
  - `id`: The ID of the overlay you want to update (replace :id in the URL).
- **Request Body**: Send a JSON object with any of the fields you want to update (same as create overlay).
- **Response**:
  - **200 OK**: Returns the updated overlay object.
  - **404 Not Found**: If the overlay with the given ID does not exist.
  - **500 Internal Server Error**: If there is an error, it returns an error message.

**Example Request**:

```json
{
  "text": "New welcome message!"
}
```

### 4. Delete Overlay

**DELETE** `/overlays/:id`

- **Description**: This endpoint deletes an overlay based on its ID.
- **Parameters**:
  - `id`: The ID of the overlay you want to delete (replace :id in the URL).
- **Response**:
  - **204 No Content**: Successfully deleted the overlay.
  - **404 Not Found**: If the overlay with the given ID does not exist.
  - **500 Internal Server Error**: If there is an error, it returns an error message.

## How to Use the API

1. Set up your environment: Ensure that you have MongoDB running and the application server is started.
2. Use a tool to test API calls: You can use tools like Postman or curl to make requests to the API.
3. Input RTSP URL: Add your RTSP URL in the front-end application where the video is displayed.
4. Manage overlays: Use the API endpoints to create, read, update, or delete overlays for your livestream video.

## Running the Application

### Backend

1. Open a terminal and navigate to the project's root directory.
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm run dev
   ```
   This will start the backend server, typically on `http://localhost:5000`.

### Frontend

1. Open a new terminal window.
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install the frontend dependencies:
   ```
   npm install
   ```
4. Start the frontend development server:
   ```
   npm run dev
   ```
   This will start the frontend application, typically on `http://localhost:3000`.

Now you should have both the backend and frontend running. You can access the application by opening a web browser and navigating to `http://localhost:5173` (or whatever URL is shown in the frontend terminal).

### Notes

- Make sure to replace the example URLs and IDs with actual values as necessary.
- Ensure that MongoDB is running before starting the backend server.
- If you encounter any issues, check the terminal output for both backend and frontend for error messages.

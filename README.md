# Jatre Namma Pride

Jatre Namma Pride is a digital companion for village fair visitors. It combines a polished web preview with a native Android app built for event schedules, safety navigation, cultural stories, and lost-and-found reporting.

## Features

- Live and upcoming jatre event schedule
- Safety map for parking, first-aid points, and helpdesk locations
- Lost-and-found reporting workflow with item status tracking
- Cultural story section for local heritage
- Kannada and English web preview experience
- Android app structure using Kotlin, Jetpack Compose, Hilt, Firebase, and Maps

## Tech Stack

- React 19, TypeScript, Vite, Tailwind CSS
- Kotlin, Jetpack Compose, Material 3
- Firebase Firestore, Firebase Storage, Firebase Auth
- Google Maps SDK for Android

## Web Setup

Prerequisites: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. By default, the dev server uses port `3000`.

## Android Setup

1. Open the project in Android Studio.
2. Copy `local.properties.example` to `local.properties`.
3. Add your Maps key:

```properties
MAPS_API_KEY=your_google_maps_api_key
```

4. Replace the placeholder Firebase config in `app/google-services.json` with your Firebase project config before building a connected release.

## Useful Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run preview
```

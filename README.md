# Aussist App

Aussist is a mobile application designed to help immigrants in Australia with essential services like healthcare, emergency contacts, translation, banking, and more.

## File Structure

```
aussist/
├── app/                      # Main application code (Expo Router)
│   ├── (tabs)/               # Tab-based navigation screens
│   │   ├── _layout.tsx       # Tab navigation configuration
│   │   ├── index.tsx         # Home screen
│   │   ├── emergency.tsx     # Emergency services screen
│   │   ├── healthcare.tsx    # Healthcare services screen
│   │   ├── translation.tsx   # Translation services screen
│   │   └── profile.tsx       # User profile screen
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI component library (Shadcn-inspired)
│   │   │   ├── Button.tsx    # Button component
│   │   │   └── Card.tsx      # Card component
│   │   ├── Header.tsx        # App header component
│   │   └── OnboardingPage.tsx # Onboarding screen component
│   ├── lib/                  # Shared utilities and helpers
│   │   ├── utils.ts          # Utility functions
│   │   └── theme.ts          # Theme configuration
│   ├── index.tsx             # Entry point / Splash screen
│   ├── onboarding.tsx        # Onboarding flow
│   ├── _layout.tsx           # Root navigation layout
│   └── +not-found.tsx        # 404 page
├── assets/                   # Static assets (images, fonts)
│   └── images/               # Image assets
├── babel.config.js           # Babel configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## UI Components

The app uses a library of reusable UI components inspired by Shadcn UI:

- **Button**: Versatile button component with variants (default, destructive, outline, etc.) and sizes
- **Card**: Flexible card component with header, content, title, description, and footer sections

## Screens

- **Home**: Main landing page with language selection and service categories
- **Emergency**: Quick access to emergency contacts and symptom checker
- **Healthcare**: Find nearby hospitals and healthcare facilities
- **Translation**: Translation tools and services
- **Profile**: User profile management and settings

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:
   ```
   npx expo start
   ```

## Styling

Access this link for viewing the demo and guide since the size of demo video is too big!
https://drive.google.com/drive/folders/1RgBwmBP6o3-1CpreVCB5JIAxL_rSoNit?usp=sharing

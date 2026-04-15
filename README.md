# Learner - Course Learning App

A modern, feature-rich Learning Management System (LMS) mobile application built with React Native and Expo. This template provides a complete educational platform with course browsing, progress tracking, video lessons, certificates, and more.

## Features

- 📚 **Course Catalog**: Browse and search through various courses
- 🎥 **Video Lessons**: Stream video content with progress tracking
- 📊 **Progress Tracking**: Monitor your learning journey
- 🏆 **Certificates**: Earn certificates upon course completion
- 👤 **User Profile**: Manage your account and view statistics
- ❤️ **Wishlist**: Save courses for later
- 🔍 **Course Search**: Find courses by category or keyword
- 💳 **Payment Integration**: Secure course purchase flow
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet
- **Icons**: Custom SVG icons
- **Storage**: AsyncStorage for local data persistence
- **Fonts**: Manrope font family

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository or extract the template
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on your physical device

## Building for Production

### Android Release Build

1. Follow the instructions in `README_SIGNING.md` to set up your release keystore
2. Build the release APK:

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. Or build Android App Bundle (AAB) for Play Store:

   ```bash
   cd android
   ./gradlew bundleRelease
   ```

### iOS Release Build

1. Open `ios/YourApp.xcworkspace` in Xcode
2. Configure signing with your Apple Developer account
3. Select "Any iOS Device" as the target
4. Go to Product → Archive
5. Upload to App Store Connect

## Project Structure

```
├── app/                    # Main application code (Expo Router)
│   ├── (auth)/            # Authentication routes
│   ├── (tabs)/            # Main tab navigation
│   ├── onboarding/        # Onboarding screens
│   └── ...                # Other screens
├── components/            # Reusable UI components
├── constants/            # App constants (theme, fonts, etc.)
├── assets/               # Images, fonts, icons
├── android/              # Android native project
└── ios/                  # iOS native project (if ejected)
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
# Add your API endpoints, keys, etc.
API_URL=https://your-api-endpoint.com
```

### Android Permissions

The app requires the following permissions:
- `INTERNET`: For network requests
- `READ_EXTERNAL_STORAGE`: For accessing media files
- `WRITE_EXTERNAL_STORAGE`: For downloading content (Android 10 and below)

## Security Best Practices Implemented

- ✅ All console.log statements have been removed from production code
- ✅ Database backup disabled in AndroidManifest.xml
- ✅ Data extraction rules configured to prevent cloud backup
- ✅ ProGuard rules configured for code obfuscation
- ✅ Release signing configuration documented

## Customization

### Changing App Name

1. Update `app.json`:
   ```json
   {
     "name": "Your App Name",
     "slug": "your-app-slug"
   }
   ```

2. Update Android app name in `android/app/src/main/res/values/strings.xml`

3. Update iOS app name in `ios/YourApp/Info.plist`

### Changing Theme Colors

Edit `constants/theme.ts` to customize:
- Primary colors
- Typography
- Spacing
- Border radius
- Shadows

### Adding New Screens

1. Create a new file in the `app/` directory
2. Use the file-based routing convention (e.g., `app/new-screen.tsx`)
3. The route will be automatically available at `/new-screen`

## Dependencies

See `package.json` for the full list of dependencies. Key dependencies include:

- expo
- react-native
- @react-navigation/native
- @react-native-async-storage/async-storage
- react-native-svg

## Support

For issues, questions, or customization requests, please contact the template author.

## License

This template is licensed for use on CodeCanyon. Please refer to your purchase license for usage terms.

---

**Note**: This template provides a UI foundation. Backend integration (API endpoints, authentication backend, payment processing) needs to be implemented according to your specific requirements.

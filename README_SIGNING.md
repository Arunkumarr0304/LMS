# Android Release Signing Configuration

This document explains how to configure release signing for your LMS app.

## Quick Setup

### Step 1: Generate a Release Keystore

Open a terminal and run the following command:

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You will be prompted to enter:
- Keystore password (choose a strong password)
- Key password (can be same as keystore password)
- Your name, organizational unit, organization, city, state, and country code

### Step 2: Move Keystore to Project

Move the generated `my-release-key.keystore` file to:
```
android/app/my-release-key.keystore
```

**Important:** Never commit this file to version control! Add it to your `.gitignore`.

### Step 3: Configure Signing Credentials

You have two options:

#### Option A: Using Environment Variables (Recommended for CI/CD)

Set these environment variables before building:

```bash
export MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
export MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
export MYAPP_UPLOAD_STORE_PASSWORD=your_keystore_password
export MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

#### Option B: Using gradle.properties

Edit or create `~/.gradle/gradle.properties` (user home directory, not project):

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_keystore_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

**Note:** Never commit credentials to your project repository!

### Step 4: Build Release APK/Bundle

```bash
cd android
./gradlew assembleRelease     # For APK
# OR
./gradlew bundleRelease        # For Play Store Bundle (AAB)
```

Output locations:
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## Security Best Practices

1. **Keep keystore secure**: Store your keystore file and passwords in a secure location (password manager, encrypted storage).

2. **Backup keystore**: If you lose your keystore, you cannot update your app on Google Play. Make encrypted backups.

3. **Use Play App Signing**: For Google Play Store, enable Play App Signing to have Google manage your signing key.

4. **Different keys for different apps**: Use unique keystores for each app.

5. **Never commit credentials**: Always use environment variables or local gradle.properties outside version control.

## Troubleshooting

### "Keystore file not found"
Ensure the keystore file is in `android/app/` directory and the filename matches `MYAPP_UPLOAD_STORE_FILE`.

### "Password verification failed"
Double-check your keystore and key passwords. They may have been entered incorrectly during keystore generation.

### "Cannot recover key"
This usually means the key password is wrong. If you used the same password for keystore and key, ensure both variables have the same value.

## Play Store Upload

When uploading to Google Play:

1. Build the release AAB: `./gradlew bundleRelease`
2. Upload `app-release.aab` to Google Play Console
3. Follow Google Play's signing process
4. For new apps, Google Play now requires Play App Signing

## References

- [React Native: Signed APK Android](https://reactnative.dev/docs/signed-apk-android)
- [Android Studio: Sign Your App](https://developer.android.com/studio/publish/app-signing)

# Professional Splash Screen Setup Guide

## Problem Analysis
Looking at your screenshots, the splash screen was:
- **Too small** on some devices (imageWidth: 300 was too large)
- **Getting cut off** on left/right sides
- **Inconsistent** across different screen sizes

## Solution Applied ✅

### Updated Configuration (`app.json`)
```json
{
  "imageWidth": 200,
  "resizeMode": "contain"
}
```

**Changes made:**
1. **Reduced `imageWidth` from 300 → 200** - Prevents cropping on smaller devices
2. **Set `resizeMode` to `contain`** - Keeps entire image visible without cropping
3. **Added platform-specific configs** - iOS & Android now have dedicated settings
4. **Consistent dark mode** - Both platforms maintain proper theming

## Recommended Splash Image Specifications

### For Best Results, Create Your Splash Image at:
- **Resolution**: 1024 × 1024 pixels (square)
- **Format**: PNG with transparency
- **Logo Size**: Logo should be **~60-70%** of total image size (leave padding around edges)
- **Background**: Transparent (allows backgroundColor to show through)

### Example Layout:
```
┌─────────────────────────────┐
│        ~20% padding         │
│    ┌───────────────────┐    │
│    │                   │    │
│ ~20%    YOUR LOGO      ~20%│
│    │                   │    │
│    └───────────────────┘    │
│        ~20% padding         │
└─────────────────────────────┘
```

## Current Configuration Explained

### `imageWidth: 200`
- Defines the **width in points** for the splash image
- On iPhone 14 Pro Max: ~200 logical pixels
- On smaller phones: Scales proportionally
- **Sweet spot**: 180-220 for centered logos

### `resizeMode: "contain"`
- Entire image is always visible
- Maintains aspect ratio
- No cropping occurs
- May show some background color on edges

### Alternative: `resizeMode: "cover"`
- Fills entire screen
- May crop parts of image
- Good for full-screen backgrounds
- **NOT recommended** for logos

## Platform-Specific Optimizations

### iOS
- Uses `storyboard` splash screens
- Honoring safe areas automatically
- 200pt width works perfectly for all iPhones

### Android
- Uses `Drawable` splash screens
- Android 12+ supports vector graphics
- Edge-to-edge display respected

## Testing Checklist

- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] iPad (tablet)
- [ ] Android small screen (e.g., Pixel 4a)
- [ ] Android large screen (e.g., Galaxy S23 Ultra)
- [ ] Android tablet
- [ ] Dark mode enabled
- [ ] Light mode enabled

## Creating the Perfect Splash Image

### Option 1: Design in Figma
1. Create 1024 × 1024 frame
2. Center your logo with 150-200px padding
3. Export as PNG
4. Place in `assets/images/splash-icon.png`

### Option 2: Use Multiple Sizes (Advanced)
If you want pixel-perfect results, create:
- `splash-icon.png` (1024×1024) - Universal
- `splash-icon@2x.png` (2048×2048) - Retina displays
- `splash-icon@3x.png` (3072×3072) - High-res displays

## Rebuild Instructions

After changing `app.json`, run:

```bash
# Clean and rebuild
npx expo prebuild --clean

# Or if using Expo Go
cd ios && pod install  # iOS only
npx expo run:android   # Android
npx expo run:ios       # iOS
```

**Note**: Changes to `expo-splash-screen` require a native rebuild.

## Troubleshooting

### Image still too small?
- Increase `imageWidth` to 220-240
- Ensure your PNG has enough internal padding

### Image still getting cut off?
- Verify `resizeMode` is set to `contain`
- Check logo isn't touching edges of PNG
- Reduce `imageWidth` to 180

### Android showing white flash before splash?
- Ensure `backgroundColor` matches your app's primary color
- Check Android's `styles.xml` in `android/app/src/main/res/values/`

### iOS showing black bars?
- Verify `backgroundColor` is set in all `ios` nested configs
- Check `LaunchScreen.storyboard` after prebuild

## Professional Tips

1. **Brand Colors**: Use your primary brand color for `backgroundColor`
2. **Animation**: Consider using `expo-splash-screen` programmatic SDK for fade-out
3. **Loading State**: Show a spinner after splash using React Native's `ActivityIndicator`
4. **Minimalism**: Keep splash screen simple - just logo centered
5. **Quick Display**: Splash should show for 2-3 seconds max

## Next Steps

1. ✅ Configuration updated in `app.json`
2. ⬜ Test on multiple devices using `expo start`
3. ⬜ Adjust `imageWidth` if needed (180-220 range)
4. ⬜ Rebuild native apps: `npx expo prebuild --clean`
5. ⬜ Deploy to production

---

**Current Status**: Professional configuration applied. Ready for testing! 🚀

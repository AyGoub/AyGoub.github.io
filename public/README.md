# Public Assets

This folder contains static assets for your portfolio.

## Profile Picture

To add your profile picture:

1. **Add your image file** to this folder (recommended formats: JPG, PNG, WebP)
   - Suggested filename: `profile-picture.jpg` or `profile-picture.png`
   - Recommended size: 400x400 pixels or larger (square aspect ratio)
   - File size: Keep under 2MB for optimal loading

2. **Update the Hero component** (`components/Hero.tsx`):
   - Uncomment the Image component code (lines 72-80)
   - Comment out the placeholder div (lines 67-69)
   - Update the `src` path to match your filename

### Example:
```tsx
// Replace this placeholder:
<div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
  <User className="w-32 h-32 text-primary-400" />
</div>

// With your actual image:
<Image
  src="/profile-picture.jpg"  // Update this path
  alt="AyGoub - Cybersecurity Professional"
  fill
  className="rounded-full object-cover"
  priority
/>
```

## Other Assets

- `favicon.ico` - Website favicon
- Any other images you want to use in your portfolio

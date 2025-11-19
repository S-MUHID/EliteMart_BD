# 📁 Media Setup Guide

## Folder Structure

Your project now uses local files for all product images and videos:

```
my web/
├── images/          ← All product images go here
├── videos/          ← All product videos go here
├── index.html
├── script.js
└── ... other files
```

## Adding Product Images

### Step 1: Add Images to `images/` folder

Place your product images in the `images/` folder with names like:
- `massagegun.jpg`
- `earbuds.jpg`
- `sunglasses.jpg`
- `handbag.jpg`
- `watch.jpg`
- etc.

### Step 2: Update Product in Admin Panel

1. Go to **Admin Dashboard** (mr_admin_login.html)
2. Click **✚ Add New Product** button
3. Fill in the form:
   - **Product Image** (required): Enter the filename, e.g., `images/massagegun.jpg`
   - **Additional Images** (optional): Enter multiple image URLs, one per line:
     ```
     images/massagegun-angle.jpg
     images/massagegun-closeup.jpg
     images/massagegun-demo.jpg
     ```
   - **Video URL** (optional): See video setup below

### Step 3: Product Detail Gallery

When customers click on a product, they will see:
- 🖼️ Main image display with thumbnail gallery
- ▶️ Play video (if available)
- Swappable image thumbnails at bottom
- Image counter (e.g., "Image 1 of 3")

---

## Adding Product Videos

### For Local MP4 Videos:

1. Save your video file as `.mp4` in the `videos/` folder
2. Name it like: `massage-demo.mp4`
3. In admin form, enter: `videos/massage-demo.mp4`

### For YouTube Videos:

1. Find your YouTube video
2. Get the embed URL format:
   - Video ID: Find in the URL, e.g., `dQw4w9WgXcQ`
   - Embed URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`
3. In admin form, paste the embed URL

### Video Support:
- ✅ Local MP4 files (best for demos)
- ✅ YouTube embeds (for external content)
- ✅ Optional (leave blank if no video)

---

## Image File Format Recommendations

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| **JPG** | Photos | Small file size | Lossy compression |
| **PNG** | Graphics | Lossless, transparent BG | Larger files |
| **WebP** | Modern sites | Best compression | Old browser support |

**Recommended:** Use JPG for photos (massagegun.jpg, earbuds.jpg), PNG for graphics

---

## Video File Recommendations

| Format | Size | Quality | Browser Support |
|--------|------|---------|-----------------|
| **MP4 H.264** | Medium | Good | ✅ All browsers |
| **WebM** | Small | Good | ⚠️ Chrome/Firefox |
| **YouTube Embed** | 0 KB | Varies | ✅ All browsers |

**Recommended:** Use MP4 for demos, YouTube for promotional content

---

## Example: Adding a New Product

```
Product Name: iPhone 15 Pro
Category: gadgets
Price: 89999
Original Price: 99999
Rating: 4.9

Primary Image: images/iphone15-pro.jpg

Additional Images (one per line):
images/iphone15-pro-side.jpg
images/iphone15-pro-back.jpg
images/iphone15-pro-camera.jpg

Video URL: videos/iphone15-unboxing.mp4
```

Result:
- ✅ Main image: iphone15-pro.jpg
- ✅ Gallery: 3 more angle images
- ✅ Video: Local demo video
- ✅ Thumbnails: Auto-generated from images array

---

## Current Sample Products

All sample products are configured to use local files:

| Product | Image | Video | Status |
|---------|-------|-------|--------|
| Massage Gun | `images/massagegun.jpg` | `videos/massage-demo.mp4` | Requires file |
| Earbuds | `images/earbuds.jpg` | `videos/earbuds-demo.mp4` | Requires file |
| Sunglasses | `images/sunglasses.jpg` | (None) | Requires file |
| Handbag | `images/handbag.jpg` | (None) | Requires file |
| Watch | `images/watch.jpg` | (None) | Requires file |
| Cap | `images/cap.jpg` | (None) | Requires file |
| Belt | `images/belt.jpg` | (None) | Requires file |
| Scarf | `images/scarf.jpg` | (None) | Requires file |
| Power Bank | `images/powerbank.jpg` | `videos/powerbank-demo.mp4` | Requires file |
| Speaker | `images/speaker.jpg` | `videos/speaker-demo.mp4` | Requires file |
| T-Shirt | `images/tshirt.jpg` | (None) | Requires file |
| Jeans | `images/jeans.jpg` | (None) | Requires file |

⚠️ **Note:** The product database is set up, but actual image/video files need to be added to the respective folders.

---

## Troubleshooting

### Images not showing?
1. ✓ Check file path matches exactly (case-sensitive on some systems)
2. ✓ Ensure image file exists in `images/` folder
3. ✓ Try using forward slashes: `images/filename.jpg`

### Videos not playing?
1. ✓ For MP4: Ensure `.mp4` file is in `videos/` folder
2. ✓ For YouTube: Use correct embed URL format (`youtube.com/embed/...`)
3. ✓ Check browser video codec support

### Image gallery not showing?
1. ✓ Ensure product has multiple images in `images` array
2. ✓ Check admin panel added them correctly

---

## Quick Copy-Paste Template

When adding a product with images & videos:

```javascript
{
    id: [next-id],
    name: 'Product Name',
    category: 'gadgets',
    price: 1999,
    original: 2500,
    description: 'Product description here',
    image: 'images/filename.jpg',
    images: [
        'images/filename.jpg',
        'images/filename-2.jpg',
        'images/filename-3.jpg'
    ],
    videoUrl: 'videos/demo.mp4',  // or youtube embed URL
    rating: 4.5,
    reviews: 50
}
```

---

## File Size Guidelines

Keep file sizes reasonable for web:

| Type | File Size | Compression |
|------|-----------|-------------|
| Product Image | < 500 KB | High (optimize with tools) |
| Demo Video | < 50 MB | Medium (MP4 compression) |
| YouTube Link | 0 KB | Not applicable |

**Tools to optimize:**
- Images: TinyPNG, ImageOptim, JPEGmini
- Videos: HandBrake, FFmpeg

---

**Last Updated:** November 2025
**Maintained by:** Your Web Team

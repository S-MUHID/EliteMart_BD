# ⚡ Quick Reference - ফাইল আপলোড সেটআপ

## 3 ধাপে সেটআপ করুন

### ✅ ধাপ 1: Script যোগ করুন
```html
<!-- mr_admin_login.html এর <head> তে যোগ করুন: -->
<script src="file-handler.js"></script>
```

### ✅ ধাপ 2: Form আপডেট করুন
```html
<!-- পুরনো এই লাইনগুলি... -->
<input id="productImage" type="text" placeholder="URL">
<input id="productImages" type="text" placeholder="URLs">
<input id="productVideo" type="text" placeholder="URL">

<!-- এর জায়গায় এটি যোগ করুন: -->
<input id="productImageFile" type="file" accept="image/*" 
       onchange="fileHandler.handlePrimaryImageSelection(event)">
<button onclick="document.getElementById('productImageFile').click();">
    🖼️ Choose Primary Image
</button>

<input id="additionalImagesFiles" type="file" accept="image/*" multiple
       onchange="fileHandler.handleAdditionalImagesSelection(event)">
<button onclick="document.getElementById('additionalImagesFiles').click();">
    🖼️ Choose Additional Images
</button>

<input id="productVideoFile" type="file" accept="video/*"
       onchange="fileHandler.handleVideoSelection(event)">
<button onclick="document.getElementById('productVideoFile').click();">
    🎬 Upload Video
</button>

<input id="productVideoYouTube" type="text" 
       placeholder="https://www.youtube.com/embed/...">
```

### ✅ ধাপ 3: Function আপডেট করুন
```javascript
// mr_admin_login.html এর addNewProduct() ফাংশন রিপ্লেস করুন:

function addNewProduct() {
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const original = parseFloat(document.getElementById('productOriginal').value) || price;
    const rating = parseFloat(document.getElementById('productRating').value);
    const description = document.getElementById('productDescription').value.trim();

    // ইমেজ পাওয়া
    let image = '';
    if (fileHandler.selectedFiles.primaryImage) {
        image = fileHandler.selectedFiles.primaryImage.dataUrl;
    }

    let images = [image];
    if (fileHandler.selectedFiles.additionalImages.length > 0) {
        fileHandler.selectedFiles.additionalImages.forEach(img => {
            images.push(img.dataUrl);
        });
    }

    // ভিডিও পাওয়া
    let videoUrl = '';
    if (fileHandler.selectedFiles.video) {
        videoUrl = fileHandler.selectedFiles.video.dataUrl;
    } else if (document.getElementById('productVideoYouTube').value.trim()) {
        videoUrl = document.getElementById('productVideoYouTube').value.trim();
    }

    // Validation
    if (!name || !category || !price || !rating || !image || !description) {
        alert('❌ সব required fields পূরণ করুন');
        return;
    }

    // পণ্য তৈরি করুন
    const newProduct = {
        id: products.length + 1,
        name: name,
        category: category,
        price: price,
        original: original,
        rating: rating,
        image: image,
        images: images,
        videoUrl: videoUrl || '',
        description: description
    };

    // localStorage এ সংরক্ষণ করুন
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // ফর্ম ক্লিয়ার করুন
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productOriginal').value = '';
    document.getElementById('productRating').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productVideoYouTube').value = '';
    
    fileHandler.clearSelectedFiles();

    // ফর্ম হাইড করুন
    document.getElementById('addProductForm').style.display = 'none';

    // পণ্য তালিকা আপডেট করুন
    if (typeof renderProductsList === 'function') renderProductsList();

    alert(`✅ পণ্য "${name}" যোগ হয়েছে!`);
}

function toggleAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        document.getElementById('productName').focus();
    } else {
        form.style.display = 'none';
        fileHandler.clearSelectedFiles();
    }
}
```

---

## 📁 ফাইল লোকেশন

| ফাইল | কোথায় | উদ্দেশ্য |
|------|--------|---------|
| file-handler.js | root folder | ফাইল সিলেকশন হ্যান্ডলিং |
| mr_admin_login.html | root folder | Admin panel (update করুন) |
| script.js | root folder | Product database (ইতিমধ্যে OK) |

---

## 🎯 ব্যবহার

```
1. Admin এ Login করুন
2. "✚ Add New Product" ক্লিক করুন
3. তথ্য পূরণ করুন
4. 🖼️ Choose Image → ফাইল নির্বাচন করুন
5. (Optional) আরও ইমেজ/ভিডিও যোগ করুন
6. ✓ Add Product ক্লিক করুন
7. Done! পণ্য homepage এ দেখা যাবে
```

---

## 📊 Data Format

```javascript
// ইমেজ/ভিডিও Data URL হিসেবে সংরক্ষিত:
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQg...

// তারপর localStorage JSON তে:
{
  "id": 1,
  "name": "Product",
  "image": "data:image/jpeg;base64,...",
  "images": ["data:image/jpeg;base64,...", ...],
  "videoUrl": "data:video/mp4;base64,..." // অথবা YouTube URL
}
```

---

## ⚠️ মনে রাখবেন

✅ **ভাল অনুশীলন:**
- ছোট সাইজের ইমেজ ব্যবহার করুন (<500 KB)
- বড় ভিডিওর জন্য YouTube URL ব্যবহার করুন
- নিয়মিত browser cache clear করুন

❌ **এড়িয়ে চলুন:**
- বড় ভিডিও ফাইল আপলোড করবেন না (> 10 MB)
- একসাথে অনেক ছবি যোগ করবেন না
- Private/Incognito mode এ কাজ করবেন না

---

## 🆘 সমস্যা সমাধান

**Q: Script লিঙ্ক সঠিক কিন্তু কাজ করছে না?**
A: Browser console (F12) খুলে error দেখুন

**Q: ফাইল সিলেক্ট হয়েছে কিন্তু প্রিভিউ নেই?**
A: ফাইল size 10 MB এর কম আছে কি চেক করুন

**Q: পণ্য যোগ হয়েছে কিন্তু ইমেজ নেই?**
A: ইমেজ file সিলেক্ট করেছেন কি চেক করুন

---

## 📚 সম্পূর্ণ ডকুমেন্টেশন

বিস্তারিত জন্য দেখুন:
- FILE_UPLOAD_GUIDE.html (ভিজুয়াল গাইড)
- FILE_UPLOAD_IMPLEMENTATION.md (বিস্তারিত গাইড)
- MEDIA_SETUP_GUIDE.md (মিডিয়া সেটআপ)
- README.md (সম্পূর্ণ ওভারভিউ)

---

**Created:** November 16, 2025
**Version:** 1.0
**Status:** Ready to Use ✅

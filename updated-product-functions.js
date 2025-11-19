// Updated addNewProduct function to work with file selection
// Replace the existing addNewProduct() function in mr_admin_login.html with this version

function addNewProduct() {
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const original = parseFloat(document.getElementById('productOriginal').value) || price;
    const rating = parseFloat(document.getElementById('productRating').value);
    const description = document.getElementById('productDescription').value.trim();

    // Get image from file handler
    let image = '';
    if (fileHandler.selectedFiles.primaryImage) {
        image = fileHandler.selectedFiles.primaryImage.dataUrl;
    } else {
        image = document.getElementById('productImage').value.trim();
    }

    // Get additional images
    let images = [image];
    if (fileHandler.selectedFiles.additionalImages.length > 0) {
        fileHandler.selectedFiles.additionalImages.forEach(img => {
            images.push(img.dataUrl);
        });
    }

    // Get video URL
    let videoUrl = '';
    if (fileHandler.selectedFiles.video) {
        videoUrl = fileHandler.selectedFiles.video.dataUrl;
    } else if (document.getElementById('productVideoYouTube').value.trim()) {
        videoUrl = document.getElementById('productVideoYouTube').value.trim();
    } else {
        videoUrl = document.getElementById('productVideo').value.trim();
    }

    // Validation
    if (!name || !category || !price || !rating || !image || !description) {
        if (window.showToast) showToast('❌ Please fill in all required fields (marked with *)', 'error'); else alert('❌ Please fill in all required fields (marked with *)');
        return;
    }

    if (rating < 0 || rating > 5) {
        if (window.showToast) showToast('❌ Rating must be between 0 and 5', 'error'); else alert('❌ Rating must be between 0 and 5');
        return;
    }

    if (price < 0) {
        if (window.showToast) showToast('❌ Price must be a positive number', 'error'); else alert('❌ Price must be a positive number');
        return;
    }

    // Create product object
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

    // Add to products array
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // Clear form and file handler
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productOriginal').value = '';
    document.getElementById('productRating').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productVideoYouTube').value = '';
    
    fileHandler.clearSelectedFiles();

    // Hide form
    document.getElementById('addProductForm').style.display = 'none';

    // Re-render products list
    if (typeof renderProductsList === 'function') renderProductsList();

    if (window.showToast) showToast(`✅ Product "${name}" added successfully!`, 'success'); else alert(`✅ Product "${name}" added successfully!`);
}

// Updated function to toggle add product form
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

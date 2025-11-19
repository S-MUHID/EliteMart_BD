// Product Database
let products = [
    {
        id: 1,
        name: 'Elite Premium Massage Gun',
        category: 'gadgets',
        price: 3199,
        original: 3700,
        description: 'Deep tissue relaxation • 6 modes • USB rechargeable • Whisper quiet motor',
        image: 'images/massagegun.jpg',
        images: ['images/massagegun.jpg', 'images/product2.jpg'],
        videoUrl: 'videos/massage-demo.mp4',
        rating: 4.8,
        reviews: 156,
        featured: true,
        sales: 342
    },
    {
        id: 2,
        name: 'Wireless Earbuds Pro',
        category: 'gadgets',
        price: 1299,
        original: 1800,
        description: 'HD sound • Active noise cancellation • 30-hour battery',
        image: 'images/earbuds.jpg',
        images: ['images/earbuds.jpg', 'images/earbuds2.jpg'],
        videoUrl: 'videos/earbuds-demo.mp4',
        rating: 4.7,
        reviews: 89,
        featured: false,
        sales: 234
    },
    {
        id: 3,
        name: 'Luxury Sunglasses',
        category: 'accessories',
        price: 899,
        original: 1200,
        description: 'UV protection • Polarized lens • Trendy design',
        image: 'images/sunglasses.jpg',
        images: ['images/sunglasses.jpg'],
        videoUrl: '',
        rating: 4.6,
        reviews: 45,
        featured: false,
        sales: 128
    },
    {
        id: 4,
        name: 'Classic Handbag',
        category: 'fashion',
        price: 1499,
        original: 1999,
        description: 'Premium faux leather • Multiple compartments • Elegant design',
        image: 'images/handbag.jpg',
        images: ['images/handbag.jpg'],
        videoUrl: '',
        rating: 4.5,
        reviews: 67,
        featured: false,
        sales: 156
    },
    {
        id: 5,
        name: 'Stylish Wrist Watch',
        category: 'accessories',
        price: 1199,
        original: 1600,
        description: 'Water-resistant • Minimal design • 2-year warranty',
        image: 'images/watch.jpg',
        images: ['images/watch.jpg'],
        videoUrl: '',
        rating: 4.9,
        reviews: 102,
        featured: false,
        sales: 189
    },
    {
        id: 6,
        name: 'Urban Cap',
        category: 'fashion',
        price: 299,
        original: 450,
        description: 'Breathable cotton • Adjustable fit • 5 colors',
        image: 'images/cap.jpg',
        images: ['images/cap.jpg'],
        videoUrl: '',
        rating: 4.4,
        reviews: 34,
        featured: false,
        sales: 412
    },
    {
        id: 7,
        name: 'Designer Belt',
        category: 'fashion',
        price: 599,
        original: 750,
        description: 'Adjustable • Durable leather • Stylish buckle',
        image: 'images/belt.jpg',
        images: ['images/belt.jpg'],
        videoUrl: '',
        rating: 4.6,
        reviews: 52,
        featured: false,
        sales: 87
    },
    {
        id: 8,
        name: 'Silky Scarf',
        category: 'fashion',
        price: 399,
        original: 650,
        description: 'Elegant & Soft • Premium fabric • Multiple patterns',
        image: 'images/scarf.jpg',
        images: ['images/scarf.jpg'],
        videoUrl: '',
        rating: 4.5,
        reviews: 28,
        featured: false,
        sales: 145
    },
    {
        id: 9,
        name: 'Portable Power Bank',
        category: 'gadgets',
        price: 1899,
        original: 2500,
        description: '20000mAh • Fast charging • Dual USB ports',
        image: 'images/powerbank.jpg',
        images: ['images/powerbank.jpg'],
        videoUrl: 'videos/powerbank-demo.mp4',
        rating: 4.7,
        reviews: 78,
        featured: false,
        sales: 203
    },
    {
        id: 10,
        name: 'Bluetooth Speaker',
        category: 'gadgets',
        price: 2499,
        original: 3200,
        description: '360° sound • 12-hour battery • Waterproof',
        image: 'images/speaker.jpg',
        images: ['images/speaker.jpg'],
        videoUrl: 'videos/speaker-demo.mp4',
        rating: 4.8,
        reviews: 94,
        featured: false,
        sales: 267
    },
    {
        id: 11,
        name: 'Premium T-Shirt',
        category: 'men',
        price: 599,
        original: 799,
        description: '100% Cotton • Comfortable fit • Multiple colors',
        image: 'images/tshirt.jpg',
        images: ['images/tshirt.jpg'],
        videoUrl: '',
        rating: 4.5,
        reviews: 41,
        featured: false,
        sales: 178
    },
    {
        id: 12,
        name: 'Designer Jeans',
        category: 'women',
        price: 1299,
        original: 1800,
        description: 'Slim fit • High quality fabric • Modern style',
        image: 'images/jeans.jpg',
        images: ['images/jeans.jpg'],
        videoUrl: '',
        rating: 4.6,
        reviews: 63,
        featured: false,
        sales: 223
    }
];

// Load products from localStorage if exists (for dynamically added products)
const savedProducts = localStorage.getItem('products');
if (savedProducts) {
    const loadedProducts = JSON.parse(savedProducts);
    // Merge with default products, avoiding duplicates
    products = loadedProducts;
}

// Hero items (managed from admin). Default to first product if none saved.
let heroItems = [];
const savedHeroes = localStorage.getItem('heroItems');
if (savedHeroes) {
    try {
        heroItems = JSON.parse(savedHeroes) || [];
    } catch (e) { heroItems = []; }
}
if (!heroItems || heroItems.length === 0) {
    // create a sensible default using first product
    const p = products[0];
    if (p) {
        heroItems = [{
            id: Date.now(),
            title: p.name,
            subtitle: p.description,
            image: p.image,
            ctaText: 'Shop Now',
            ctaLink: '#',
            active: true
        }];
        localStorage.setItem('heroItems', JSON.stringify(heroItems));
    }
}

// Hero carousel state
let heroIndex = 0;

function renderHeroSlides() {
    const container = document.getElementById('heroSlides');
    const indicators = document.getElementById('heroIndicators');
    if (!container) return;

    // ensure only active heroes
    const activeHeroes = (heroItems || []).filter(h => h.active !== false);
    if (activeHeroes.length === 0) {
        container.innerHTML = '';
        indicators.innerHTML = '';
        return;
    }

    container.innerHTML = activeHeroes.map(h => `
        <div class="hero-slide" style="min-width:100%; display:flex; gap:20px; padding: 30px; align-items:center; background: linear-gradient(135deg, #fff, #f7f1d4);">
            <div style="flex:1; text-align:center;">
                <img src="${h.image}" alt="${h.title}" style="max-width:100%; max-height:360px; object-fit:cover; border-radius:12px;" onerror="this.src='https://via.placeholder.com/600x360?text=${encodeURIComponent(h.title)}'" />
            </div>
            <div style="flex:1; color: #111; padding: 10px 30px;">
                <h2 style="margin:0 0 12px 0; font-size:2rem;">${h.title}</h2>
                <p style="margin:0 0 18px 0; color:#333;">${h.subtitle}</p>
                <a href="${h.ctaLink || '#'}" class="cta" style="display:inline-block;">${h.ctaText || 'Learn More'}</a>
            </div>
        </div>
    `).join('');

    // indicators
    indicators.innerHTML = activeHeroes.map((_, idx) => `<button data-idx="${idx}" style="width:10px;height:10px;border-radius:50%;background:${idx===heroIndex?'#000':'rgba(0,0,0,0.2)'};border:none;cursor:pointer"></button>`).join('');

    // attach indicator handlers
    Array.from(indicators.children).forEach(btn => {
        btn.addEventListener('click', function() {
            heroIndex = parseInt(this.getAttribute('data-idx')) || 0;
            updateHeroPosition();
        });
    });

    updateHeroPosition();
}

function updateHeroPosition() {
    const container = document.getElementById('heroSlides');
    const indicators = document.getElementById('heroIndicators');
    if (!container) return;
    const slides = container.children.length;
    if (slides === 0) return;
    if (heroIndex >= slides) heroIndex = 0;
    if (heroIndex < 0) heroIndex = slides - 1;
    container.style.transform = `translateX(-${heroIndex * 100}%)`;
    // update indicators
    if (indicators) {
        Array.from(indicators.children).forEach((btn, idx) => {
            btn.style.background = (idx === heroIndex) ? '#000' : 'rgba(0,0,0,0.2)';
        });
    }
}

document.addEventListener('click', function(e){
    if (e.target && e.target.id === 'heroNext') { heroIndex++; updateHeroPosition(); }
    if (e.target && e.target.id === 'heroPrev') { heroIndex--; updateHeroPosition(); }
});


// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gold);
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 300;
        font-weight: 700;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Product Display
function renderProducts(filteredProducts = products) {
    const grid = document.querySelector('.grid');
    if (!grid) return;

    grid.innerHTML = filteredProducts.map(product => `
        <div class="card" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/220x180?text=${encodeURIComponent(product.name)}'" />
            <div class="card-content">
                <h3>${product.name}</h3>
                <div class="card-desc">${product.description}</div>
                <div class="price-row">
                    <div>
                        <div class="price">৳${product.price.toLocaleString()}</div>
                        <div class="strike">৳${product.original.toLocaleString()}</div>
                    </div>
                    <div class="badge-del">COD</div>
                </div>
                <button class="buy" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Update product count
    const counter = document.getElementById('productCount');
    if (counter) counter.textContent = filteredProducts.length;
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const content = modal.querySelector('.modal-content');
    const discount = Math.round((1 - product.price / product.original) * 100);

    // Build image gallery HTML
    let imageGalleryHTML = '';
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    
    if (images.length > 1) {
        imageGalleryHTML = `
            <div style="position: relative; margin-bottom: 25px;">
                <img id="mainImage" src="${images[0]}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/500x400?text=${encodeURIComponent(product.name)}'" style="width: 100%; height: 350px; object-fit: cover; border-radius: 12px;" />
                <div style="display: flex; gap: 8px; margin-top: 12px; overflow-x: auto; padding-bottom: 8px;">
                    ${images.map((img, idx) => `
                        <img src="${img}" alt="View ${idx + 1}" onclick="document.getElementById('mainImage').src='${img}'" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--gold)' : '#333'}; transition: all 0.3s;" />
                    `).join('')}
                </div>
                <div style="text-align: center; color: #999; font-size: 0.85rem; margin-top: 8px;">Image 1 of ${images.length}</div>
            </div>
        `;
    } else {
        imageGalleryHTML = `
            <img src="${images[0]}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/500x400?text=${encodeURIComponent(product.name)}'" style="width: 100%; height: 350px; object-fit: cover; border-radius: 12px; margin-bottom: 25px;" />
        `;
    }

    // Build video HTML if exists
    let videoHTML = '';
    if (product.videoUrl) {
        if (product.videoUrl.includes('youtube')) {
            // YouTube embed
            videoHTML = `
                <div style="margin: 20px 0; border-radius: 10px; overflow: hidden;">
                    <iframe width="100%" height="300" src="${product.videoUrl}?autoplay=0" title="Product Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `;
        } else {
            // Local video file (MP4, WebM, etc.)
            videoHTML = `
                <div style="margin: 20px 0; border-radius: 10px; overflow: hidden; background: #000;">
                    <video width="100%" height="300" controls style="width: 100%; display: block;">
                        <source src="${product.videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        }
    }

    content.innerHTML = `
        <span class="modal-close" onclick="document.getElementById('productModal').classList.remove('show')">&times;</span>
        ${imageGalleryHTML}
        ${videoHTML}
        <h2 style="color: var(--gold); margin: 0 0 10px 0; font-size: 1.6rem;">${product.name}</h2>
        <div class="small" style="margin-bottom: 15px; font-size: 1rem;">⭐ ${product.rating} <span style="color: #aaa;">(${product.reviews} reviews)</span></div>
        <p style="color: var(--muted); line-height: 1.8; margin-bottom: 20px; font-size: 1rem;">${product.description}</p>
        <div style="margin: 25px 0; border-top: 1px solid #333; padding-top: 20px;">
            <div style="font-size: 0.9rem; color: var(--muted); margin-bottom: 12px; font-weight: 600;">PRICE</div>
            <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 20px;">
                <span style="font-size: 2.2rem; font-weight: 700; color: #fff;">৳${product.price.toLocaleString()}</span>
                <span style="text-decoration: line-through; color: #666; font-size: 1.1rem;">৳${product.original.toLocaleString()}</span>
                <span style="background: #0b3d0b; color: #adffad; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.95rem;">${discount}% OFF</span>
            </div>
        </div>
        <div style="background: #0f0f0f; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <div style="color: var(--gold); font-weight: 700; margin-bottom: 12px; font-size: 0.95rem;">WHY BUY FROM US?</div>
            <div style="color: var(--muted); font-size: 0.9rem; line-height: 2;">
               
                ✓ Genuine Products Only<br>
                ✓ Free Delivery on Orders > ৳2000
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 25px;">
            <button class="cta" style="padding: 16px; font-size: 1rem; background: #666; border: 2px solid var(--gold); color: var(--gold);" onclick="addToCart(${product.id}); showNotification('Added to cart!'); document.getElementById('productModal').classList.remove('show');">➕ Add to Cart</button>
            <button class="cta" style="padding: 16px; font-size: 1rem;" onclick="addToCart(${product.id}); document.getElementById('productModal').classList.remove('show'); setTimeout(() => location.href='cart.html', 500);">💳 Buy Now</button>
        </div>
    `;

    modal.classList.add('show');
}

// Cart Page
function renderCart() {
    const container = document.querySelector('.cart-container');
    if (!container) return;

    const cartItems = document.querySelector('.cart-items');
    const summary = document.querySelector('.cart-summary');

    if (!cartItems || !summary) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;"><h2 style="color: var(--gold); margin-bottom: 20px;">Your cart is empty</h2><a href="index.html" class="cta">Continue Shopping</a></div>';
        summary.innerHTML = '';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = cart.reduce((sum, item) => sum + ((item.original - item.price) * item.quantity), 0);

    cartItems.innerHTML = `
        <div style="background: #0f0f0f; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem; color: var(--muted); border-left: 3px solid var(--gold);">
            📦 You have <strong style="color: var(--gold);">${cart.length} item(s)</strong> in your cart
        </div>
        ${cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/120x120?text=${encodeURIComponent(item.name)}'" />
                <div>
                    <h3 style="margin: 0 0 8px 0; color: var(--gold); font-size: 1.05rem;">${item.name}</h3>
                    <div class="small" style="margin-bottom: 8px;">Price: <strong style="color: #fff;">৳${item.price.toLocaleString()}</strong> each</div>
                    <div class="small">Subtotal: <strong style="color: var(--gold);">৳${(item.price * item.quantity).toLocaleString()}</strong></div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" style="width: 70px; padding: 8px; background: #0f0f0f; border: 1px solid #333; border-radius: 6px; color: #fff; text-align: center; font-weight: 600;" />
                    <span class="small">Qty</span>
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; gap: 10px;">
                    <div style="color: var(--gold); font-weight: 700; font-size: 1.2rem;">৳${(item.price * item.quantity).toLocaleString()}</div>
                    <button class="buy" style="padding: 8px 12px; margin: 0; font-size: 0.85rem; background: #3d0b0b; color: #ff9999; border: 1px solid #663333;" onclick="removeFromCart(${item.id})">🗑️ Remove</button>
                </div>
            </div>
        `).join('')}
    `;

    summary.innerHTML = `
        <div style="margin-bottom: 25px;">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>৳${total.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Your Savings</span>
                <span style="color: #adffad; font-weight: 700;">-৳${savings.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee</span>
                <span style="color: #adffad; font-weight: 700;">FREE</span>
            </div>
            <div class="summary-row total">
                <span>Total Amount</span>
                <span style="font-size: 1.4rem;">৳${total.toLocaleString()}</span>
            </div>
        </div>
        <button class="cta" style="width: 100%; padding: 16px; margin-bottom: 15px; font-size: 1.1rem;" onclick="checkout()">✓ Proceed to Checkout</button>
        <a href="index.html" style="display: block; text-align: center; padding: 12px; background: #0f0f0f; border-radius: 8px; color: var(--gold); text-decoration: none; font-weight: 600; transition: all 0.3s;" onmouseover="this.style.backgroundColor='#1a1a1a'" onmouseout="this.style.backgroundColor='#0f0f0f';">← Continue Shopping</a>
    `;
}

function checkout() {
    if (cart.length === 0) return;
    location.href = 'order.html';
}

// Filter Products
function filterByCategory(category) {
    const links = document.querySelectorAll('.catlist a');
    links.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Price Filter Function
function filterByPrice(sortType) {
    let filtered = [...products];

    if (sortType === 'low-to-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-to-low') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === 'under-1000') {
        filtered = filtered.filter(p => p.price < 1000);
    } else if (sortType === '1000-5000') {
        filtered = filtered.filter(p => p.price >= 1000 && p.price <= 5000);
    } else if (sortType === 'above-5000') {
        filtered = filtered.filter(p => p.price > 5000);
    }

    renderProducts(filtered);
}

// Display Featured Product
function displayFeaturedProduct() {
    const featured = products.find(p => p.featured === true);
    const section = document.getElementById('featuredSection');
    
    if (!featured || !section) return;
    
    // Show the section
    section.style.display = 'block';
    
    // Populate featured product data
    const imageToShow = (featured.images && featured.images.length > 0) ? featured.images[0] : featured.image;
    document.getElementById('featuredImage').src = imageToShow;
    document.getElementById('featuredImage').onerror = function() {
        this.src = `https://via.placeholder.com/300x350?text=${encodeURIComponent(featured.name)}`;
    };
    document.getElementById('featuredName').textContent = featured.name;
    document.getElementById('featuredDesc').textContent = featured.description;
    document.getElementById('featuredPrice').textContent = '৳' + featured.price.toLocaleString();
    document.getElementById('featuredOriginal').textContent = '৳' + featured.original.toLocaleString();
    document.getElementById('featuredRating').textContent = featured.rating + '/5';
    document.getElementById('featuredSales').textContent = featured.sales;
    document.getElementById('featuredAddBtn').onclick = function(e) {
        e.preventDefault();
        addToCart(featured.id);
    };
}

// Search
function search() {
    const query = document.querySelector('.searchbar input').value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProduct();
    renderProducts();
    renderHeroSlides();
    updateCartCount();

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Listen for localStorage changes (cross-tab) and update UI accordingly
window.addEventListener('storage', function(e) {
    if (e.key === 'products') {
        try {
            const updated = JSON.parse(e.newValue);
            if (Array.isArray(updated)) {
                products = updated;
            }
        } catch (err) {
            // ignore parse errors
        }
        // Update featured and product grid
        displayFeaturedProduct();
        renderProducts();
        updateCartCount();
    }
    if (e.key === 'heroItems') {
        try {
            const updated = JSON.parse(e.newValue);
            if (Array.isArray(updated)) heroItems = updated;
        } catch (err) {}
        renderHeroSlides();
    }
});

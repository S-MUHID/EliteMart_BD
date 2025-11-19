// Shared Header Component
function loadHeader() {
    const headerHTML = `
        <header>
            <div class="header-top">
                <a href="index.html" class="logo">
                    <div class="mark" style="background: linear-gradient(135deg, #d9b24a, #a67c38); box-shadow: 0 4px 15px rgba(217, 178, 74, 0.4); font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">
                        ✨
                    </div>
                    <div>
                        <h1 style="background: linear-gradient(135deg, #d9b24a, #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1.4rem;">EliteMart</h1>
                        <div style="color:var(--muted);font-size:0.9rem">🇧🇩 Premium Fashion & Gadgets</div>
                    </div>
                </a>

                <div class="toplinks">
                    <a class="badge" href="orders.html">📦 My Orders</a>
                    <a class="badge" href="cart.html" style="position: relative;">
                        🛒 Cart
                        <span class="cart-count" style="display: none;">0</span>
                    </a>
                    <div id="customerArea"></div>
                </div>
            </div>

            <div class="header-search">
                <div class="searchbar">
                    <input placeholder="Search for products, e.g. massage gun, earbuds..." />
                    <button class="searchbtn" onclick="search()">Search</button>
                </div>
            </div>
        </header>
    `;

    // Insert header at the beginning of body
    const headerContainer = document.createElement('div');
    headerContainer.innerHTML = headerHTML;
    document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);
    document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);

    // Update customer area based on login status
    updateCustomerArea();

}

function updateCustomerArea() {
    const customerArea = document.getElementById('customerArea');
    if (!customerArea) return;

    const isLoggedIn = sessionStorage.getItem('customerLoggedIn') === 'true';
    const customerName = sessionStorage.getItem('customerName') || 'Customer';

    if (isLoggedIn) {
        customerArea.innerHTML = `
            <div class="badge" style="background: linear-gradient(135deg, var(--gold), #a67c38); color: #000; font-weight: 600;">
                👤 ${customerName}
                <button onclick="logoutCustomer()" style="margin-left: 8px; padding: 4px 8px; background: #000; color: var(--gold); border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Logout</button>
            </div>
        `;
    } else {
        customerArea.innerHTML = `
            <a class="badge" href="customer-login.html" style="background: linear-gradient(135deg, var(--gold), #a67c38); color: #000; font-weight: 600;">
                🔐 Login
            </a>
            <a class="badge" href="customer-signup.html" style="background: #8a2be2; box-shadow: 0 0 10px rgba(138, 43, 226, 0.4);">
                ✨ Sign Up
            </a>
        `;
    }
}

// (Announcement manager removed) No announcement banner rendered here.

function logoutCustomer() {
    sessionStorage.removeItem('customerLoggedIn');
    sessionStorage.removeItem('customerEmail');
    sessionStorage.removeItem('customerName');
    updateCustomerArea();
    // Redirect to home if on protected page
    if (window.location.pathname.includes('order.html') || window.location.pathname.includes('orders.html')) {
        window.location.href = 'index.html';
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only load header if it doesn't already exist
    if (!document.querySelector('header')) {
        loadHeader();
    } else {
        // If header exists, just update customer area
        updateCustomerArea();
    }
});

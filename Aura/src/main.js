import './style.css'
import 'flowbite';
import emailjs from '@emailjs/browser';

// ==========================================
// EMAIL SUBSYSTEM & NOTIFICATION ENGINE
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing toast if active to prevent stacking clutter
    const existingToast = document.getElementById('aura-toast');
    if (existingToast) existingToast.remove();

    const iconSuccess = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    const iconError = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    // Build the dynamic toast node matching AURA's layout
    const toast = document.createElement('div');
    toast.id = 'aura-toast';
    toast.className = `fixed bottom-5 right-5 z-50 flex items-center p-4 w-[calc(100%-2.5rem)] sm:max-w-sm bg-zinc-900/90 backdrop-blur-md border ${type === 'success' ? 'border-green-500/20' : 'border-red-500/20'} rounded-xl shadow-2xl transition-all duration-300 translate-y-5 opacity-0`;
    
    toast.innerHTML = `
        <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${type === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}">
            ${type === 'success' ? iconSuccess : iconError}
        </div>
        <div class="ms-3 text-sm font-medium text-white/90">${message}</div>
    `;

    document.body.appendChild(toast);

    // Smooth entry slide transition
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-5', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Automatically slide out and dismiss after 4.5 seconds
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-5', 'opacity-0');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 4500);
}

const form = document.querySelector("#contactForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Form field validation state check
        const nameInput = document.getElementById("name")?.value.trim();
        const emailInput = document.getElementById("email")?.value.trim();
        const messageInput = document.getElementById("message")?.value.trim();

        if (!nameInput || !emailInput || !messageInput) {
            showNotification("Please fill out all fields before sending.", "error");
            return;
        }

        // Add loading state UI feedback to the submit button
        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn ? submitBtn.innerText : "Send Message";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }

        emailjs.sendForm(
            "service_nicx404",
            "template_ppcw69u",
            form,
            "rwUnVH7YBl9VTIXVk"
        )
        .then(() => {
            showNotification("Message sent successfully! We'll get back to you soon.", "success");
            form.reset();
        })
        .catch(() => {
            showNotification("Failed to send message. Please try again later.", "error");
        })
        .finally(() => {
            // Restore original interactive layout state to the button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    });
}

const products = [
    {
        id: 1,
        name: "Minimalist Watch",
        desc: "A timeless piece for everyday wear.",
        rating: 4.9,
        reviews: 128,
        img: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Premium Wallet",
        desc: "Handcrafted slim genuine leather companion.",
        rating: 4.7,
        reviews: 84,
        img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" 
    },
    {
        id: 3,
        name: "Ceramic Mug",
        desc: "Perfect matte finish for your morning espresso ritual.",
        rating: 4.8,
        reviews: 215,
        img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Desk Lamp",
        desc: "Architectural targeted lighting for your workspace.",
        rating: 4.9,
        reviews: 342,
        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60"
    }
];

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Interior Designer",
        text: "The minimalist aesthetic of AURA products is unmatched. Every piece I've ordered feels like a deliberate piece of art.",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Marcus Chen",
        role: "Tech Lead",
        text: "Quality that you can feel. The desk essentials transformed my workspace into a place of focus and calm.",
        avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    {
        name: "Elena Rodriguez",
        role: "Photographer",
        text: "Sustainability meets style. It's rare to find a brand that cares as much about the planet as they do about design.",
        avatar: "https://i.pravatar.cc/150?u=elena"
    },
    {
        name: "Julian Vane",
        role: "Creative Director",
        text: "AURA isn't just a store; it's a lifestyle. Their curated selection saved me hours of searching for the perfect home essentials.",
        avatar: "https://i.pravatar.cc/150?u=julian"
    }
];

let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

const iconCart = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`;
const iconCheck = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
const iconStar = `<svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

function renderProducts(searchQuery = "") {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = '';

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="w-full py-12 flex flex-col items-center justify-center col-span-full">
                <p class="text-white/40 text-base">No items found matching "${searchQuery}"</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const isInCart = cart.includes(product.id);
        
        const cardHTML = `
            <div class="snap-start shrink-0 w-[82vw] sm:w-[45vw] md:w-auto bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-5 flex flex-col items-center relative transition-all duration-300 hover:bg-white/15">
                <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
                
                <h3 class="text-lg font-semibold text-white/90 mb-1">${product.name}</h3>
                
                <div class="flex items-center space-x-1 mb-3">
                    ${iconStar}
                    <span class="text-sm text-white/80 font-medium">${product.rating} <span class="text-white/40 font-normal">(${product.reviews})</span></span>
                </div>

                <p class="text-sm text-white/60 mb-5 text-center grow">${product.desc}</p>
                
                <div class="flex items-center justify-center space-x-3 mt-auto w-full">
                    <button data-detail-id="${product.id}" class="view-details-btn text-white/80 bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition">View Details</button>
                    
                    <button data-product-id="${product.id}" class="cart-btn relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${isInCart ? 'bg-green-700 text-white border border-green-600' : 'bg-white/20 text-white/80 hover:bg-white/30 border border-transparent'}">
                        ${isInCart ? iconCheck : iconCart}
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderTestimonials() {
    const track1 = document.getElementById('testimonial-track-1');
    const track2 = document.getElementById('testimonial-track-2');
    
    if (!track1 || !track2) return;

    const testimonialHTML = testimonials.map(t => `
        <div class="w-87.5 md:w-112.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/10 hover:border-white/20">
            <div class="flex space-x-1 mb-4">
                ${Array(5).fill(`<svg class="w-4 h-4 text-brand-700" fill="white" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join('')}
            </div>
            <p class="text-white/70 italic text-sm md:text-base leading-relaxed mb-8">
                "${t.text}"
            </p>
            <div class="flex items-center space-x-4">
                <img src="${t.avatar}" alt="${t.name}" class="w-12 h-12 rounded-full border border-white/20">
                <div>
                    <h4 class="text-white/90 font-semibold text-sm">${t.name}</h4>
                    <p class="text-white/40 text-xs">${t.role}</p>
                </div>
            </div>
        </div>
    `).join('');

    track1.innerHTML = testimonialHTML;
    track2.innerHTML = testimonialHTML; 
}

function setupSearch() {
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderProducts(e.target.value);
        });
    }
}

function updateCartStateOnUI(productId, add) {
    const cardSelectors = document.querySelectorAll(`.cart-btn[data-product-id="${productId}"]`);
    cardSelectors.forEach(btn => {
        if (add) {
            btn.className = "cart-btn relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 bg-green-700 text-white border border-green-600";
            btn.innerHTML = iconCheck;
        } else {
            btn.className = "cart-btn relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 bg-white/20 text-white/80 hover:bg-white/30 border border-transparent";
            btn.innerHTML = iconCart;
        }
    });

    const modalBtn = document.querySelector(`.modal-cart-btn[data-product-id="${productId}"]`);
    if (modalBtn) {
        if (add) {
            modalBtn.className = "modal-cart-btn w-full bg-white/5 backdrop-blur-md border border-green-500/40 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center space-x-2";
            modalBtn.innerHTML = `<span class="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">${iconCheck}</span> <span>Added to Cart</span>`;
        } else {
            modalBtn.className = "modal-cart-btn w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center space-x-2 border border-transparent";
            modalBtn.innerHTML = `<span class="text-white/80">${iconCart}</span> <span>Add to Cart</span>`;
        }
    }
}

function openProductModal(productId) {
    const modal = document.getElementById('product-modal');
    const product = products.find(p => p.id === productId);
    if (!modal || !product) return;

    const isInCart = cart.includes(product.id);
    const modalBtnClass = isInCart 
        ? 'bg-white/5 backdrop-blur-md border border-green-500/40 text-white' 
        : 'bg-white/20 hover:bg-white/30 text-white border border-transparent';
        
    const modalBtnInner = isInCart 
        ? `<span class="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">${iconCheck}</span> <span>Added to Cart</span>` 
        : `<span class="text-white/80">${iconCart}</span> <span>Add to Cart</span>`;

    modal.innerHTML = `
        <div class="relative bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl transition-transform duration-300 scale-95 opacity-0" id="modal-content">
            <button id="close-modal" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition" aria-label="Close modal">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div class="w-full md:w-1/2 h-48 sm:h-64 md:h-auto bg-black/20 relative shrink-0">
                <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto no-scrollbar">
                <div class="mb-6">
                    <span class="text-xs font-bold tracking-[0.2rem] text-white/40 uppercase block mb-2">Product Details</span>
                    <h2 class="text-xl md:text-2xl font-semibold text-white/90 mb-2">${product.name}</h2>
                    <div class="flex items-center space-x-1 mb-4">
                        ${iconStar}
                        <span class="text-sm text-white/80 font-medium">${product.rating} <span class="text-white/40 font-normal">(${product.reviews} reviews)</span></span>
                    </div>
                    <p class="text-sm text-white/60 leading-relaxed">${product.desc}</p>
                </div>
                <div class="mt-auto pt-5 border-t border-white/5">
                    <button data-product-id="${product.id}" class="modal-cart-btn w-full ${modalBtnClass} font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center space-x-2">
                        ${modalBtnInner}
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('pointer-events-none', 'opacity-0');
    modal.classList.add('opacity-100');
    
    requestAnimationFrame(() => {
        const content = document.getElementById('modal-content');
        if (content) content.classList.remove('scale-95', 'opacity-0');
    });
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content');
    if (!modal) return;

    if (content) {
        content.classList.add('scale-95', 'opacity-0');
    }
    
    setTimeout(() => {
        modal.classList.add('pointer-events-none', 'opacity-0');
        modal.classList.remove('opacity-100');
    }, 200);
}

function setupSliderControls() {
    const container = document.getElementById('product-container');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (!container || !prevBtn || !nextBtn) return;

    const getScrollOffset = () => {
        const firstCard = container.firstElementChild;
        return firstCard ? firstCard.offsetWidth + 20 : 300;
    };

    nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    });
}

document.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('.cart-btn');
    if (cartBtn) {
        const id = parseInt(cartBtn.getAttribute('data-product-id'));
        if (!cart.includes(id)) {
            cart.push(id);
            updateCartStateOnUI(id, true);
        } else {
            cart = cart.filter(item => item !== id);
            updateCartStateOnUI(id, false);
        }
        localStorage.setItem('aura_cart', JSON.stringify(cart));
        return;
    }

    const detailBtn = e.target.closest('.view-details-btn');
    if (detailBtn) {
        const id = parseInt(detailBtn.getAttribute('data-detail-id'));
        openProductModal(id);
        return;
    }

    const modalCartBtn = e.target.closest('.modal-cart-btn');
    if (modalCartBtn) {
        const id = parseInt(modalCartBtn.getAttribute('data-product-id'));
        if (!cart.includes(id)) {
            cart.push(id);
            updateCartStateOnUI(id, true);
        } else {
            cart = cart.filter(item => item !== id);
            updateCartStateOnUI(id, false);
        }
        localStorage.setItem('aura_cart', JSON.stringify(cart));
        return;
    }

    if (e.target.id === 'product-modal' || e.target.closest('#close-modal')) {
        closeProductModal();
    }
});

renderProducts();
setupSliderControls();
setupSearch();

document.addEventListener('DOMContentLoaded', () => {
    renderTestimonials();
});
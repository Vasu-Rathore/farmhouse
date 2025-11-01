// script.js — interactions & product rendering
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {
      id: 'wheat-01',
      name: 'Premium Wheat Seeds',
      desc: 'High-yield, disease-resistant wheat seeds for great harvests.',
      img: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1200&q=60',
      price: '₹120 / kg'
    },
    
    {
      id: 'corn-01',
      name: 'Hybrid Corn Seeds',
      desc: 'Organic-hybrid corn seeds optimized for yield and drought tolerance.',
      img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=60',
      price: '₹140 / kg'
    },
    
   
,
  
  {
    id: 'rice-01',
    name: 'Paddy (Rice) Seeds',
    desc: 'Superior germination rate rice seeds for top grain quality.',
    img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80',
    price: '₹95 / kg'
  },
  
  
  {
    id: 'veg-01',
    name: 'Vegetable Seeds Pack',
    desc: 'Premium seeds for tomato, chili, brinjal, and okra.',
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    price: '₹150 / pack'
  },
  

  ];

  // Render products
  const grid = document.getElementById('productsGrid');
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="media" role="img" aria-label="${escapeHtml(p.name)} image">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
      </div>
      <h3>${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(p.desc)}</p>
      <div class="meta">
        <div class="price">${escapeHtml(p.price)}</div>
        <button class="btn" data-id="${p.id}">Buy / Enquire</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Button handlers
  document.getElementById('exploreBtn').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  // Delegate buy/enquire clicks
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const product = products.find(x => x.id === id);
    if (product) {
      // In production you'd open a modal or go to product page. For now show prompt:
      alert(`Product: ${product.name}\nPrice: ${product.price}\n\nContact us to place an order.`);
    }
  });

  // Contact form handling
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }
    // Minimal email pattern check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please provide a valid email.');
      return;
    }
    // Simulate send (replace with server call in production)
    console.log('Contact submission', { name, email, message });
    alert(`Thank you, ${name}! Your message has been sent. We will contact you soon.`);
    form.reset();
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    form.reset();
  });

  // Simple mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle.addEventListener('click', () => {
    const open = nav.style.display === 'block';
    nav.style.display = open ? '' : 'block';
    navToggle.setAttribute('aria-expanded', String(!open));
  });

  // year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// small utility to avoid injection when injecting strings
function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[m]));
}

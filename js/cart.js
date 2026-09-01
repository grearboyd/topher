/* ==========================================================================
   COLDSMOKE — cart storage
   Cart is a plain object keyed by "productId::size" -> { id, size, qty }
   persisted to localStorage so it survives across pages and visits.
   ========================================================================== */

const CART_KEY = "topher_cart_v1";

function readCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.warn("Cart could not be read, starting fresh.", e);
    return {};
  }
}

function writeCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size, qty){
  qty = qty || 1;
  const key = productId + "::" + size;
  const cart = readCart();
  if(cart[key]){
    cart[key].qty += qty;
  }else{
    cart[key] = { id: productId, size: size, qty: qty };
  }
  writeCart(cart);
}

function setQty(key, qty){
  const cart = readCart();
  if(!cart[key]) return;
  if(qty <= 0){
    delete cart[key];
  }else{
    cart[key].qty = qty;
  }
  writeCart(cart);
}

function removeFromCart(key){
  const cart = readCart();
  delete cart[key];
  writeCart(cart);
}

function clearCart(){
  writeCart({});
}

function cartLines(){
  const cart = readCart();
  return Object.keys(cart).map(key => {
    const entry = cart[key];
    const product = typeof findProduct === "function" ? findProduct(entry.id) : null;
    return { key, product, size: entry.size, qty: entry.qty };
  }).filter(line => line.product);
}

function cartCount(){
  const cart = readCart();
  return Object.values(cart).reduce((sum, e) => sum + e.qty, 0);
}

function cartSubtotal(){
  return cartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}

const SHIPPING_FLAT = 9;
const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.086;

function shippingCost(subtotal){
  if(subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

function taxAmount(subtotal){
  return subtotal * TAX_RATE;
}

function orderTotal(subtotal){
  return subtotal + shippingCost(subtotal) + taxAmount(subtotal);
}

function formatUSD(n){
  return "$" + n.toFixed(2);
}

function updateCartBadge(){
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

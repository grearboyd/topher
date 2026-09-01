/* ==========================================================================
   TOPHER — shared page behavior
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if(typeof ICONS !== "undefined" && ICONS.logomark){
    document.querySelectorAll(".mark").forEach(el => el.innerHTML = ICONS.logomark);
  }

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(toggle && links){
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
});

/**
 * Builds one product card element wired with a size selector and
 * an add-to-cart button. Reused by every shop/category page.
 */
function buildProductCard(product){
  const card = document.createElement("article");
  card.className = "product-card";

  const tagHtml = product.sale ? `<span class="tag" style="background:var(--moss-deep);">Sale</span>` : (product.tag ? `<span class="tag">${product.tag}</span>` : "");
  const photoInner = product.photo
    ? `<img src="${product.photo}" alt="${product.name}" loading="lazy">`
    : (ICONS[product.icon] || "");

  card.innerHTML = `
    <div class="product-photo${product.photo ? " has-photo" : ""}">${tagHtml}${photoInner}</div>
    <div class="product-body">
      <h3>${product.name}</h3>
      <p class="desc">${product.desc}</p>
      <div class="size-row" role="group" aria-label="Select size"></div>
      <div class="product-meta">
        <span class="price">${formatUSD(product.price)}</span>
        <button type="button" class="btn btn-small btn-solid add-btn">Add to cart</button>
      </div>
    </div>
  `;

  const sizeRow = card.querySelector(".size-row");
  let selectedSize = product.sizes[0];
  product.sizes.forEach((size, i) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "size-chip";
    chip.textContent = size;
    chip.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    chip.addEventListener("click", () => {
      selectedSize = size;
      sizeRow.querySelectorAll(".size-chip").forEach(c => c.setAttribute("aria-pressed","false"));
      chip.setAttribute("aria-pressed","true");
    });
    sizeRow.appendChild(chip);
  });

  const addBtn = card.querySelector(".add-btn");
  addBtn.addEventListener("click", () => {
    addToCart(product.id, selectedSize, 1);
    const original = addBtn.textContent;
    addBtn.textContent = "Added ✓";
    addBtn.disabled = true;
    setTimeout(() => { addBtn.textContent = original; addBtn.disabled = false; }, 1100);
  });

  return card;
}

/**
 * Renders a list of products into a grid container by element id.
 * Pass emptyHtml to customize the message shown when there's nothing to show
 * (used for the honest "coming soon" states on Kids' and Sale pages).
 */
function renderProductGrid(containerId, products, emptyHtml){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = "";
  if(products.length === 0){
    grid.innerHTML = emptyHtml || `<p style="padding:24px 0;">No products match those filters yet.</p>`;
    return;
  }
  products.forEach(p => grid.appendChild(buildProductCard(p)));
}

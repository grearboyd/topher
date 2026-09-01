# Topher website — launch & editing guide

This is a plain HTML/CSS/JS site. No build step, no server, no database.
Open `index.html` in a browser and it works as-is.

## 1. Launching it

1. **Preview locally** — double-click `index.html`. Click around, add something
   to cart, make sure it feels right.
2. **Pick a static host** — Netlify, Vercel, or GitHub Pages all work fine and
   have free tiers. Netlify is the easiest if you don't want to touch a
   terminal.
3. **Deploy with Netlify Drop** — go to `netlify.com/drop` and drag the whole
   `topher` folder onto the page. You'll get a live URL in about 30 seconds
   (e.g. `topher-xyz123.netlify.app`).
4. **Connect a real domain** — buy the domain from any registrar, then in
   Netlify: Domain settings → Add custom domain → follow the DNS steps.
   Free HTTPS is automatic.

### Before you take this fully live

- **Checkout is a UI demo, not a real payment flow.** Wire up a real
  processor (Stripe is standard) before accepting real orders.
- **The contact form doesn't send email yet.** On Netlify, add
  `data-netlify="true"` to the `<form id="contact-form">` tag in
  `contact.html` and Netlify will email you submissions — no backend needed.
  On other hosts, use a service like Formspree.
- **The cart is stored per-browser** (localStorage), not in a shared
  database. Normal for now, but it means a customer's cart won't follow
  them to a different device.

## 2. Editing products & prices

Open `js/products.js`. Every product is one block:

```js
{ id:"fw-01", cat:"footwear", name:"Camper Shoe", price:89, icon:"camper",
  desc:"Quilted slip-on with a built-in sock fit and a removable outsole...",
  sizes:["8","9","10","11","12","13"], tag:"Best seller" },
```

- **Change a price** → edit `price`. Updates everywhere automatically
  (product grid, cart, checkout, totals).
- **Change name/description** → edit `name` / `desc`.
- **Add a product** → copy a block, give it a unique `id`, set `cat` to
  `footwear`, `apparel`, or `campgoods`. It appears on `shop.html` and its
  category page with zero HTML editing.
- **Remove a product** → delete its block.
- **The "New" / "Best seller" ribbon** → controlled by `tag`. Set to
  `null` (or delete the key) to remove it, or change the text.
- **Icon** → `icon` picks a line-art icon from the `ICONS` object at the
  top of the same file. Add a new SVG there if you need a new icon, or
  swap the whole system for real photography (see below).

### Adding a whole new category

1. Add an entry to `CATEGORY_INFO` at the bottom of `products.js`.
2. Copy `shop-campgoods.html`, rename it, and change the line
   `const CATEGORY = "campgoods";` near the bottom to your new category key.
3. Add a nav/footer link to the new page across the other HTML files.

### Swapping icons for real product photos

In `js/main.js`, the `buildProductCard()` function builds the
`.product-photo` div using the inline icon. Replace that with an
`<img src="images/your-photo.jpg">` once real photography exists — happy
to make this change once photos are ready.

## 3. Editing page copy

Each `.html` file is plain text — headlines, the footbed story, contact
info, etc. can all be edited directly in any text editor. The nav bar and
footer repeat on every page, so a change there (like a phone number) needs
to be made in each file, or ask Claude to do a find-and-replace pass across
all pages at once.

## 4. Colors & fonts

All at the top of `css/styles.css`, under `:root`. For example:

```css
--rust: #AA4A22;   /* accent color — buttons, tags, promo band */
--moss: #565640;   /* product icon color */
--canvas: #F1E9D8; /* page background */
```

Change a value there and it updates across the whole site.

## File map

```
index.html              Home page
shop.html                All products + filters
shop-footwear.html        Footwear category
shop-apparel.html         Apparel category
shop-campgoods.html       Camp Goods category
contact.html              Contact form
cart.html                 Shopping cart
checkout.html              Checkout + confirmation
css/styles.css             All design tokens, colors, layout
js/products.js              Product catalog + icons (edit here most often)
js/cart.js                  Cart storage logic (rarely needs edits)
js/main.js                  Shared nav + product card rendering
```

/* ==========================================================================
   TOPHER — product catalog
   Line-art icons stand in for photography where no product shot exists yet.

   Schema:
     type    "footwear" | "clothing" | "accessories"
     gender  array of audiences this product is shown under: "mens","womens","kids"
             (most current products are unisex-sized, so they carry both
             "mens" and "womens" — there's no separate kids line yet)
     sale    true/false — drives the Sale page. Nothing is discounted yet;
             flip this + set salePrice when a real promotion is decided.
   ========================================================================== */

const ICONS = {
  logomark: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 30l12-16 10 12 8-9 18 22"/><path d="M10 40c6-3 10-3 14 0s10 3 14 0 10-3 14 0"/></svg>`,

  camper: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 44c0-9 7-12 16-15l9-7 7 3-3 5 13 4c7 2 9 4 9 8a4 4 0 01-4 4H12a4 4 0 01-4-4z"/><path d="M14 40c4-2 8-2 11 0M27 36c4-2 8-2 11 0M40 33c3-1 6-1 9 1M18 26l4 5"/><path d="M42 22c3 0 4 3 2 5"/></svg>`,

  moc: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 42c0-8 8-10 18-13l6-11 8 4-2 6 8 2c8 2 10 4 10 9a5 5 0 01-5 5H13a5 5 0 01-5-5z"/><path d="M26 22l4 8M30 19c2 3 6 3 8 1"/><circle cx="31" cy="21" r="1.4" fill="currentColor" stroke="none"/></svg>`,

  sockslide: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 46c0-6 3-9 8-9V19a6 6 0 0112 0v6h6a14 14 0 0114 14v3a4 4 0 01-4 4H16a4 4 0 01-4-4z"/><path d="M20 22h12M20 27h12M20 32h12"/><circle cx="20" cy="38" r="2.2" fill="currentColor" stroke="none"/></svg>`,

  fishingboot: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8h14v24l12 6c6 3 8 5 8 9a5 5 0 01-5 5H13a5 5 0 01-5-5V8z" /><path d="M20 16h14M20 22h14M8 44c8-3 16-3 24 0"/><path d="M48 30c3 1 5 3 5 6"/></svg>`,

  hikingboot: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6h16v20l14 8c6 3 8 6 8 11a5 5 0 01-5 5H11a5 5 0 01-5-5V6z"/><path d="M18 12h16M18 18h16M18 24h16M10 46h38M14 50h30"/></svg>`,

  roamer: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 42c0-8 7-11 17-14l8-8 7 3-2 5 12 4c7 2 9 4 9 8a4 4 0 01-4 4H12a4 4 0 01-4-4z"/><path d="M8 42h48" stroke-dasharray="1 5"/><circle cx="32" cy="26" r="3"/></svg>`,

  teecraw: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 10l9 6 9-6 9 8-6 7-3-2v29H23V23l-3 2-6-7z"/><path d="M28 34c0-3 2-5 4-5s4 2 4 5-2 6-4 6-4-3-4-6z"/></svg>`,

  teelogo: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 10l9 6 9-6 9 8-6 7-3-2v29H23V23l-3 2-6-7z"/><path d="M25 24l7-9 7 9"/></svg>`,

  longsleeve: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 10l9 6 9-6 12 6-5 10-6-3v31H23V23l-6 3-5-10z"/></svg>`,

  mug: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18h28v22a8 8 0 01-8 8H22a8 8 0 01-8-8z"/><path d="M42 24h5a6 6 0 010 12h-5"/><path d="M22 10c0 3 3 4 3 7M30 10c0 3 3 4 3 7"/></svg>`,

  patch: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M18 34l10-13 8 9 6-7 10 16"/><path d="M20 40c6-3 10-3 14 0s8 3 12 0"/></svg>`,

  bag: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 26c0-3 2-5 5-5h22c3 0 5 2 5 5v20c0 8-7 12-16 12s-16-4-16-12z"/><path d="M20 21l3-8M44 21l-3-8"/><circle cx="32" cy="14" r="2" fill="currentColor" stroke="none"/></svg>`,
};

const PRODUCTS = [
  // ---- footwear -------------------------------------------------
  { id:"fw-01", type:"footwear", gender:["mens","womens"], sale:false, name:"Camper Shoe", price:89, icon:"camper", photo:"images/camper-shoe.jpg",
    desc:"Quilted slip-on with a built-in sock fit and a removable outsole. For outside. Inside. Everywhere.",
    sizes:["8","9","10","11","12","13"], tag:"Best seller" },
  { id:"fw-02", type:"footwear", gender:["mens","womens"], sale:false, name:"Moc Slipper", price:69, icon:"moc", photo:"images/moc-slipper.jpg",
    desc:"Suede moc with fleece lining and a hand-stitched vamp. Camp comfort, everywhere.",
    sizes:["8","9","10","11","12","13"] },
  { id:"fw-03", type:"footwear", gender:["mens","womens"], sale:false, name:"Camp Sock Slide", price:79, icon:"sockslide", photo:"images/sock-slide.jpg",
    desc:"Knit collar with a one-hand drawcord toggle. Adjust, slip in, tighten up, head out.",
    sizes:["8","9","10","11","12","13"], tag:"New" },
  { id:"fw-04", type:"footwear", gender:["mens","womens"], sale:false, name:"Fly Fishing Boot", price:169, icon:"fishingboot", photo:"images/fishing-boot.jpg",
    desc:"Quick-dry upper with drainage ports and a Vibram Megagrip sole for wet rocks.",
    sizes:["8","9","10","11","12","13"] },
  { id:"fw-05", type:"footwear", gender:["mens","womens"], sale:false, name:"Hiking Boot", price:159, icon:"hikingboot", photo:"images/hiking-boot.jpg",
    desc:"Waterproof, cushioned, and trail-tested — built to go far and stay comfortable.",
    sizes:["8","9","10","11","12","13"] },
  { id:"fw-06", type:"footwear", gender:["mens","womens"], sale:false, name:"The Roamer", price:99, icon:"roamer",
    desc:"Our newest camper shoe, built around the Topher Footbed. Same shoe, different ground, more outside.",
    sizes:["8","9","10","11","12","13"], tag:"New" },

  // ---- clothing -----------------------------------------------------
  { id:"cl-01", type:"clothing", gender:["mens","womens"], sale:false, name:"\u201cWho's Your Craw Daddy\u201d Tee", price:32, icon:"teecraw", photo:"images/craw-daddy-tee.jpg",
    desc:"Heavyweight cotton tee with a hand-illustrated crawdad on the back. It's a whole bit.",
    sizes:["S","M","L","XL","XXL"], tag:"Best seller" },
  { id:"cl-02", type:"clothing", gender:["mens","womens"], sale:false, name:"Topher Peak Tee", price:28, icon:"teelogo",
    desc:"Left-chest logo up front, mountain graphic on the back. The everyday one.",
    sizes:["S","M","L","XL","XXL"] },
  { id:"cl-03", type:"clothing", gender:["mens","womens"], sale:false, name:"Campfire Long Sleeve", price:44, icon:"longsleeve",
    desc:"Midweight long sleeve for the walk from the fire back to the tent.",
    sizes:["S","M","L","XL","XXL"], tag:"New" },

  // ---- accessories ----------------------------------------------------
  { id:"ac-01", type:"accessories", gender:["mens","womens"], sale:false, name:"\u201cTuff-er\u201d Camp Mug", price:18, icon:"mug", photo:"images/camp-mug.jpg",
    desc:"Speckled enamel mug that finally settles how to say it. It's pronounced \u201cTuff-er.\u201d",
    sizes:["One Size"], tag:"Best seller" },
  { id:"ac-02", type:"accessories", gender:["mens","womens"], sale:false, name:"Topher Patch", price:8, icon:"patch", photo:"images/patch.jpg",
    desc:"Embroidered mountain-and-river patch for hats, packs, or wherever it looks good.",
    sizes:["One Size"] },
  { id:"ac-03", type:"accessories", gender:["mens","womens"], sale:false, name:"Pack-It-Out Stuff Sack", price:14, icon:"bag", photo:"images/stuff-sack.jpg",
    desc:"The drawstring sack your Camper Shoes ship in — handy for muddy soles or anything else.",
    sizes:["One Size"], tag:"New" },
];

// Type info — used within each audience page for the Footwear/Clothing/Accessories filter chips
const TYPE_INFO = {
  footwear:    { label:"Footwear" },
  clothing:    { label:"Clothing" },
  accessories: { label:"Accessories" },
};

// Audience info — the four top-level shop entry points
const AUDIENCE_INFO = {
  mens:   { label:"Men's",   page:"men.html",   blurb:"Camper shoes, tees, and camp goods." },
  womens: { label:"Women's", page:"women.html", blurb:"Camper shoes, tees, and camp goods." },
  kids:   { label:"Kids'",   page:"kids.html",  blurb:"Kids' gear is on the way." },
  sale:   { label:"Sale",    page:"sale.html",  blurb:"Discounted gear, while it lasts." },
};

function findProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

function productsFor(gender, type){
  return PRODUCTS.filter(p => {
    const genderMatch = gender === "sale" ? p.sale === true : p.gender.includes(gender);
    const typeMatch = !type || type === "all" ? true : p.type === type;
    return genderMatch && typeMatch;
  });
}

export const tasks = [
  {
    number: "001",
    title: "$0 Checkout Error (100% Coupon)",
    status: "Resolved",
    priority: false,
    dateAdded: "Jan 7, 2026",
    dateResolved: "Jan 7, 2026",
    source: "WhatsApp",
    hours: 1.5,
    issue: "Free shipping option was not appearing at checkout even when a valid free shipping coupon was applied.",
    investigation: "Created test coupon with 100% discount + 'Allow free shipping' enabled. Product discount applied correctly, but Free Shipping never appeared as a shipping option. Tested with Gunmetal product (PC-UPS_AIR shipping class). WooCommerce settings were correct , Free Shipping method existed and required 'A valid free shipping coupon.' Temporarily changed product to 'No shipping class' and Free Shipping appeared, confirming shipping classes were blocking it. Traced the issue to the Conditional Shipping Methods plugin which had 4 rulesets using 'Enable only selected shipping methods' without Free Shipping included in the allowed list.",
    likelyCauses: [
      "Conditional Shipping Methods plugin rulesets using 'Enable only selected shipping methods' action",
      "Free Shipping method not included in the allowed methods list for any shipping class",
      "Four rulesets affected: air+ground, Ground, Kits, UPS Walcom Direct"
    ],
    solution: "Added 'USA - Free shipping (#3)' to the 'Enable only selected shipping methods' action in all 4 rulesets (air+ground, Ground, Kits, UPS Walcom Direct) within WooCommerce > Settings > Shipping > Conditional Shipping Methods. Free Shipping now appears alongside other shipping options when a valid coupon is applied. Verified with test orders , $0 checkout works correctly.",
    notes: "Affected 222 products across 5 shipping classes. Only added Free Shipping to existing rules , nothing removed. To revert: remove Free shipping (#3) from Action #1 in those 4 rulesets. Also discovered during investigation: (1) Critical error on product save , logged as TASK-006. (2) Duplicate UPS options at checkout , added to backlog."
  },
  {
    number: "002",
    title: "Remove Mobile Menu Animation",
    status: "Open",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "Remove swipe up animation on mobile menu.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: ""
  },
  {
    number: "003",
    title: "iOS Shop Page Scroll/Footer Bug",
    status: "Open",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "On the shop page on mobile (specifically iPhone), scrolling gets blocked partway down , won't go further until it randomly allows more scrolling. Footer also loads before all products are visible.",
    investigation: "iOS Safari + WooCommerce lazy loading conflict. iOS Safari calculates page height before new products load, so user scrolls to what Safari thinks is the 'end', footer renders prematurely, then products load via AJAX and height recalculates.",
    likelyCauses: [
      "AJAX product filters or infinite scroll plugin",
      "Elementor smooth scroll conflicting with iOS momentum scrolling",
      "Lazy load on product images (ShortPixel, Jetpack, or theme-level)",
      "Deprecated -webkit-overflow-scrolling: touch CSS"
    ],
    solution: "",
    notes: "Likely fix: disable infinite scroll or set min-height on product container"
  },
  {
    number: "004",
    title: "Training Course Access for Account Holders",
    status: "Open",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "Anyone with an account should have access to training videos , not tied to purchases.",
    investigation: "Need to investigate how training access is currently gated.",
    likelyCauses: [],
    solution: "",
    notes: ""
  },
  {
    number: "005",
    title: "Find an Installer Map , Info Card Z-Index",
    status: "Open",
    priority: false,
    dateAdded: "Jan 7, 2026",
    source: "WhatsApp",
    hours: 0,
    issue: "When clicking an installer pin on the map, the info card appears behind other pins instead of on top.",
    investigation: "Z-index issue on the map info window/popup. Google Maps info windows should auto-raise, but custom styling or conflicting CSS may be overriding.",
    likelyCauses: [],
    solution: "",
    notes: "Reproduced once on MacBook Safari, cannot reproduce on Chrome. Appears to be Safari-specific under specific circumstances (map size, positioning, viewport size, etc)."
  },
  {
    number: "006",
    title: "Plugin Audit",
    status: "Open",
    priority: false,
    dateAdded: "Jan 7, 2026",
    dateResolved: "",
    source: "",
    hours: 0,
    issue: "Review and audit all installed plugins for updates, conflicts, and necessity.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: ""
  }
  // {
  //   number: "007",
  //   title: "Critical Error on Product Save",
  //   status: "Open",
  //   priority: false,
  //   dateAdded: "Jan 7, 2026",
  //   dateResolved: "",
  //   source: "Discovered during TASK-001 investigation",
  //   hours: 0,
  //   issue: "When saving/updating a product in WooCommerce admin, a 'critical error' page displays after clicking Update. However, the save still works, changes are persisted.",
  //   investigation: "Observed when changing shipping class on Gunmetal product. Error appeared on save but site remained functional and changes saved successfully.",
  //   likelyCauses: [
  //     "Plugin conflict during product save hook",
  //     "PHP memory or timeout issue",
  //     "Outdated plugin compatibility"
  //   ],
  //   solution: "",
  //   notes: "Low priority since saves work correctly. Check WooCommerce logs or enable WP_DEBUG to capture specific error."
  // }
];

export const billingInfo = {
  currentPeriod: "January 7-31, 2026",
  periodNote: "3 weeks this period. Biweekly (week over week) starting February.",
  rate: 70,
  stripeLink: "#stripe-link"
};

export const clientInfo = {
  client: "Peelclear",
  contacts: ["Jon Frain", "Arash Sayadirad"],
  communication: "WhatsApp group"
};

export const providerInfo = {
  name: "Keystone Web Solutions",
  contact: "Dan Bray",
  rate: "$70/hour",
  increments: "15-minute increments",
  contractSigned: "January 2026"
};

export const backlog = [
  {
    item: "Duplicate UPS shipping options at checkout",
    source: "Jan 7 investigation",
    priority: "Low",
    notes: "Multiple UPS Ground options appearing in shipping method selector"
  }
];

export const stats = {
  totalHours: 1.50,
  totalAmountDue: 105.00,
  openTasks: 5,
  resolvedTasks: 1
};

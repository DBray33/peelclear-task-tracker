// Last updated: Jan 12, 2026
export const tasks = [
  {
    number: "001a",
    title: "Free Shipping Not Appearing with Coupon",
    status: "Resolved",
    priority: false,
    dateAdded: "Jan 7, 2026",
    dateResolved: "Jan 7, 2026",
    source: "WhatsApp",
    hours: 1.5,
    issue: "Free shipping option was not appearing at checkout even when a valid free shipping coupon was applied.",
    investigation: "Created test coupon with 100% discount + 'Allow free shipping' enabled. Product discount applied correctly, but Free Shipping never appeared as a shipping option. Tested with Gunmetal product (PC-UPS_AIR shipping class). WooCommerce settings were correct, Free Shipping method existed and required 'A valid free shipping coupon.' Temporarily changed product to 'No shipping class' and Free Shipping appeared, confirming shipping classes were blocking it. Traced the issue to the Conditional Shipping Methods plugin which had 4 rulesets using 'Enable only selected shipping methods' without Free Shipping included in the allowed list.",
    likelyCauses: [
      "Conditional Shipping Methods plugin rulesets using 'Enable only selected shipping methods' action",
      "Free Shipping method not included in the allowed methods list for any shipping class",
      "Four rulesets affected: air+ground, Ground, Kits, UPS Walcom Direct"
    ],
    solution: "Added 'USA - Free shipping (#3)' to the 'Enable only selected shipping methods' action in all 4 rulesets (air+ground, Ground, Kits, UPS Walcom Direct) within WooCommerce > Settings > Shipping > Conditional Shipping Methods. Free Shipping now appears alongside other shipping options when a valid coupon is applied.",
    notes: "Affected 222 products across 5 shipping classes. Only added Free Shipping to existing rules, nothing removed. To revert: remove Free shipping (#3) from Action #1 in those 4 rulesets."
  },
  {
    number: "001b",
    title: "$0 Checkout Failing with 100% Coupon",
    status: "Resolved",
    priority: true,
    dateAdded: "Jan 9, 2026",
    dateResolved: "Jan 12, 2026",
    source: "WhatsApp (Arash reported coupon 'spon12345' not working)",
    hours: 1.5,
    issue: "When a coupon discounted the cart to $0.00 (including free shipping), checkout could fail with 'There was an error processing your order.' In the Payment Information step, no payment options rendered (Stripe/PayPal/COD not shown), so no payment_method was being submitted.",
    investigation: "Coupons applied correctly and free shipping appeared (per 001a fix). Failures occurred specifically when total hit $0.00 and the checkout UI did not render any gateways. ROOT CAUSE DISCOVERY: The checkout is not stock WooCommerce. It is rendered via Elementor Theme Builder Single Page 'Checkout' template (Template ID 59837) which uses a WooLentor/ShopLentor Pro Multi-Step Checkout widget (WooLentor template ID 59818). This custom multi-step/AJAX checkout can re-evaluate totals and gateways during step transitions, making cart-total-based gateway forcing unreliable.",
    likelyCauses: [
      "Elementor Theme Builder Single Page 'Checkout' template intercepting /checkout/ (Template ID 59837)",
      "WooLentor/ShopLentor Pro Multi-Step Checkout widget renders checkout (WooLentor template ID 59818)",
      "Multi-step AJAX checkout re-evaluates gateways during step transitions",
      "At $0 totals, gateways may not render consistently and payment_method may not post"
    ],
    solution: "Left the site in a clean baseline state with no forced gateways. Deactivated the '$0 checkout - force No payment required gateway' PHP snippet and disabled Cash on Delivery (including removing the 'No payment required' label). After running Elementor's Data Updater to complete the pending database update, multiple test orders using a 100% off coupon (total = $0.00) were completed successfully. Paid checkout was also verified to show Stripe (card) and PayPal only.",
    trialAndError: "Attempted fix (rolled back): Enabled COD and relabeled it as 'No payment required,' then added a PHP snippet to force COD for $0 totals and hide COD for paid totals. This initially allowed a $0 order to complete but was later reported as unsafe because the WooLentor/ShopLentor multi-step/AJAX flow can re-evaluate totals/gateways during step transitions and intermittently expose the 'No payment required' option to paid carts, creating a free-order risk. Rolled back by turning the snippet OFF and disabling COD.",
    notes: "TESTING COUPON: 'spon12345 - copy' (Percentage, 100% off, Allow free shipping enabled). Agent was temporarily changed from 'arash-1993' to 'admin' during testing to avoid notifications. PRE-FIX TEST: $0.00 checkout produced the generic processing error and did not render payment options. POST-FIX TEST (attempted fix): $0.00 order completed with 'No payment required' shown as payment method, then later determined unsafe and rolled back. ELEMENTOR RECOVERY: Elementor Data Updater completed, which restored proper template rendering on /checkout/ after toggling multi-step settings caused the checkout form to disappear temporarily. FINAL VALIDATION: With snippet OFF and COD OFF, multiple $0 coupon test orders completed successfully and paid checkout rendered Stripe/PayPal normally. Test orders were cleaned up (cancelled/trashed) after validation."
  },
  {
    number: "002",
    title: "iOS Shop Page Scroll/Footer Bug",
    status: "Open",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "On the shop page on mobile (specifically iPhone), scrolling gets blocked partway down, won't go further until it randomly allows more scrolling. Footer also loads before all products are visible.",
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
    number: "003",
    title: "Training Course Access for Account Holders",
    status: "Open",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "Anyone with an account should have access to training videos, not tied to purchases.",
    investigation: "Need to investigate how training access is currently gated.",
    likelyCauses: [],
    solution: "",
    notes: "Related to [005]. Client wants to verify training video uploads as part of this work."
  },
  {
    number: "005",
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
  },
  {
    number: "004",
    title: "Training Videos Upload Verification",
    status: "Open",
    priority: false,
    dateAdded: "Jan 9, 2026",
    dateResolved: "",
    source: "WhatsApp (Arash)",
    hours: 0,
    issue: "Verify all training videos are uploaded correctly. Also add 'Sample Kit' video to the training section.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: "",
    resources: [
      { name: "Training Series Pt.1 (Gabriel)", url: "https://www.dropbox.com/scl/fo/9wu7dde28sewhaw8ziqqe/AG6YBzY3gh1W-FfVkNKRD7k?rlkey=6fplyk523hahm02kz3nm1dbf0&st=8vpbexx5&dl=0" },
      { name: "Training Series Pt.2", url: "https://www.dropbox.com/scl/fo/fbecz31ihatu7ewplzryw/AGxRtSWzl-3aUcfJZ0Wgr-g?rlkey=tqpup3ohdyeut37g0x09ayhen&st=0icqq1md&dl=0" },
      { name: "PeelClear Sample Kit Guide", url: "https://www.dropbox.com/scl/fi/0n4q78p1imqhqssdq8p28/PeelClear-Sample-Kit-Guidemov.mov?rlkey=bgu9pr6fpqhcq9pwqhyk5c06j&st=n8azcel0&dl=0" }
    ]
  },
  {
    number: "006",
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
    number: "007",
    title: "Mobile Hero Background Video + Desktop Fallback Poster",
    status: "Resolved",
    priority: false,
    dateAdded: "Jan 13, 2026",
    dateResolved: "Jan 13, 2026",
    source: "WhatsApp",
    hours: 0.5,
    issue: "Implement a mobile-specific vertical hero background video while retaining the existing horizontal video for desktop/tablet. Update the desktop/tablet fallback (poster) image to a new still.",
    investigation: "Elementor does support background video playback on mobile when 'Play On Mobile' is enabled. The Video Link field in this context behaves as global, so using one container caused the mobile video to appear on desktop/tablet as well. Resolution: use separate inner hero containers per breakpoint and control visibility via Elementor responsive settings (no custom JS/CSS required).",
    likelyCauses: [],
    solution: "ELEMENTOR HERO STRUCTURE: Within the main Hero section, created/confirmed two inner containers (Desktop/tablet hero and Mobile hero). Applied responsive visibility: Desktop/tablet hero has Hide on Mobile = YES, Hide on Desktop/Tablet = NO. Mobile hero has Hide on Desktop = YES, Hide on Tablet = YES, Hide on Mobile = NO. BACKGROUND VIDEO URLS: Desktop/Tablet (horizontal) uses https://peelclear.com/wp-content/uploads/2025/10/tiffany.mohasesi_s-Video-Oct-7-2025-VEED.mp4. Mobile (vertical) uses https://peelclear.com/wp-content/uploads/2026/01/THIS-ISNT-PAINT-NO-TEXT-mobile.mp4. MOBILE PLAYBACK: In the Mobile hero container Style > Background > Video, Play On Mobile toggled to YES. DESKTOP/TABLET FALLBACK IMAGE: Updated from tesla-peel-scaled.png to tiffany.mohasesi_s-Video-Oct-7-2025-VEED-poster.jpg.",
    notes: "RESULT: Mobile now displays and plays the vertical hero background video. Desktop/Tablet continue to display the horizontal hero background video. Desktop/Tablet fallback image updated to the new poster still. No custom JavaScript/CSS required, implemented fully within Elementor using container duplication + responsive visibility. ROLLBACK: Revert fallback image back to https://peelclear.com/wp-content/uploads/2025/10/tesla-peel-scaled.png. Remove/disable Mobile hero container and restore a single hero container with the desktop/tablet video if desired.",
    resources: [
      { name: "Mobile Video (Vertical)", url: "https://peelclear.com/wp-content/uploads/2026/01/THIS-ISNT-PAINT-NO-TEXT-mobile.mp4" },
      { name: "Desktop/Tablet Video (Horizontal)", url: "https://peelclear.com/wp-content/uploads/2025/10/tiffany.mohasesi_s-Video-Oct-7-2025-VEED.mp4" },
      { name: "New Fallback Poster", url: "https://peelclear.com/wp-content/uploads/2026/01/tiffany.mohasesi_s-Video-Oct-7-2025-VEED-poster.jpg" },
      { name: "Old Fallback Image", url: "https://peelclear.com/wp-content/uploads/2025/10/tesla-peel-scaled.png" }
    ]
  },
  {
    number: "008",
    title: "Find an Installer Map - Info Card Z-Index",
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
];

export const uiUpdates = [
  {
    date: "Jan 12, 2026",
    hours: 0.25,
    pending: [],
    updates: [
      "Footer UI/UX fixes - copyright text alignment issues on mobile/tablet (container padding, align content)",
      "Changed mobile menu logo to new block logo, reduced size from 80px to 60px (client requested 40px but it was too small)"
    ],
    notes: "Client requested spacing added to footer company info, but it was already done by someone else.",
    resources: []
  },
  {
    date: "Jan 9, 2026",
    hours: 0.5,
    pending: [],
    updates: [
      "Updated navbar logo with correct color from Brandfolder assets",
      "Changed nav cart icon color to white for better contrast against orange background",
      "Adjusted hero section responsive styling for tablet and mobile",
      "Reduced 'Peelable Automotive Paint' subheading font size on tablet (fits one line) and mobile",
      "Reduced CTA button sizes on tablet and mobile",
      "Added 20px top margin to buttons on tablet/mobile to prevent overlap with subheading",
      "Added text shadow to subheading for better legibility against video background",
      "Wrapped CTA buttons in dedicated container for responsive control",
      "Set button container to row direction on desktop and tablet (buttons side by side, centered)",
      "Mobile remains stacked for better tap targets on narrow screens"
    ],
    resources: [
      { name: "Primary Logo - Orange Box", url: "https://www.dropbox.com/scl/fo/0segx649rqich347wj36m/AB4aY9KlgeS_ioZXG-h7eTs?rlkey=a14qaibg1cgsmbe78brx7rzma&st=dgyw47fb&dl=0" }
    ]
  }
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
  totalHours: 4.25,
  totalAmountDue: 297.50,
  openTasks: 6,
  resolvedTasks: 3
};

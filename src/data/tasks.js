// Last updated: Jan 20, 2026
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
    priority: false,
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
    status: "Resolved",
    priority: false,
    dateAdded: "Jan 5, 2026",
    dateResolved: "Jan 16, 2026",
    source: "Teams meeting",
    hours: 1.75,
    issue: "On the shop page on mobile (specifically iPhone), scrolling gets blocked partway down, won't go further until it randomly allows more scrolling. Footer also loads before all products are visible.",
    investigation: "iOS Safari + WooCommerce lazy loading conflict. iOS Safari calculates page height before new products load, so user scrolls to what Safari thinks is the 'end', footer renders prematurely, then products load via AJAX and height recalculates. Debug environment: Safari iPhone Web Inspector (Develop > dan iPhone > peelclear.com > /shop) used to inspect DOM/CSS and validate behavior in real iOS Safari.",
    likelyCauses: [
      "AJAX product filters or infinite scroll plugin",
      "Elementor smooth scroll conflicting with iOS momentum scrolling",
      "Lazy load on product images (ShortPixel, Jetpack, or theme-level)",
      "Deprecated -webkit-overflow-scrolling: touch CSS"
    ],
    solution: "Two fixes applied: (1) Changed Elementor Kit Custom CSS from 'html, body { overflow-x: hidden !important; }' to 'body { overflow-x: hidden !important; }' to resolve iOS Safari scroll stall. (2) Modified WL: Product Grid - Modern widget in Elementor Theme Builder template 'Elementor Products Archive' (Instances: All Product Archives) to use 2 columns on mobile and reduced Add to Cart / Select Options typography for mobile. Both fixes resolved respective issues.",
    notes: "Likely fix: disable infinite scroll or set min-height on product container",
    sessionNotes: [
      {
        date: "Jan 15, 2026",
        summary: "Scroll hangs at consistent point (around '3M PPS Series 1.0 Adapter'), footer appears over product grid before all products visible. After short wait or bounce, scrolling resumes.",
        confirmed: [
          "Product card markup uses WooLentor grid (wrapper: woolentor-product-item, image class: woolentor-product-img, grid: #woolentor-grid-69691e58674f6)",
          "Product images include explicit width/height (300x300) and srcset, no obvious Rocket-specific lazy attributes visible"
        ],
        testsCompleted: [
          {
            test: "WP Rocket exclusion test (targeted)",
            action: "Added 'woolentor-product-img' under WP Rocket > Media > Excluded images or iframes, saved + cleared cache",
            result: "NOT FIXED (same hang point + footer overlay)",
            rolledBack: true
          },
          {
            test: "ShopLentor/WooLentor Quick View test (JS/feature isolation)",
            settingsBefore: "Module ON, Quick View on Shop/Archive OFF, AJAX add to cart ON, Thumbnail layout Slider, Social share ON",
            action: "Toggled module Enable/Disable to OFF, saved, cleared cache",
            result: "NOT FIXED (scroll hang + footer overlay still present). Quick View button displayed but modal no longer opened.",
            rolledBack: true,
            rollbackConfirmed: "Quick View opens again after restoring"
          },
          {
            test: "WP Rocket CSS background lazy-load test",
            action: "Disabled WP Rocket > Media > LazyLoad > 'Enable for CSS background images', saved + cleared cache",
            result: "NOT FIXED (same iOS hang point, footer overlay persists)",
            rolledBack: true
          },
          {
            test: "DevTools inspection (initial)",
            action: "Searched for overflow/scroll-container culprits",
            result: "Only notable match: grecaptcha-badge (overflow:hidden, position:fixed, visibility:hidden). Not considered causal (hidden reCAPTCHA badge widget).",
            rolledBack: false
          },
          {
            test: "DevTools check (body/html computed overflow)",
            action: "Inspected computed styles on html and body elements",
            result: "html overflow: hidden auto (x hidden, y auto). body overflow: hidden auto. html/body height: ~12734.6px. body position: static. body transform: none. INFERENCE: iOS Safari scroll hang may be caused by overflow-y:auto applied to html/body (known to create scroll-container quirks on long pages).",
            rolledBack: false
          }
        ],
        nextSteps: [
          "Add iOS-only CSS to force html/body overflow-y: visible while keeping overflow-x: hidden, then retest iPhone"
        ]
      },
      {
        date: "Jan 16, 2026",
        summary: "FINAL RESOLUTION: Both scroll hang and footer overlay issues resolved.",
        debugEnvironment: "Reproduced + debugged using Safari iPhone Web Inspector / iPhone development environment (Develop > dan iPhone > peelclear.com > /shop) to inspect DOM/CSS and validate behavior in real iOS Safari.",
        confirmed: [
          "Found Elementor-generated CSS in PeelClear Kit template (Post ID 8, post-8.css?ver=1.1715794642): html, body { overflow-x: hidden !important; }",
          "Applying overflow-x hidden to <html> is the trigger for iOS Safari scroll-stall behavior",
          "A/B proof: reverting to html, body made the stall return immediately, switching back to body-only removed it again"
        ],
        testsCompleted: [
          {
            test: "Fix #1: Change overflow rule in Elementor Kit",
            action: "Changed Site Settings > Custom CSS FROM: html, body { overflow-x: hidden !important; } TO: body { overflow-x: hidden !important; }",
            result: "iOS Safari scroll hang STOPPED",
            rolledBack: false
          },
          {
            test: "A/B Confirmation",
            action: "Reverted to html, body rule, then switched back to body-only",
            result: "Reverting caused scroll hang to RETURN immediately. Body-only removed hang again. Root cause confirmed.",
            rolledBack: false
          },
          {
            test: "Fix #2: Product Grid Layout (resolved footer symptom)",
            action: "Modified Elementor Theme Builder template 'Elementor Products Archive' (Instances: All Product Archives). Widget: WL: Product Grid - Modern. Content > Layout > Columns: set to Two (mobile). Style: reduced Add to Cart / Select Options typography for mobile so buttons are not oversized.",
            result: "Shop page looks correct on mobile. Footer no longer appears before the product grid finishes.",
            rolledBack: false
          }
        ],
        additionalNotes: "Also corrected invalid CSS syntax in same block: .otgs-development-site-front-end { display: none !important; } (unrelated to scroll issue). Revert shortcut: https://peelclear.com/wp-admin/post.php?post=8&action=elementor",
        currentStatus: "FULLY RESOLVED. Scroll hang: fixed via body-only overflow rule. Footer overlay: fixed via 2-column mobile grid layout.",
        nextSteps: []
      }
    ]
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
    notes: "Related to [009]. Client wants to verify training video uploads as part of this work."
  },
  {
    number: "009",
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
    status: "Resolved",
    priority: false,
    dateAdded: "Jan 5, 2026",
    dateResolved: "Jan 16, 2026",
    source: "Teams meeting",
    hours: 1,
    issue: "ElementsKit mobile/offcanvas hamburger menu was sliding up (animated reveal) on all breakpoints where the hamburger menu is visible (including iPhone Safari). Multiple Customizer 'Additional CSS' attempts did not reliably override the animation (worked in DevTools but not on the live build).",
    investigation: "ElementsKit's frontend CSS / active-state rules were overriding Customizer 'Additional CSS' due to cascade/order and/or optimization ordering. DevTools worked because inline 'element style' wins.",
    likelyCauses: [
      "ElementsKit frontend CSS overriding Customizer Additional CSS",
      "Cascade/order and optimization ordering issues",
      "Active-state rules with higher specificity"
    ],
    solution: "Added a Code Snippets (PHP) snippet (frontend) named 'ElementsKit Offcanvas - Disable Animation'. Snippet registers/enqueues an empty stylesheet handle (peelclear-ekit-offcanvas-noanim) and injects late-loading inline CSS override via wp_add_inline_style() targeting ElementsKit offcanvas wrapper/panel/overlay classes (including hyphen and underscore variants). Forces: transition: none !important, animation: none !important, transition-delay: 0s !important. Result: offcanvas/hamburger menu opens instantly with no slide animation.",
    notes: "CLEANUP: Remove all ElementsKit/offcanvas animation-related rules previously added in Appearance > Customize > Additional CSS. Keep only unrelated CSS (e.g., YITH Store Locator rules and commented 'Hide Register' block). Clear and preload WP Rocket cache after cleanup. ROLLBACK: Disable or delete the Code Snippets snippet, then clear and preload WP Rocket cache (and any CDN cache if applicable). Selector testing showed some ElementsKit nodes differ by template/context (e.g., .ekit-sidebar-widget existed but .ekit-sidebar-widget-container not always present), so the snippet targets multiple likely nodes and active-state class variants."
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
  {
    number: "010",
    title: "Legal Compliance Pages + Consent Checkbox",
    status: "Open",
    priority: true,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting (Jon)",
    hours: 0,
    issue: "Set up legal/compliance pages and add consent checkboxes to checkout and contact forms.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    tasks: [
      "Jon has created Privacy Policy and Terms and Conditions pages - need to link in footer",
      "Jon to create Refund/Return Policy page",
      "Jon to create Shipping Policy page",
      "Add all 4 policy pages to footer navigation",
      "Add required consent checkbox to WooCommerce checkout: 'I agree to the Privacy Policy, Terms and Conditions, and SMS communications' with link to Privacy Policy (Code Snippet needed)",
      "Add same consent checkbox to Contact form in Gravity Forms (same form used on homepage and Become an Installer page)"
    ],
    notes: "Reference CeramicPro's footer/policy pages as template. Checkout uses ShopLentor multi-step checkout widget, may need testing. Supersedes [005]."
  },
  {
    number: "011",
    title: "Remove Unused Plugins and Plugin Bloat",
    status: "Open",
    priority: true,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting (performance audit)",
    hours: 0,
    issue: "Site has 49 active plugins and 35 inactive plugins causing 3.5s server response time. Client approved cleanup.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    tasks: [
      "Delete 35 inactive plugins (LearnDash suite, WPML suite, duplicate free versions, unused membership plugins)",
      "Audit Essential Addons - 82 of 115 widgets enabled, most unused. Disable unused widgets.",
      "Review if Essential Addons can be fully removed (ElementsKit handles nav/menu)",
      "Enable WP Rocket 'Remove Unused CSS' and 'Delay JavaScript Execution'",
      "Deactivate: Child Theme Configurator, WP File Manager (security risk), User Switching",
      "Review: Site Kit (redundant if GTM handles GA4), WP Sheet Editor plugins (occasional use)"
    ],
    notes: "Current scores: Mobile 33/100, Desktop 43/100. Target after cleanup: Mobile 50-55, Desktop 65-75. Full audit document created."
  },
  {
    number: "012",
    title: "Reduce Mobile Animations",
    status: "Open",
    priority: true,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "Homepage has entrance animations and scroll effects adding JavaScript processing overhead on mobile.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: "Asked client Jan 16 if animations should be removed after fixing mobile menu animation. No response then. Now approved as part of performance cleanup. Check Elementor motion effects settings on homepage sections."
  },
  {
    number: "013",
    title: "Compress Site Assets",
    status: "Open",
    priority: true,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting (performance audit)",
    hours: 0,
    issue: "Page size is 14-23 MB, should be under 3 MB. Heavy video and image files.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    tasks: [
      "Compress tesla-peel-scaled.png (2.7 MB PNG to ~200 KB WebP)",
      "Compress or replace mobile hero video (currently 5.9 MB)",
      "Compress desktop hero video (currently 6.5 MB)",
      "Run ShortPixel bulk optimization on all images",
      "Enable WebP conversion in ShortPixel"
    ],
    notes: "Use ShortPixel (~$5/month) for image compression and WebP conversion. Client was warned Jan 12 that mobile video would impact performance but insisted on adding it."
  },
];

export const uiUpdates = [
  {
    date: "Jan 16, 2026",
    hours: 0.25,
    pending: [
      "Add spacing above PayPal button on product page (Add to Order button touching Pay with PayPal)"
    ],
    updates: [
      "Fixed grammatical error on checkout coupon text: 'Apply coupon code to get a discount. Collect coupons by shopping more.'",
      "Removed right padding on mobile checkout column",
      "Added 20px left padding to tablet checkout column",
      "Added 20px margin between contact/shipping/payment card and coupon application card on mobile and tablet",
      "Checkout page now centered with proper card spacing"
    ],
    notes: "",
    resources: []
  },
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
  totalHours: 7.25,
  totalAmountDue: 507.50,
  openTasks: 8,
  inProgressTasks: 0,
  resolvedTasks: 5
};

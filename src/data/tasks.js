// Last updated: Feb 17, 2026

// Billing periods - semi-monthly within calendar months
export const billingPeriods = [
  {
    id: "jan-7-31-2026",
    label: "Jan 7-31",
    fullLabel: "January 7-31, 2026",
    startDate: "2026-01-07",
    endDate: "2026-01-31",
    note: "Startup period (3.5 weeks)",
    status: "paid",
    invoiceNumber: "KWS-PEEL-202601-00",
    invoiceDate: "January 31, 2026",
    billingPeriodLabel: "January 7 - January 31, 2026",
    billingNote: "Initial startup period (approximately 3.5 weeks)"
  },
  {
    id: "feb-1-15-2026",
    label: "Feb 1-15",
    fullLabel: "February 1-15, 2026",
    startDate: "2026-02-01",
    endDate: "2026-02-15",
    note: "",
    status: "pending",
    invoiceNumber: "KWS-PEEL-202602-A",
    invoiceDate: "February 17, 2026",
    billingPeriodLabel: "February 1 - February 15, 2026",
    billingNote: ""
  },
  {
    id: "feb-16-28-2026",
    label: "Feb 16-28",
    fullLabel: "February 16-28, 2026",
    startDate: "2026-02-16",
    endDate: "2026-02-28",
    note: "",
    status: "current",
    invoiceNumber: "KWS-PEEL-202602-B",
    invoiceDate: "February 28, 2026",
    billingPeriodLabel: "February 16 - February 28, 2026",
    billingNote: ""
  }
];

// Period-specific notes and Q&As from calls
export const periodNotes = [
  {
    billingPeriod: "feb-1-15-2026",
    title: "Notes & Q&A",
    date: "Jan 31, 2026",
    source: "Phone call",
    items: [
      {
        label: "Image Uploads",
        content: "JPG for all photos (products, lifestyle, hero images). PNG only when transparency is needed (logos, icons, overlays). ShortPixel compresses both but JPGs are significantly smaller for photographic content. If team is uploading product photos as PNGs, switch to JPG."
      },
      {
        label: "WooCommerce-Only Access",
        content: "WordPress has a built-in 'Shop Manager' role. Gives full WooCommerce access (orders, products, customers, reports) with zero access to themes, plugins, Elementor, or site settings. Create a new user with Shop Manager role for any non-web team members who need store access."
      }
    ]
  }
];

export const tasks = [
  {
    number: "026",
    title: "Inconsistent Quantity Toggle on Category Page",
    status: "Open",
    billingPeriod: "feb-16-28-2026",
    priority: false,
    dateAdded: "Feb 16, 2026",
    source: "WhatsApp",
    hours: 0,
    issue: "On Ultra Shift category page, some products show +/- quantity toggle buttons while others don't. Should be consistent.",
    investigation: "Check if difference is product type (simple vs variable). May be WooLentor grid widget setting or per-product configuration.",
    likelyCauses: [],
    solution: "",
    notes: ""
  },
  {
    number: "025",
    title: "Ultra Shift Product Images Both Visible (iPhone Safari)",
    status: "Resolved",
    billingPeriod: "feb-16-28-2026",
    priority: false,
    dateAdded: "Feb 16, 2026",
    dateResolved: "Feb 17, 2026",
    source: "WhatsApp",
    hours: 1,
    issue: "Product cards on Ultra Shift category page showed both gallery images stacked and duplicate product content on iPhone Safari only.",
    investigation: "",
    rootCause: "WP Rocket RUCSS stripping display:none rule for .woolentor-list-view-content. Safari 18 content-visibility:auto deferred the hiding.",
    likelyCauses: [],
    solution: "Added woolentor-list-view(.*), woolentor-grid-view(.*), woolentor-product-card(.*) to WP Rocket CSS Safelist. Added Additional CSS override forcing display:none on .woolentor-list-view-content. Cleared Used CSS and cache.",
    notes: "?nowprocket URL parameter confirms WP Rocket as cause of display issues."
  },
  {
    number: "024",
    title: "Cart Quantity Update Not Working",
    status: "Resolved",
    resolvedBy: "Jon",
    billingPeriod: "feb-16-28-2026",
    priority: false,
    dateAdded: "Feb 16, 2026",
    dateResolved: "Feb 16, 2026",
    source: "WhatsApp",
    hours: 0,
    issue: "Cart page quantity toggle (+/-) wasn't updating the cart. Changing quantity to zero did nothing. Reloading page reverted quantity back to original value.",
    investigation: "",
    likelyCauses: [],
    solution: "Client (Jon) found the toggle setting and fixed it.",
    notes: "No developer work required. Resolved by client."
  },
  {
    number: "023",
    title: "Shop Page Image Popup Toggle",
    status: "Resolved",
    resolvedBy: "Jon",
    billingPeriod: "feb-16-28-2026",
    priority: false,
    dateAdded: "Feb 16, 2026",
    dateResolved: "Feb 16, 2026",
    source: "WhatsApp",
    hours: 0,
    issue: "Popup was appearing when clicking on link options on shop pages.",
    investigation: "",
    likelyCauses: [],
    solution: "Client (Jon) deleted and re-added the element with the popup toggle turned off.",
    notes: "No developer work required. Resolved by client."
  },
  {
    number: "001a",
    title: "Free Shipping Not Appearing with Coupon",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
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
    billingPeriod: "jan-7-31-2026",
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
    billingPeriod: "jan-7-31-2026",
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
    number: "006",
    title: "Remove Mobile Menu Animation",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
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
    billingPeriod: "jan-7-31-2026",
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
    number: "013",
    title: "Compress Site Assets",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 20, 2026",
    dateResolved: "Jan 24, 2026",
    source: "Teams meeting (performance audit)",
    hours: 0,
    hoursNote: "Tracked in [014] & [017]",
    issue: "Page size is 14-23 MB, should be under 3 MB. Heavy video and image files.",
    investigation: "",
    likelyCauses: [],
    solution: "All subtasks complete. Hero video compression tracked in [014]. ShortPixel image optimization tracked in [017]. WebP delivery tested and intentionally disabled due to ShopLentor/Elementor compatibility issues.",
    tasks: [
      "[DONE] Compress tesla-peel-scaled.png (2.7 MB PNG to ~200 KB WebP)",
      "[DONE] Compress or replace mobile hero video (currently 5.9 MB)",
      "[DONE] Compress desktop hero video (currently 6.5 MB)",
      "[DONE] Run ShortPixel bulk optimization on all images",
      "[DONE] Enable WebP conversion in ShortPixel (tested, disabled due to compatibility)"
    ],
    notes: "Work tracked in [014] and [017]. WebP delivery tested and intentionally disabled due to ShopLentor/Elementor compatibility issues."
  },
  {
    number: "014",
    title: "Hero Video Compression",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 21, 2026",
    dateResolved: "Jan 21, 2026",
    source: "Performance Audit",
    hours: 0.5,
    issue: "Hero videos totaling 12.2 MB loading on every page view regardless of device.",
    investigation: "",
    likelyCauses: [],
    solution: "Compressed both hero videos using ffmpeg and hosted on Google Cloud Storage with 1-year cache headers. Mobile: 5.8 MB to 1.4 MB. Desktop: 6.4 MB to 1.9 MB. Added 40% dark overlay to mask compression artifacts.",
    notes: "Results: Total video size 12.2 MB to 3.3 MB (73% reduction). Desktop PSI 43 to 61 (+18). Rollback: Replace Elementor hero video URLs with original WordPress Media Library URLs."
  },
  {
    number: "015",
    title: "WP Rocket CSS Optimization",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 21, 2026",
    dateResolved: "Jan 21, 2026",
    source: "Performance Audit",
    hours: 0.5,
    issue: "70+ render-blocking CSS files (433 KB) delaying page rendering.",
    investigation: "",
    likelyCauses: [],
    solution: "Enabled Minify CSS and Remove Unused CSS in WP Rocket > File Optimization.",
    notes: "Results: Mobile TBT 1,450ms to 270ms (-81%). Render-blocking resources eliminated. Rollback: WP Rocket > File Optimization > Uncheck 'Optimize CSS delivery' > Save > Clear cache"
  },
  {
    number: "016",
    title: "Stripe Code Snippet",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 24, 2026",
    dateResolved: "Jan 24, 2026",
    source: "Performance Audit",
    hours: 0.25,
    issue: "WooCommerce Stripe loading 231 KB on every page including homepage.",
    investigation: "",
    likelyCauses: [],
    solution: "Added Code Snippets snippet 'Stripe - Load only on cart/checkout' to block Stripe site-wide. DreamRide still loads its own Stripe (~210 KB). May affect Apple Pay/Google Pay express checkout buttons.",
    notes: "Rollback: Code Snippets > Deactivate 'Stripe - Load only on cart/checkout'"
  },
  {
    number: "017",
    title: "ShortPixel Image Optimization",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 23, 2026",
    dateResolved: "Jan 24, 2026",
    source: "Performance Audit",
    hours: 1,
    issue: "Images not optimized, contributing to page weight.",
    investigation: "",
    likelyCauses: [],
    solution: "Purchased 30K ShortPixel credits ($19.99). Bulk optimized 3,975 images (32% compression). WebP tested but disabled due to compatibility issues with ShopLentor/Elementor.",
    notes: "DO NOT enable WebP delivery on this site - it breaks images. Rollback: ShortPixel > Settings > Advanced > Restore originals"
  },
  {
    number: "018",
    title: "Essential Addons Widget Cleanup",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 24, 2026",
    dateResolved: "Jan 24, 2026",
    source: "Performance Audit",
    hours: 0.5,
    issue: "Essential Addons loading CSS/JS for all 82 widgets site-wide.",
    investigation: "",
    likelyCauses: [],
    solution: "Disabled 79 of 82 widgets (96% reduction). Kept: Advanced Menu, Dual Color Heading, Countdown.",
    notes: "Rollback: Re-enable widgets in Essential Addons > Elements"
  },
  {
    number: "019",
    title: "ElementsKit Widget Cleanup",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 24, 2026",
    dateResolved: "Jan 24, 2026",
    source: "Performance Audit",
    hours: 0.5,
    issue: "ElementsKit loading CSS/JS for all widgets site-wide.",
    investigation: "",
    likelyCauses: [],
    solution: "Disabled ~60 unused widgets. Kept only mobile menu/offcanvas functionality. Cannot fully remove without rebuilding navigation.",
    notes: "Rollback: Re-enable widgets in ElementsKit > Elements"
  },
  {
    number: "020",
    title: "WP Rocket JS Delay Fix",
    status: "Resolved",
    billingPeriod: "jan-7-31-2026",
    priority: false,
    dateAdded: "Jan 26, 2026",
    dateResolved: "Jan 26, 2026",
    source: "Performance Audit",
    hours: 1.5,
    issue: "Site scoring 37 mobile / 67 desktop. TBT over 1,000ms.",
    investigation: "Most time spent in Chrome DevTools debugging, analyzing network waterfall and main thread activity to identify what was causing the slow load, and troubleshooting potential fixes. Developed a custom PageSpeed Insights benchmark tool to run statistically rigorous tests (3 warmup + 15 measurement runs per change) to accurately measure impact of each optimization. Root Cause: Regex in WP Rocket Delay JS exclusions was disabling the entire feature: (?:/wp-content/|/wp-includes/)(.)",
    likelyCauses: [],
    solution: "Removed the line. Kept only jquery and js-before/after exclusions.",
    notes: "Results: Mobile 30s to 60-90. Desktop 67 to 95-100. TBT 1,077ms to 0ms. Site passes Core Web Vitals. Verified Working: Visualizer, contact form, add to cart, Stripe checkout all functional. Rollback: Add back (?:/wp-content/|/wp-includes/)(.) to WP Rocket exclusions"
  },
  // February 1-15 resolved tasks
  {
    number: "022",
    title: "PA Tax Exemption Setup",
    status: "Resolved",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Feb 2, 2026",
    dateResolved: "Feb 12, 2026",
    source: "Phone call (Jan 31)",
    hours: 0.75,
    issue: "Per-user product tax exemption for Pennsylvania orders. Shipping tax still charged.",
    investigation: "",
    likelyCauses: [],
    solution: "Implemented three-part system:\n\n1. Zero Rate Tax Class (WooCommerce > Settings > Tax > Zero rate rates)\n   - Country: US, State: * (all), Rate: 0.0000, Shipping: unchecked\n\n2. Code Snippet \"PA Tax Exempt - User Profile Field\"\n   - Adds checkbox to user profiles under \"Tax Exemption\" heading\n   - Saves to user meta as pa_tax_exempt\n\n3. Code Snippet \"PA Tax Exempt - Tax Calculation\"\n   - Hooks into WooCommerce tax calculation\n   - Sets product tax class to Zero Rate when: user logged in + pa_tax_exempt = '1' + shipping state is PA\n   - Only affects product tax, not shipping\n\nModified: WooCommerce > Settings > Tax > \"Shipping tax class\" changed from \"based on cart items\" to \"Standard\" so shipping always uses Standard rate.",
    testResults: [
      "No exemption, PA shipping: $1.16 tax (baseline)",
      "PA exempt, PA shipping: $0.89 tax (shipping only, product tax removed)",
      "PA exempt, CA shipping: $1.44 tax (full CA tax, exemption doesn't apply)"
    ],
    notes: "Usage: Customer submits REV-1220 certificate > Staff validates > Users > Edit user > Check \"PA Tax Exempt\" box > Save. Rollback: Revert shipping tax setting to \"based on cart items\", deactivate both snippets, remove Zero Rate tax row, clear caches."
  },
  // Open tasks - these carry over to current period
  {
    number: "003",
    title: "Training Course Access for Account Holders",
    status: "Open",
    blocked: "Need Access",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Jan 5, 2026",
    source: "Teams meeting",
    hours: 0,
    issue: "Anyone with an account should have access to training videos, not tied to purchases.",
    investigation: "Need to investigate how training access is currently gated.",
    likelyCauses: [],
    solution: "",
    notes: "Blocked: Need WordPress admin or LMS access to investigate how training access is currently gated. Related to [011]. Client wants to verify training video uploads as part of this work."
  },
  {
    number: "009",
    title: "Plugin Audit",
    status: "Superseded",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Jan 7, 2026",
    dateResolved: "",
    source: "",
    hours: 0,
    issue: "Review and audit all installed plugins for updates, conflicts, and necessity.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: "Merged into [011]."
  },
  {
    number: "004",
    title: "Training Videos Upload Verification",
    status: "Open",
    blocked: "Need Access",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Jan 9, 2026",
    dateResolved: "",
    source: "WhatsApp (Arash)",
    hours: 0,
    issue: "Verify all training videos are uploaded correctly. Also add 'Sample Kit' video to the training section.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    notes: "Blocked: Need WordPress admin or LMS access to verify and upload training videos.",
    resources: [
      { name: "Training Series Pt.1 (Gabriel)", url: "https://www.dropbox.com/scl/fo/9wu7dde28sewhaw8ziqqe/AG6YBzY3gh1W-FfVkNKRD7k?rlkey=6fplyk523hahm02kz3nm1dbf0&st=8vpbexx5&dl=0" },
      { name: "Training Series Pt.2", url: "https://www.dropbox.com/scl/fo/fbecz31ihatu7ewplzryw/AGxRtSWzl-3aUcfJZ0Wgr-g?rlkey=tqpup3ohdyeut37g0x09ayhen&st=0icqq1md&dl=0" },
      { name: "PeelClear Sample Kit Guide", url: "https://www.dropbox.com/scl/fi/0n4q78p1imqhqssdq8p28/PeelClear-Sample-Kit-Guidemov.mov?rlkey=bgu9pr6fpqhcq9pwqhyk5c06j&st=n8azcel0&dl=0" }
    ]
  },
  {
    number: "008",
    title: "Find an Installer Map - Info Card Z-Index",
    status: "Open",
    blocked: "Potential Non-Issue",
    billingPeriod: "feb-1-15-2026",
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
    billingPeriod: "feb-1-15-2026",
    priority: true,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting (Jon)",
    hours: 0,
    priorPeriodHours: { "jan-7-31-2026": { hours: 0.75, note: "Footer links + checkout consent checkbox" } },
    issue: "Set up legal/compliance pages and add consent checkboxes to checkout and contact forms.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    tasks: [
      "[DONE] Jon has created Privacy Policy and Terms and Conditions pages - need to link in footer",
      "[DONE] Jon to create Refund/Return Policy page",
      "Jon to create Shipping Policy page",
      "[DONE] Add Privacy Policy, Terms and Conditions, and Return Policy links to footer navigation",
      "[DONE] Add consent checkbox to WooCommerce checkout with terms and privacy policy links",
      "Add consent checkbox with privacy/terms links to HubSpot forms (homepage contact form, Become an Installer page) - NEED HUBSPOT ACCESS"
    ],
    notes: "Reference CeramicPro's footer/policy pages as template. Checkout checkbox added: 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy. I have read and agree to the website terms and conditions.' Contact forms are HubSpot (not Gravity Forms). Supersedes [005]."
  },
  {
    number: "011",
    title: "Plugin Audit & Cleanup",
    status: "Open",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Jan 20, 2026",
    source: "Teams meeting (performance audit)",
    hours: 0,
    issue: "Site has 49 active plugins and 35 inactive plugins causing 3.5s server response time. Client approved cleanup.",
    investigation: "",
    likelyCauses: [],
    solution: "",
    tasks: [
      "Delete 35 inactive plugins (LearnDash suite, WPML suite, unused membership plugins). DO NOT delete free versions of plugins that have a paid/pro counterpart (e.g. Essential Addons Free is required for Pro to function).",
      "[DONE] Audit Essential Addons - 82 of 115 widgets enabled, most unused. Disable unused widgets. [see [018]]",
      "Review if Essential Addons can be fully removed (ElementsKit handles nav/menu)",
      "[DONE] Enable WP Rocket 'Remove Unused CSS' and 'Delay JavaScript Execution' [see [015] and [020]]",
      "Deactivate: Child Theme Configurator, WP File Manager (security risk), User Switching",
      "Review: Site Kit (redundant if GTM handles GA4), WP Sheet Editor plugins (occasional use)"
    ],
    notes: "WARNING: Some 'duplicate free versions' are required by their Pro counterparts. Essential Addons Free was deactivated and it broke the Pro version. Before deleting any inactive free plugin, verify it is not a dependency for an active Pro plugin. Essential Addons reduced from 82 to 3 enabled widgets. ElementsKit reduced by ~60 widgets. WP Rocket CSS and JS optimization completed. Remaining: delete 35 inactive plugins, deactivate Child Theme Configurator/WP File Manager/User Switching, review Site Kit and WP Sheet Editor."
  },
  {
    number: "012",
    title: "Reduce Mobile Animations",
    status: "Open",
    billingPeriod: "feb-1-15-2026",
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
    number: "021",
    title: "reCAPTCHA Performance Investigation",
    status: "Open",
    billingPeriod: "feb-1-15-2026",
    priority: false,
    dateAdded: "Jan 21, 2026",
    source: "Performance Audit",
    hours: 0,
    priorPeriodHours: { "jan-7-31-2026": { hours: 0.25, note: "Initial investigation, disabled GF reCAPTCHA" } },
    issue: "reCAPTCHA loading 8 times on homepage (2,858 KB, 1,692ms main thread time).",
    investigation: "Disabled GF reCAPTCHA v3 site-wide. Removed hidden GF elements from /become-an-installer. Remaining instances are from HubSpot forms/chat.",
    likelyCauses: [],
    solution: "",
    notes: "Blocked: Need HubSpot admin access."
  },
];

export const uiUpdates = [
  {
    date: "Feb 5, 2026",
    billingPeriod: "feb-1-15-2026",
    hours: 0.25,
    pending: [],
    updates: [
      "Updated Terms and Conditions Section 8 warranty verbiage per Fabio (approved by Peter). Changed to new 20-Year Warranty + CARFAX language for Lifetime Limited Peelable Paint Performance warranty."
    ],
    notes: "",
    resources: []
  },
  {
    date: "Feb 1, 2026",
    billingPeriod: "feb-1-15-2026",
    hours: 0,
    pending: [
      "Add spacing above PayPal button on product page (Add to Order button touching Pay with PayPal)"
    ],
    updates: [],
    notes: "Carried over from Jan 16",
    resources: []
  },
  {
    date: "Jan 20, 2026",
    billingPeriod: "jan-7-31-2026",
    hours: 0,
    pending: [],
    updates: [
      "Fixed About Us page 'Become an Installer' button link (was /become-a-distributor-partner/, changed to /become-an-installer/)"
    ],
    notes: "",
    resources: []
  },
  {
    date: "Jan 16, 2026",
    billingPeriod: "jan-7-31-2026",
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
    billingPeriod: "jan-7-31-2026",
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
    billingPeriod: "jan-7-31-2026",
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
    item: "Homepage scroll jank/stutter",
    source: "Jan 26 Performance Audit",
    priority: "Medium",
    notes: "Not related to PSI scores (TBT is 0ms). Likely CSS animations or lazy loading."
  },
  {
    item: "Duplicate UPS shipping options at checkout",
    source: "Jan 7 investigation",
    priority: "Low",
    notes: "Multiple UPS Ground options appearing in shipping method selector"
  },
  {
    item: "SSL redirect (HTTP to HTTPS)",
    source: "Jan 21 PSI test",
    priority: "Low",
    notes: "Site doesn't force HTTPS redirect"
  }
];

export const billingHistory = [
  { period: "February 16-28, 2026", task: "025 - Ultra Shift Images Fix", hours: 1, amount: 70 },
  { period: "February 1-15, 2026", task: "022 - PA Tax Exemption", hours: 0.75, amount: 52.50 },
  { period: "February 1-15, 2026", task: "UI Updates (Feb 5)", hours: 0.25, amount: 17.50 },
  { period: "January 7-31, 2026", task: "001a - Free Shipping", hours: 1.5, amount: 105 },
  { period: "January 7-31, 2026", task: "001b - $0 Checkout", hours: 1.5, amount: 105 },
  { period: "January 7-31, 2026", task: "002 - iOS Shop Scroll Bug", hours: 1.75, amount: 122.50 },
  { period: "January 7-31, 2026", task: "006 - Mobile Menu Animation", hours: 1, amount: 70 },
  { period: "January 7-31, 2026", task: "007 - Hero Video Mobile", hours: 0.5, amount: 35 },
  { period: "January 7-31, 2026", task: "014 - Hero Video Compression", hours: 0.5, amount: 35 },
  { period: "January 7-31, 2026", task: "015 - WP Rocket CSS", hours: 0.5, amount: 35 },
  { period: "January 7-31, 2026", task: "016 - Stripe Snippet", hours: 0.25, amount: 17.50 },
  { period: "January 7-31, 2026", task: "017 - ShortPixel Optimization", hours: 1, amount: 70 },
  { period: "January 7-31, 2026", task: "018 - Essential Addons Cleanup", hours: 0.5, amount: 35 },
  { period: "January 7-31, 2026", task: "019 - ElementsKit Cleanup", hours: 0.5, amount: 35 },
  { period: "January 7-31, 2026", task: "020 - WP Rocket JS Fix", hours: 1.5, amount: 105 },
  { period: "January 7-31, 2026", task: "010 - Legal Pages (partial)", hours: 0.75, amount: 52.50 },
  { period: "January 7-31, 2026", task: "021 - reCAPTCHA (partial)", hours: 0.25, amount: 17.50 },
  { period: "January 7-31, 2026", task: "UI Updates", hours: 1, amount: 70 },
];

// Helper function to get all open/in-progress tasks across all periods
export function getAllOpenTasks() {
  return tasks.filter(t => t.status !== 'Resolved' && t.status !== 'Superseded');
}

// Helper function to get tasks for a specific period
export function getTasksForPeriod(periodId) {
  const period = billingPeriods.find(p => p.id === periodId);
  if (!period) return { tasks: [], uiUpdates: [] };

  // For resolved tasks, show in the period they were resolved
  // For open tasks, show in current period (they carry over)
  const periodTasks = tasks.filter(t => {
    if (t.status === 'Resolved' || t.status === 'Superseded') {
      return t.billingPeriod === periodId;
    } else {
      // Open tasks appear in their assigned period and all subsequent periods
      const taskPeriodIndex = billingPeriods.findIndex(p => p.id === t.billingPeriod);
      const currentPeriodIndex = billingPeriods.findIndex(p => p.id === periodId);
      return taskPeriodIndex <= currentPeriodIndex;
    }
  });

  const periodUiUpdates = uiUpdates.filter(u => u.billingPeriod === periodId);

  return { tasks: periodTasks, uiUpdates: periodUiUpdates };
}

// Helper function to calculate period stats
export function getPeriodStats(periodId) {
  const period = billingPeriods.find(p => p.id === periodId);
  const { tasks: periodTasks, uiUpdates: periodUiUpdates } = getTasksForPeriod(periodId);

  // For open tasks count, use ALL open tasks (they carry over between periods)
  const allOpenTasks = tasks.filter(t => t.status !== 'Resolved' && t.status !== 'Superseded');
  const resolvedTasks = periodTasks.filter(t => (t.status === 'Resolved' || t.status === 'Superseded') && !t.resolvedBy);
  const clientResolvedTasks = periodTasks.filter(t => t.status === 'Resolved' && t.resolvedBy);

  // For past periods (paid/pending), use billingHistory as source of truth
  // This includes partial hours from open tasks that were billed in that period
  const isPastPeriod = period?.status === 'paid' || period?.status === 'pending';

  let totalHours, amountDue;

  if (isPastPeriod && period?.fullLabel) {
    const periodBilling = billingHistory.filter(entry => entry.period === period.fullLabel);
    totalHours = periodBilling.reduce((sum, entry) => sum + entry.hours, 0);
    amountDue = periodBilling.reduce((sum, entry) => sum + entry.amount, 0);
  } else {
    // For current/upcoming periods, calculate from tasks
    const taskHours = periodTasks.reduce((sum, t) => sum + (t.hours || 0), 0);
    const uiHours = periodUiUpdates.reduce((sum, u) => sum + (u.hours || 0), 0);
    totalHours = taskHours + uiHours;
    amountDue = totalHours * billingInfo.rate;
  }

  // Calculate prior period hours for carryover tasks
  const priorHours = periodTasks.reduce((sum, t) => {
    if (t.priorPeriodHours) {
      return sum + Object.values(t.priorPeriodHours).reduce((s, data) => {
        // Handle both old format (just hours) and new format (object with hours)
        const hours = typeof data === 'object' ? data.hours : data;
        return s + hours;
      }, 0);
    }
    return sum;
  }, 0);

  return {
    totalHours,
    amountDue,
    openTasks: allOpenTasks.length,
    resolvedTasks: resolvedTasks.length,
    clientResolvedTasks: clientResolvedTasks.length,
    clientResolvedTaskList: clientResolvedTasks,
    priorHours,
    carryoverTasks: allOpenTasks.filter(t => t.priorPeriodHours && Object.keys(t.priorPeriodHours).length > 0)
  };
}

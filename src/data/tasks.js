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
    issue: "When a coupon discounted the cart to $0.00 (including free shipping), checkout failed with 'There was an error processing your order.' In the Payment Information step, no payment options rendered (Stripe/PayPal/COD not shown), so no payment_method was being submitted. Stripe cannot process $0 charges, so any attempt to route $0 orders through Stripe will fail.",
    investigation: "Coupons apply correctly. Free shipping appears (per 001a fix). Error occurs when clicking 'Place Order' with $0 total. The checkout UI (Block/checkout experience) did not render any gateways for $0 totals, resulting in no posted payment_method. Without a valid gateway/payment_method, the order submission errored instead of completing as a $0 order.",
    likelyCauses: [
      "Checkout UI (Block/checkout experience) did not render any gateways for $0 totals",
      "No payment_method was being submitted with the order",
      "Stripe cannot process $0 charges"
    ],
    solution: "Two-part fix: (1) Configure offline gateway for $0 orders: WooCommerce > Settings > Payments > Take offline payments > Cash on delivery (COD). Renamed COD to customer-safe label - Title: 'No payment required', Description: 'This order is fully covered by your discount. No payment is required.', Instructions: same. Left 'Enable for shipping methods' blank (no restriction). Left 'Accept for virtual orders' unchecked. (2) Added PHP snippet via Snippets plugin named '$0 checkout - force No payment required gateway' with two hooks: woocommerce_available_payment_gateways filter (priority 100) to show only COD when total <= $0 and hide COD when total > $0, and woocommerce_checkout_process action (priority 5) to force payment_method='cod' if UI fails to post a payment method for $0 orders.",
    notes: "TESTING COUPON: 'spon12345 - copy' (Type: Percentage discount, Amount: 100%, Allow free shipping: enabled, Usage limit per coupon: 1, Usage limit per user: unlimited). Coupon agent was changed from 'arash-1993' to 'admin' to avoid notifications during testing. Expiry date was edited - ensure it is saved via 'Update' in coupon editor. PRE-FIX TEST: Applied coupon to bring total to $0.00 with free shipping. Payment step showed no gateways and Place Order returned the generic processing error. Failed test order created as Pending payment (Order #61268). POST-FIX TEST: Same flow - add product > apply coupon > select free shipping > proceed to payment > Place Order. Order completed successfully with thank-you page displaying Total: $0.00, Payment method: 'No payment required'. Successful test order created (Order #61269). SANITY TEST: Proceeded to checkout without coupon (total > $0). Verified 'No payment required' did NOT show. Verified Stripe credit/debit and PayPal displayed normally. CLEANUP: Order #61268 (failed/pending) set to Cancelled. Order #61269 (successful $0 test) set to Cancelled. Cart emptied after testing. ROLLBACK PLAN: (1) Revert COD settings - Title back to 'Pay in Person', Description back to 'Pay by card or another accepted payment method', Instructions back to 'Pay by card or another accepted payment method'. (2) Deactivate snippet: Snippets > All Snippets > toggle off '$0 checkout - force No payment required gateway'.",
    codeSnippet: `/**
 * $0 checkout: force an offline gateway (COD) and ensure payment_method posts as COD.
 * Rollback: deactivate this snippet.
 */
add_filter('woocommerce_available_payment_gateways', function($gateways) {
    if (is_admin() || !function_exists('WC') || !WC()->cart) return $gateways;

    $total = (float) WC()->cart->get_total('edit');

    // If total is $0, keep ONLY COD
    if ($total <= 0) {
        foreach ($gateways as $id => $gateway) {
            if ($id !== 'cod') unset($gateways[$id]);
        }
        return $gateways;
    }

    // If total > $0, remove COD
    unset($gateways['cod']);
    return $gateways;
}, 100);

/**
 * Some checkout UIs (or custom checkout templates) fail to render gateways for $0 totals.
 * This guarantees the posted payment_method is "cod" for $0 orders.
 */
add_action('woocommerce_checkout_process', function() {
    if (!function_exists('WC') || !WC()->cart) return;

    $total = (float) WC()->cart->get_total('edit');
    if ($total > 0) return;

    // If nothing was posted, set COD.
    if (empty($_POST['payment_method'])) {
        $_POST['payment_method'] = 'cod';
    }
}, 5);`
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
    number: "004",
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
    number: "005",
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
  totalHours: 3.75,
  totalAmountDue: 262.50,
  openTasks: 6,
  resolvedTasks: 2
};

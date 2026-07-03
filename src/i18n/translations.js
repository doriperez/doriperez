// ============================================================
// IV-Dora — i18n dictionary (EN / ES / FR)
// STRUCTURE lives in /data (catalog.js, site.js). TEXT lives here.
// content.js merges the two. Keys must stay in sync across langs.
// ============================================================

export const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
]

export const DEFAULT_LANG = "en"

// ------------------------------------------------------------
// ENGLISH
// ------------------------------------------------------------
const en = {
  ui: {
    switcher: { label: "Change language" },
    header: {
      primaryNav: "Primary",
      mobileNav: "Mobile",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      programs: "Programs",
      allPrograms: "All programs",
      insights: "Journal",
      shop: "Shop",
      safety: "Safety",
      faq: "FAQ",
      journal: "Journal",
      consult: "Book consultation",
      startConsult: "Start Your Wellness Consultation",
    },
    ticker: { label: "Announcement", message: "New to peptide therapy?", cta: "Learn more about peptides" },
    hero: {
      eyebrow: "Physician-guided wellness",
      title: "Personalized Peptide & Wellness Programs Designed Around Your Biology",
      subtitle:
        "Explore physician-guided wellness protocols including peptides, injectable vitamins, antioxidant support, metabolic programs, and women's wellness options. Every program begins with a medical intake and provider review.",
      primaryCta: "Start Your Wellness Consultation",
      secondaryCta: "Explore Programs",
      stat1Label: "Provider-reviewed",
      stat1Value: "100%",
      stat2Label: "Compounding partners",
      stat2Value: "Licensed",
      stat3Label: "Personalized protocols",
      stat3Value: "Every plan",
      note: "Prescription and compounded options require evaluation by a licensed provider.",
    },
    programs: {
      eyebrow: "Programs",
      title: "Wellness programs, organized around your goals",
      subtitle:
        "Each program is a starting point for a conversation with a licensed provider — not a recommendation or prescription.",
      explore: "Explore",
      viewCategory: "View program",
      showMore: "Show more",
      allLabel: "All",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
      itemsLabel: "options",
    },
    tags: {
      rx: "Rx",
      compounded: "Compounded",
      supplement: "Supplement",
    },
    tagNote: {
      rx: "Prescription item — requires evaluation and a prescription from a licensed provider.",
      compounded:
        "Compounded preparation — made by a licensed pharmacy when prescribed for an individual patient. Not an FDA-approved finished drug product.",
      supplement: "Nutritional support — availability and use guided by your provider.",
    },
    insights: {
      eyebrow: "The Wellness Journal",
      title: "Habits, stories, and trends to live well by",
      subtitle: "Evidence-informed habits, real member experiences, and the wellness science we're watching.",
      exploreJournal: "Read the Journal",
      previewLabel: "In this issue",
      tabs: [
        {
          key: "habits",
          label: "Health habits",
          items: [
            { title: "Protein-forward mornings", body: "Anchoring your first meal with roughly 30g of protein helps steady energy, appetite, and focus through the day." },
            { title: "Zone 2 movement", body: "Three to four easy cardio sessions a week support mitochondrial health and metabolic flexibility." },
            { title: "Consistent sleep windows", body: "Going to bed and waking within the same hour each day does more for recovery than total hours alone." },
          ],
        },
        {
          key: "stories",
          label: "Member stories",
          items: [
            { quote: "The intake actually felt personal. My provider adjusted my protocol twice until it fit my life.", name: "Maya R.", detail: "Metabolic program · 6 months" },
            { quote: "I finally have energy in the afternoons again, and my recovery after workouts is noticeably faster.", name: "Devon & Priya", detail: "Recovery + longevity" },
            { quote: "Discreet, elegant, and genuinely science-first. It never feels like a sales pitch.", name: "Alexis T.", detail: "Women's wellness" },
          ],
        },
        {
          key: "trends",
          label: "Wellness trends",
          items: [
            { tag: "Trending", title: "Peptides for recovery", body: "Interest in targeted recovery peptides keeps rising as people prioritize tissue repair and resilience." },
            { tag: "Watching", title: "NAD+ and cellular energy", body: "Longevity-minded routines increasingly center on mitochondrial and cellular-energy support." },
            { tag: "Emerging", title: "Personalized micronutrients", body: "Injectable vitamins tailored to labs and goals are replacing one-size-fits-all supplementation." },
          ],
        },
      ],
      disclaimer: "Educational content only — not medical advice, and not a substitute for evaluation by a licensed provider. Member stories are illustrative placeholders.",
    },
    why: {
      eyebrow: "Why IV-Dora",
      title: "Care that feels personal, private, and precise",
      items: [
        { title: "Discreet by design", body: "Confidential intake, private messaging, and unbranded, secure delivery to your door." },
        { title: "Elegant experience", body: "A calm, considered journey — from first consultation through every follow-up." },
        { title: "Personalized to you", body: "Protocols shaped by your biology, history, and goals — never one-size-fits-all." },
        { title: "Provider-guided", body: "Every program is reviewed by a licensed provider before anything is prescribed." },
      ],
    },
    safety: {
      eyebrow: "Safety & transparency",
      title: "Your safety guides every decision",
      intro:
        "IV-Dora is built on medical oversight and honest information. Please review the important information below.",
      points: [
        { title: "Provider evaluation required", body: "Prescription products require evaluation by a licensed provider who determines whether treatment is appropriate for you." },
        { title: "About compounded medications", body: "Compounded medications are prepared by licensed pharmacies when prescribed for an individual patient and are not FDA-approved finished drug products." },
        { title: "Availability varies", body: "Availability varies by state, provider decision, and pharmacy and regulatory guidance, and may change over time." },
        { title: "Not medical advice", body: "IV-Dora does not provide medical advice through website content. Always consult a qualified provider about your individual needs." },
      ],
      disclaimerTitle: "Important disclaimer",
      disclaimerBody:
        "IV-Dora does not provide medical advice through website content. Prescription products require evaluation by a licensed provider. Compounded medications are prepared by licensed pharmacies when prescribed for an individual patient and are not FDA-approved finished drug products. Availability varies by state, provider decision, and pharmacy/regulatory guidance. Statements regarding peptides and nutrients have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease. Placeholder testimonials, provider bios, and membership figures shown on this site are illustrative and must be replaced before launch.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Frequently asked questions",
      subtitle: "Clear answers about how physician-guided programs work at IV-Dora.",
      searchPlaceholder: "Search questions…",
      searchAria: "Search frequently asked questions",
      noResults: (q) => `No results for “${q}”. Try a different search.`,
      stillTitle: "Still have questions?",
      stillBody: "Our concierge care team is here to help you get started.",
      contactCta: "Book a consultation",
    },
    contact: {
      eyebrow: "Get started",
      title: "Book your wellness consultation",
      subtitle:
        "Share a few details and our care team will help you begin a confidential medical intake. This form does not provide medical advice.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone (optional)",
      state: "State of residence",
      statePlaceholder: "Select your state",
      interest: "Program of interest",
      interestPlaceholder: "Select a program",
      message: "What are your wellness goals?",
      messagePlaceholder: "Tell us a little about what you're hoping to achieve…",
      consent:
        "I understand that IV-Dora does not provide medical advice through this form and that prescription and compounded products require evaluation by a licensed provider.",
      submit: "Request consultation",
      submitting: "Sending…",
      errorGeneric: "Something went wrong. Please try again.",
      successTitle: "Thank you — we've received your request",
      successBody:
        "A member of our care team will reach out to guide you through the confidential medical intake. No medical decision has been made.",
      backHome: "Back to home",
      sidebarTitle: "What to expect",
      sidebarSteps: [
        "A confidential medical intake",
        "Review by a licensed provider",
        "A personalized recommendation — only if appropriate",
      ],
      reach: "Prefer to reach us directly?",
    },
    footer: {
      tagline: "Physician-guided peptide, vitamin, and wellness programs, personalized around your biology.",
      programsHeading: "Programs",
      companyHeading: "Company",
      supportHeading: "Support",
      company: [
        { label: "Journal", href: "/#insights" },
        { label: "Why IV-Dora", href: "/#why" },
        { label: "Safety", href: "/#safety" },
      ],
      support: [
        { label: "FAQ", href: "/faq" },
        { label: "Book consultation", href: "/consultation" },
        { label: "Contact", href: "/consultation" },
      ],
      rights: "All rights reserved.",
      legal:
        "IV-Dora does not provide medical advice through website content. Prescription products require evaluation by a licensed provider. Compounded medications are prepared by licensed pharmacies for an individual patient and are not FDA-approved finished drug products. Availability varies by state, provider decision, and pharmacy/regulatory guidance.",
      placeholderNote: "Brand name, testimonials, provider bios, and member counts are placeholders pending review.",
    },
    productDetail: {
      backToPrograms: "All programs",
      notFound: "Program not found",
      backHome: "Back to home",
      classification: "Classification",
      partOf: "Part of these programs",
      startCta: "Start Your Wellness Consultation",
      exploreCta: "Explore related options",
      overview: "Overview",
      safetyHeading: "Important information",
      relatedTitle: "Others in this program",
      researchOnly: "For research use only",
      addToCart: "Add to cart",
      added: "Added to cart",
      perVial: "per 10 mL vial",
    },
    cart: {
      title: "Your cart",
      open: "Open cart",
      empty: "Your cart is empty.",
      emptyCta: "Browse programs",
      item: "item",
      items: "items",
      quantity: "Quantity",
      remove: "Remove",
      each: "each",
      subtotal: "Subtotal",
      total: "Total",
      continueShopping: "Continue shopping",
      checkoutHeading: "Checkout",
      checkoutIntro: "Enter your details, then pay securely via Stripe to complete your order.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone (optional)",
      notes: "Order notes (optional)",
      consent:
        "I understand a licensed provider must review eligibility before any prescription product is fulfilled.",
      payNow: "Pay now",
      submitting: "Redirecting…",
      canceled: "Your payment was canceled. Your cart is still here whenever you're ready.",
      errorGeneric: "Something went wrong. Please try again.",
      verifying: "Confirming your payment…",
      paidTitle: "Payment successful",
      paidBody: "Thank you for your order. A receipt has been sent to your email, and our team will follow up with next steps.",
      unpaidTitle: "Payment not completed",
      unpaidBody: "We couldn't confirm your payment. If you were charged, please contact us and we'll help right away.",
      orderRef: "Your order number is",
      backHome: "Back to home",
      backToCart: "Return to cart",
      disclaimer:
        "Payments are processed securely by Stripe. Prescription products require provider review before fulfillment.",
    },
    hsa: {
      eyebrow: "HSA / FSA Store",
      title: "Shop HSA-eligible health tech",
      subtitle:
        "Practitioner-loved devices for everyday conditions — pay tax-free with your HSA or FSA card at checkout.",
      tabs: { bestseller: "Best sellers", trending: "Trending", new: "New arrivals" },
      badges: { bestseller: "Best seller", trending: "Trending", new: "New" },
      shopByCondition: "Shop by condition",
      allConditions: "All products",
      conditions: {
        pain: "Pain",
        skin: "Skin",
        "blood-pressure": "Blood pressure",
        sleep: "Sleep",
        allergy: "Allergy",
        diabetes: "Diabetes",
      },
      eligible: "HSA eligible",
      addToCart: "Add to cart",
      added: "Added to cart",
      viewCart: "View cart",
      empty: "No products match this filter yet.",
      disclaimer:
        "HSA/FSA eligibility can vary by plan. These are general wellness devices, not medical advice — check with your plan administrator about reimbursement.",
    },
    categoryPage: {
      notFound: "Program not found",
      backHome: "Back to home",
      startCta: "Start Your Wellness Consultation",
      optionsTitle: (label) => `Options in ${label}`,
    },
    journal: {
      eyebrow: "The Wellness Journal",
      title: "Living well, by design",
      subtitle:
        "Trending habits, science-informed rituals, and the latest health technology — curated by our wellness desk.",
      featuredBadge: "Editor's pick",
      readStory: "Read the story",
      readTime: (min) => `${min} min read`,
      pillarsEyebrow: "This week's focus",
      pillarsTitle: "Wellness, in three pillars",
      pillarsSubtitle:
        "Fresh recommendations across mental health, eating, and lifestyle — refreshed every week.",
      spotlightBadge: "Weekly spotlight",
      updatedLabel: "Updated",
      pillarLabels: {
        mental: "Mental health",
        eating: "Good eating habits",
        lifestyle: "Healthy lifestyle",
      },
      habitsEyebrow: "Trending now",
      habitsTitle: "Top healthy habits this season",
      habitsSubtitle: "The daily practices our community and practitioners are leaning into right now.",
      trending: "Trending",
      gadgetsEyebrow: "Gear we're testing",
      gadgetsTitle: "Latest health technology",
      gadgetsSubtitle:
        "The devices making it easier to measure, recover, and optimize your everyday wellbeing.",
      whyLove: "Why we love it",
      from: "from",
      ratingAria: (r) => `Rated ${r} out of 5`,
      newsletterTitle: "Get the Journal in your inbox",
      newsletterBody: "Monthly wellness reads, habit guides, and gadget reviews. No spam — unsubscribe anytime.",
      newsletterPlaceholder: "Your email address",
      newsletterCta: "Subscribe",
      newsletterAria: "Email address",
      newsletterSuccess: "You're subscribed. Watch your inbox for the next issue.",
      disclaimer:
        "The Wellness Journal is for general education only and is not medical advice. Gadgets are independent products and are not sold, endorsed, or medically recommended by IV-Dora. Consult a licensed provider about your individual needs.",
    },
  },

  content: {
    categories: {
      womens: {
        label: "Women's Health",
        short: "Women's Health",
        description:
          "Personalized programs for women's wellness — hormonal balance, metabolic support, beauty, intimate wellness, and everyday vitality.",
      },
      mens: {
        label: "Men's Health",
        short: "Men's Health",
        description:
          "Provider-guided programs supporting men's vitality, recovery, performance, body composition, and healthy aging.",
      },
      weight: {
        label: "Weight Management",
        short: "Weight",
        description:
          "Programs designed to support appetite regulation, metabolic health, body composition, and medically guided weight-management goals.",
      },
      longevity: {
        label: "Longevity",
        short: "Longevity",
        description:
          "Cellular wellness protocols focused on energy, recovery, oxidative-stress support, mitochondrial function, and long-term vitality.",
      },
      dermatology: {
        label: "Dermatology",
        short: "Dermatology",
        description:
          "Skin- and aesthetic-focused options designed to support skin appearance, antioxidant support, glow, hydration, and aesthetic care.",
      },
      sexual: {
        label: "Sexual Health",
        short: "Sexual Health",
        description:
          "Discreet, provider-guided options researched for libido, circulation, confidence, and intimate wellness.",
      },
      mental: {
        label: "Mental Health",
        short: "Mental Health",
        description:
          "Wellness options researched for cognitive support, stress balance, sleep quality, focus, and nervous-system wellness.",
      },
      hormone: {
        label: "Hormone Replacement",
        short: "Hormones",
        description:
          "Provider-guided hormone and growth-factor support focused on energy, balance, recovery, and healthy aging.",
      },
    },
    // Short, compliant, benefit-oriented blurbs (not medical claims).
    products: {
      "semaglutide": "A GLP-1 program option explored for appetite regulation and medically guided weight management.",
      "tirzepatide": "A dual-incretin option studied within provider-guided metabolic and weight-management programs.",
      "retatrutide": "An investigational metabolic option explored for body-composition and weight-management goals.",
      "cagrilintide": "An amylin-analog option researched alongside appetite and metabolic wellness programs.",
      "cagrilintide-semaglutide": "A combined option explored for appetite regulation and metabolic support.",
      "tesamorelin": "A growth-hormone-releasing option researched for body composition and metabolic wellness.",
      "hcg": "A provider-prescribed option used within select metabolic and wellness protocols.",
      "l-carnitine": "A nutrient option explored for energy metabolism and fat utilization support.",
      "mic": "A lipotropic blend of methionine, inositol, and choline explored for metabolic support.",
      "bpc-157": "A peptide widely researched for tissue support, recovery, and gut wellness.",
      "tb-500": "A thymosin beta-4 fragment researched for recovery, flexibility, and tissue repair.",
      "bpc-tb": "A combined recovery option pairing BPC-157 with TB-500 for tissue support.",
      "ghk-cu": "A copper peptide researched for skin renewal, hair, and tissue support.",
      "ss-31": "A mitochondrial-targeted peptide researched for cellular energy and resilience.",
      "mots-c": "A mitochondrial-derived peptide explored for metabolism and exercise resilience.",
      "l-arginine": "An amino acid explored for circulation, performance, and vascular support.",
      "lpv": "A lysine-proline-valine option explored within recovery and repair protocols.",
      "nad": "A cellular coenzyme explored for energy, focus, and healthy-aging support.",
      "epithalon": "A peptide researched for cellular longevity and restorative sleep support.",
      "pinealon": "A short peptide explored for cognitive and neuro-restorative wellness.",
      "cjc-1295-no-dac": "A growth-hormone-releasing option researched for recovery and vitality.",
      "cjc-1295-dac": "A longer-acting growth-hormone-releasing option for sustained support.",
      "glutathione": "A master antioxidant explored for detox support, glow, and cellular health.",
      "glow": "A signature aesthetic blend explored for skin radiance and antioxidant support.",
      "snap-8": "A peptide explored for the appearance of expression lines and smoothness.",
      "lemon-bottle": "A lipolytic aesthetic option explored for contouring and fat-area support.",
      "botulinum-toxin": "A provider-administered aesthetic option for the appearance of fine lines.",
      "b5": "Dexpanthenol, explored for skin, hair, and barrier support.",
      "b6": "Pyridoxine, explored for mood balance, metabolism, and nervous-system wellness.",
      "methylcobalamin": "An active B12 form explored for energy, focus, and vitality support.",
      "semax": "A nootropic peptide researched for focus, clarity, and cognitive resilience.",
      "selank": "A peptide explored for calm, stress balance, and steady focus.",
      "dsip": "A delta sleep-inducing peptide explored for restful, restorative sleep.",
      "inositol": "A nutrient explored for mood balance, hormonal wellness, and metabolism.",
      "thymosin-alpha-1": "A peptide researched for immune balance and resilience support.",
      "vip": "A vasoactive intestinal peptide option explored for immune and vitality support.",
      "pt-141": "A peptide explored for intimate wellness, desire, and confidence support.",
    },
    faqGroups: [
      {
        heading: "Getting started",
        items: [
          { q: "How does IV-Dora work?", a: "Every program begins with a confidential medical intake. A licensed provider reviews your information and determines whether a personalized protocol is appropriate. If it is, prescribed items are prepared by a licensed pharmacy and delivered discreetly. IV-Dora does not provide medical advice through website content." },
          { q: "Do I need a prescription?", a: "Prescription and compounded products require evaluation by a licensed provider, who determines whether treatment is appropriate for you. Nothing is dispensed without provider review." },
          { q: "Is my information private?", a: "Yes. Your intake is confidential, messaging is private, and deliveries arrive in discreet, unbranded packaging." },
        ],
      },
      {
        heading: "Programs & products",
        items: [
          { q: "What are compounded medications?", a: "Compounded medications are prepared by licensed pharmacies when prescribed for an individual patient. They are not FDA-approved finished drug products. Your provider will discuss whether a compounded option is appropriate for you." },
          { q: "Are these products FDA-approved?", a: "Some prescription products are FDA-approved; compounded preparations are not FDA-approved finished drug products. Statements about peptides and nutrients have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease." },
          { q: "Why do some options say Rx, Compounded, or Supplement?", a: "These labels indicate how each option is classified and provided. Rx items require a prescription, compounded items are prepared by a licensed pharmacy for an individual patient, and supplements are nutritional support — all guided by your provider." },
        ],
      },
      {
        heading: "Availability & safety",
        items: [
          { q: "Is every program available in my state?", a: "Availability varies by state, provider decision, and pharmacy and regulatory guidance, and may change over time. Your eligibility is confirmed during intake and provider review." },
          { q: "What if a program isn't right for me?", a: "If a program isn't clinically appropriate, your provider may recommend an alternative or decline to prescribe. Your safety always comes first." },
          { q: "Does IV-Dora give medical advice on this website?", a: "No. Website content is for general information only and is not medical advice. Please consult a licensed provider about your individual needs." },
        ],
      },
    ],
    journal: {
      featured: {
        category: "Longevity",
        title: "The longevity morning: small rituals, steady energy",
        excerpt:
          "How the first hour of your day shapes sleep, focus, and metabolism — and the simple, science-informed habits our practitioners return to again and again.",
        author: "By the IV-Dora Wellness Desk",
      },
      habits: {
        "morning-light": {
          tag: "Circadian",
          title: "Catch the morning light",
          body: "Ten to twenty minutes of daylight within an hour of waking helps anchor your circadian rhythm, supporting sharper mornings and deeper sleep at night.",
        },
        "zone-2": {
          tag: "Cardio",
          title: "Train easy in Zone 2",
          body: "Low-intensity, conversational cardio a few times a week builds metabolic and mitochondrial health without the burnout of constant high-intensity work.",
        },
        "protein-first": {
          tag: "Nutrition",
          title: "Eat protein first",
          body: "A protein-forward breakfast blunts glucose spikes, curbs cravings, and helps preserve lean muscle as you age.",
        },
        "contrast-therapy": {
          tag: "Recovery",
          title: "Embrace contrast therapy",
          body: "Alternating heat and cold — sauna and cold plunge — is being explored for circulation, mood, and post-exercise recovery.",
        },
      },
      gadgets: {
        "smart-ring": {
          category: "Wearable",
          name: "Smart Recovery Ring",
          blurb: "A featherweight titanium ring that tracks sleep stages, heart-rate variability, and daily readiness.",
          why: "Discreet, comfortable, and remarkably accurate for sleep and recovery trends.",
        },
        "glucose-monitor": {
          category: "Metabolic",
          name: "Continuous Glucose Monitor",
          blurb: "A skin sensor that streams real-time glucose data to your phone so you can see how meals and stress affect you.",
          why: "Turns abstract nutrition advice into personal, visible feedback.",
        },
        "red-light": {
          category: "Light therapy",
          name: "Red Light Therapy Panel",
          blurb: "A full-spectrum red and near-infrared panel studied for skin, recovery, and circadian support.",
          why: "Salon-grade light in a sleek, at-home form factor.",
        },
        "smart-scale": {
          category: "Metrics",
          name: "Body Composition Scale",
          blurb: "Goes beyond weight to estimate body fat, muscle, and hydration trends over time.",
          why: "Trends that matter, synced quietly to your phone.",
        },
        "sleep-band": {
          category: "Sleep",
          name: "Sleep Sensing Headband",
          blurb: "A soft EEG headband that measures sleep depth and plays audio to help you drift off.",
          why: "Comfortable enough to forget you're wearing it.",
        },
        "recovery-gun": {
          category: "Recovery",
          name: "Percussion Recovery Device",
          blurb: "Quiet, high-torque percussive therapy for warm-ups and post-training recovery.",
          why: "Powerful yet whisper-quiet, with a premium feel.",
        },
      },
    },
  },
}

// ------------------------------------------------------------
// SPANISH
// ------------------------------------------------------------
const es = {
  ui: {
    switcher: { label: "Cambiar idioma" },
    header: {
      primaryNav: "Principal",
      mobileNav: "Móvil",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      programs: "Programas",
      allPrograms: "Todos los programas",
      insights: "Diario",
      shop: "Tienda",
      safety: "Seguridad",
      faq: "Preguntas",
      journal: "Diario",
      consult: "Reservar consulta",
      startConsult: "Comienza tu consulta de bienestar",
    },
    ticker: { label: "Anuncio", message: "¿Nuevo en la terapia con péptidos?", cta: "Conoce más sobre los péptidos" },
    hero: {
      eyebrow: "Bienestar guiado por médicos",
      title: "Programas personalizados de péptidos y bienestar diseñados en torno a tu biología",
      subtitle:
        "Explora protocolos de bienestar guiados por médicos que incluyen péptidos, vitaminas inyectables, apoyo antioxidante, programas metabólicos y opciones de bienestar femenino. Cada programa comienza con una evaluación médica y la revisión de un profesional.",
      primaryCta: "Comienza tu consulta de bienestar",
      secondaryCta: "Explorar programas",
      stat1Label: "Revisado por un profesional",
      stat1Value: "100%",
      stat2Label: "Farmacias asociadas",
      stat2Value: "Con licencia",
      stat3Label: "Protocolos personalizados",
      stat3Value: "Cada plan",
      note: "Las opciones con receta y compuestas requieren la evaluación de un profesional con licencia.",
    },
    programs: {
      eyebrow: "Programas",
      title: "Programas de bienestar, organizados según tus objetivos",
      subtitle:
        "Cada programa es un punto de partida para una conversación con un profesional con licencia, no una recomendación ni una receta.",
      explore: "Explorar",
      viewCategory: "Ver programa",
      showMore: "Ver más",
      allLabel: "Todos",
      scrollLeft: "Desplazar a la izquierda",
      scrollRight: "Desplazar a la derecha",
      itemsLabel: "opciones",
    },
    tags: {
      rx: "Receta",
      compounded: "Compuesto",
      supplement: "Suplemento",
    },
    tagNote: {
      rx: "Producto con receta: requiere evaluación y receta de un profesional con licencia.",
      compounded:
        "Preparación compuesta: elaborada por una farmacia con licencia cuando se receta para un paciente individual. No es un medicamento terminado aprobado por la FDA.",
      supplement: "Apoyo nutricional: disponibilidad y uso guiados por tu profesional.",
    },
    insights: {
      eyebrow: "El diario de bienestar",
      title: "Hábitos, historias y tendencias para vivir mejor",
      subtitle: "Hábitos con base científica, experiencias reales de miembros y la ciencia del bienestar que seguimos.",
      exploreJournal: "Leer el Journal",
      previewLabel: "En esta edición",
      tabs: [
        {
          key: "habits",
          label: "Hábitos saludables",
          items: [
            { title: "Mañanas con proteína", body: "Empezar el día con unos 30 g de proteína ayuda a estabilizar la energía, el apetito y la concentración." },
            { title: "Movimiento en Zona 2", body: "Tres o cuatro sesiones suaves de cardio por semana apoyan la salud mitocondrial y la flexibilidad metab��lica." },
            { title: "Horarios de sueño constantes", body: "Acostarse y levantarse dentro de la misma hora cada día ayuda a la recuperación más que solo las horas totales." },
          ],
        },
        {
          key: "stories",
          label: "Historias de miembros",
          items: [
            { quote: "La evaluación se sintió realmente personal. Mi profesional ajustó mi protocolo dos veces hasta que encajó con mi vida.", name: "Maya R.", detail: "Programa metabólico · 6 meses" },
            { quote: "Por fin vuelvo a tener energía por las tardes y mi recuperación tras entrenar es notablemente m��s rápida.", name: "Devon y Priya", detail: "Recuperación + longevidad" },
            { quote: "Discreto, elegante y de verdad basado en la ciencia. Nunca se siente como una venta.", name: "Alexis T.", detail: "Bienestar femenino" },
          ],
        },
        {
          key: "trends",
          label: "Tendencias de bienestar",
          items: [
            { tag: "Tendencia", title: "Péptidos para la recuperación", body: "El interés en péptidos de recuperación sigue creciendo a medida que se prioriza la reparación de tejidos y la resiliencia." },
            { tag: "En observación", title: "NAD+ y energía celular", body: "Las rutinas centradas en la longevidad se enfocan cada vez más en el apoyo mitocondrial y de energía celular." },
            { tag: "Emergente", title: "Micronutrientes personalizados", body: "Las vitaminas inyectables adaptadas a análisis y objetivos reemplazan la suplementación genérica." },
          ],
        },
      ],
      disclaimer: "Contenido solo educativo: no es consejo médico ni sustituye la evaluación de un profesional con licencia. Las historias de miembros son ejemplos ilustrativos.",
    },
    why: {
      eyebrow: "Por qué IV-Dora",
      title: "Un cuidado personal, privado y preciso",
      items: [
        { title: "Discreto por diseño", body: "Evaluación confidencial, mensajería privada y entrega segura y sin marca en tu puerta." },
        { title: "Experiencia elegante", body: "Un recorrido sereno y cuidado, desde la primera consulta hasta cada seguimiento." },
        { title: "Personalizado para ti", body: "Protocolos moldeados por tu biología, tu historial y tus objetivos, nunca genéricos." },
        { title: "Guiado por profesionales", body: "Cada programa es revisado por un profesional con licencia antes de recetar nada." },
      ],
    },
    safety: {
      eyebrow: "Seguridad y transparencia",
      title: "Tu seguridad guía cada decisión",
      intro:
        "IV-Dora se basa en la supervisión médica y la información honesta. Revisa la información importante a continuación.",
      points: [
        { title: "Se requiere evaluación profesional", body: "Los productos con receta requieren la evaluación de un profesional con licencia que determina si el tratamiento es adecuado para ti." },
        { title: "Sobre los medicamentos compuestos", body: "Los medicamentos compuestos son preparados por farmacias con licencia cuando se recetan para un paciente individual y no son medicamentos terminados aprobados por la FDA." },
        { title: "La disponibilidad varía", body: "La disponibilidad varía según el estado, la decisión del profesional y las directrices farmacéuticas y regulatorias, y puede cambiar con el tiempo." },
        { title: "No es asesoramiento médico", body: "IV-Dora no ofrece asesoramiento médico a través del contenido del sitio web. Consulta siempre a un profesional cualificado sobre tus necesidades individuales." },
      ],
      disclaimerTitle: "Aviso importante",
      disclaimerBody:
        "IV-Dora no ofrece asesoramiento médico a través del contenido del sitio web. Los productos con receta requieren la evaluación de un profesional con licencia. Los medicamentos compuestos son preparados por farmacias con licencia cuando se recetan para un paciente individual y no son medicamentos terminados aprobados por la FDA. La disponibilidad varía según el estado, la decisión del profesional y las directrices farmacéuticas y regulatorias. Las afirmaciones sobre péptidos y nutrientes no han sido evaluadas por la FDA y no pretenden diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Los testimonios, biografías de profesionales y cifras de membresía que se muestran son ilustrativos y deben reemplazarse antes del lanzamiento.",
    },
    faq: {
      eyebrow: "Preguntas",
      title: "Preguntas frecuentes",
      subtitle: "Respuestas claras sobre cómo funcionan los programas guiados por médicos en IV-Dora.",
      searchPlaceholder: "Buscar preguntas…",
      searchAria: "Buscar en las preguntas frecuentes",
      noResults: (q) => `Sin resultados para «${q}». Prueba con otra búsqueda.`,
      stillTitle: "¿Aún tienes preguntas?",
      stillBody: "Nuestro equipo de atención concierge está aquí para ayudarte a comenzar.",
      contactCta: "Reservar una consulta",
    },
    contact: {
      eyebrow: "Comienza",
      title: "Reserva tu consulta de bienestar",
      subtitle:
        "Comparte algunos datos y nuestro equipo de atención te ayudará a comenzar una evaluación médica confidencial. Este formulario no ofrece asesoramiento médico.",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo electrónico",
      phone: "Teléfono (opcional)",
      state: "Estado de residencia",
      statePlaceholder: "Selecciona tu estado",
      interest: "Programa de interés",
      interestPlaceholder: "Selecciona un programa",
      message: "¿Cuáles son tus objetivos de bienestar?",
      messagePlaceholder: "Cuéntanos un poco sobre lo que deseas lograr…",
      consent:
        "Entiendo que IV-Dora no ofrece asesoramiento médico a través de este formulario y que los productos con receta y compuestos requieren la evaluación de un profesional con licencia.",
      submit: "Solicitar consulta",
      submitting: "Enviando…",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      successTitle: "Gracias: hemos recibido tu solicitud",
      successBody:
        "Un miembro de nuestro equipo de atención se pondrá en contacto para guiarte en la evaluación médica confidencial. No se ha tomado ninguna decisión médica.",
      backHome: "Volver al inicio",
      sidebarTitle: "Qué esperar",
      sidebarSteps: [
        "Una evaluación médica confidencial",
        "Revisión por un profesional con licencia",
        "Una recomendación personalizada, solo si corresponde",
      ],
      reach: "¿Prefieres contactarnos directamente?",
    },
    footer: {
      tagline: "Programas de péptidos, vitaminas y bienestar guiados por médicos, personalizados según tu biología.",
      programsHeading: "Programas",
      companyHeading: "Empresa",
      supportHeading: "Soporte",
      company: [
        { label: "Diario", href: "/#insights" },
        { label: "Por qué IV-Dora", href: "/#why" },
        { label: "Seguridad", href: "/#safety" },
      ],
      support: [
        { label: "Preguntas frecuentes", href: "/faq" },
        { label: "Reservar consulta", href: "/consultation" },
        { label: "Contacto", href: "/consultation" },
      ],
      rights: "Todos los derechos reservados.",
      legal:
        "IV-Dora no ofrece asesoramiento médico a través del contenido del sitio web. Los productos con receta requieren la evaluación de un profesional con licencia. Los medicamentos compuestos son preparados por farmacias con licencia para un paciente individual y no son medicamentos terminados aprobados por la FDA. La disponibilidad varía según el estado, la decisión del profesional y las directrices farmacéuticas y regulatorias.",
      placeholderNote: "El nombre de la marca, los testimonios, las biografías de profesionales y el número de miembros son provisionales, pendientes de revisión.",
    },
    productDetail: {
      backToPrograms: "Todos los programas",
      notFound: "Programa no encontrado",
      backHome: "Volver al inicio",
      classification: "Clasificación",
      partOf: "Parte de estos programas",
      startCta: "Comienza tu consulta de bienestar",
      exploreCta: "Explorar opciones relacionadas",
      overview: "Descripción general",
      safetyHeading: "Información importante",
      relatedTitle: "Otras opciones de este programa",
      researchOnly: "Solo para uso en investigación",
      addToCart: "Añadir al carrito",
      added: "Añadido al carrito",
      perVial: "por vial de 10 mL",
    },
    cart: {
      title: "Tu carrito",
      open: "Abrir carrito",
      empty: "Tu carrito está vacío.",
      emptyCta: "Ver programas",
      item: "artículo",
      items: "artículos",
      quantity: "Cantidad",
      remove: "Quitar",
      each: "c/u",
      subtotal: "Subtotal",
      total: "Total",
      continueShopping: "Seguir explorando",
      checkoutHeading: "Finalizar pedido",
      checkoutIntro: "Introduce tus datos y paga de forma segura con Stripe para completar tu pedido.",
      firstName: "Nombre",
      lastName: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono (opcional)",
      notes: "Notas del pedido (opcional)",
      consent:
        "Entiendo que un profesional con licencia debe revisar la elegibilidad antes de preparar cualquier producto con receta.",
      payNow: "Pagar ahora",
      submitting: "Redirigiendo…",
      canceled: "Tu pago se canceló. Tu carrito sigue aquí cuando quieras continuar.",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      verifying: "Confirmando tu pago…",
      paidTitle: "Pago realizado",
      paidBody: "Gracias por tu pedido. Hemos enviado un recibo a tu correo y nuestro equipo te contactará con los siguientes pasos.",
      unpaidTitle: "Pago no completado",
      unpaidBody: "No pudimos confirmar tu pago. Si se te realizó un cargo, contáctanos y te ayudaremos enseguida.",
      orderRef: "Tu número de pedido es",
      backHome: "Volver al inicio",
      backToCart: "Volver al carrito",
      disclaimer:
        "Los pagos se procesan de forma segura con Stripe. Los productos con receta requieren revisión de un profesional antes de su preparación.",
    },
    hsa: {
      eyebrow: "Tienda HSA / FSA",
      title: "Compra tecnología de salud elegible para HSA",
      subtitle:
        "Dispositivos recomendados por profesionales para afecciones cotidianas — paga sin impuestos con tu tarjeta HSA o FSA al finalizar la compra.",
      tabs: { bestseller: "Más vendidos", trending: "Tendencia", new: "Novedades" },
      badges: { bestseller: "Más vendido", trending: "Tendencia", new: "Nuevo" },
      shopByCondition: "Compra por afección",
      allConditions: "Todos los productos",
      conditions: {
        pain: "Dolor",
        skin: "Piel",
        "blood-pressure": "Presión arterial",
        sleep: "Sueño",
        allergy: "Alergia",
        diabetes: "Diabetes",
      },
      eligible: "Elegible HSA",
      addToCart: "Añadir al carrito",
      added: "Añadido al carrito",
      viewCart: "Ver carrito",
      empty: "Todavía no hay productos que coincidan con este filtro.",
      disclaimer:
        "La elegibilidad HSA/FSA puede variar según el plan. Estos son dispositivos de bienestar general, no asesoramiento médico — consulta con el administrador de tu plan sobre el reembolso.",
    },
    categoryPage: {
      notFound: "Programa no encontrado",
      backHome: "Volver al inicio",
      startCta: "Comienza tu consulta de bienestar",
      optionsTitle: (label) => `Opciones en ${label}`,
    },
    journal: {
      eyebrow: "El Diario de Bienestar",
      title: "Vivir bien, con intención",
      subtitle:
        "Hábitos en tendencia, rituales con base científica y la última tecnología para la salud — seleccionados por nuestro equipo de bienestar.",
      featuredBadge: "Selección del editor",
      readStory: "Leer el artículo",
      readTime: (min) => `${min} min de lectura`,
      pillarsEyebrow: "El enfoque de esta semana",
      pillarsTitle: "Bienestar, en tres pilares",
      pillarsSubtitle:
        "Nuevas recomendaciones sobre salud mental, alimentación y estilo de vida — actualizadas cada semana.",
      spotlightBadge: "Destacado semanal",
      updatedLabel: "Actualizado",
      pillarLabels: {
        mental: "Salud mental",
        eating: "Buenos hábitos alimenticios",
        lifestyle: "Estilo de vida saludable",
      },
      habitsEyebrow: "En tendencia",
      habitsTitle: "Los mejores hábitos saludables de la temporada",
      habitsSubtitle: "Las prácticas diarias que nuestra comunidad y profesionales están adoptando ahora mismo.",
      trending: "Tendencia",
      gadgetsEyebrow: "Lo que estamos probando",
      gadgetsTitle: "Última tecnología para la salud",
      gadgetsSubtitle:
        "Los dispositivos que facilitan medir, recuperarte y optimizar tu bienestar diario.",
      whyLove: "Por qué nos encanta",
      from: "desde",
      ratingAria: (r) => `Valorado con ${r} de 5`,
      newsletterTitle: "Recibe el Diario en tu correo",
      newsletterBody: "Lecturas mensuales de bienestar, guías de hábitos y reseñas de dispositivos. Sin spam — cancela cuando quieras.",
      newsletterPlaceholder: "Tu correo electrónico",
      newsletterCta: "Suscribirme",
      newsletterAria: "Correo electrónico",
      newsletterSuccess: "Te has suscrito. Revisa tu correo para la próxima edición.",
      disclaimer:
        "El Diario de Bienestar es solo para educación general y no constituye consejo médico. Los dispositivos son productos independientes y no son vendidos, respaldados ni recomendados médicamente por IV-Dora. Consulta a un profesional con licencia sobre tus necesidades individuales.",
    },
  },

  content: {
    categories: {
      womens: {
        label: "Salud femenina",
        short: "Salud femenina",
        description:
          "Programas personalizados para el bienestar femenino: equilibrio hormonal, apoyo metabólico, belleza, bienestar íntimo y vitalidad diaria.",
      },
      mens: {
        label: "Salud masculina",
        short: "Salud masculina",
        description:
          "Programas guiados por profesionales que apoyan la vitalidad, la recuperación, el rendimiento, la composición corporal y un envejecimiento saludable en los hombres.",
      },
      weight: {
        label: "Control de peso",
        short: "Peso",
        description:
          "Programas diseñados para apoyar la regulación del apetito, la salud metabólica, la composición corporal y objetivos de control de peso guiados médicamente.",
      },
      longevity: {
        label: "Longevidad",
        short: "Longevidad",
        description:
          "Protocolos de bienestar celular centrados en la energía, la recuperación, el apoyo frente al estrés oxidativo, la función mitocondrial y la vitalidad a largo plazo.",
      },
      dermatology: {
        label: "Dermatología",
        short: "Dermatología",
        description:
          "Opciones centradas en la piel y lo estético, diseñadas para apoyar la apariencia de la piel, el soporte antioxidante, la luminosidad, la hidratación y el cuidado estético.",
      },
      sexual: {
        label: "Salud sexual",
        short: "Salud sexual",
        description:
          "Opciones discretas y guiadas por profesionales, investigadas para la libido, la circulación, la confianza y el bienestar íntimo.",
      },
      mental: {
        label: "Salud mental",
        short: "Salud mental",
        description:
          "Opciones de bienestar investigadas para el apoyo cognitivo, el equilibrio del estrés, la calidad del sueño, la concentración y el bienestar del sistema nervioso.",
      },
      hormone: {
        label: "Terapia hormonal",
        short: "Hormonas",
        description:
          "Apoyo hormonal y de factores de crecimiento guiado por profesionales, centrado en la energía, el equilibrio, la recuperación y un envejecimiento saludable.",
      },
    },
    products: {
      "semaglutide": "Una opción de programa GLP-1 explorada para la regulación del apetito y el control de peso guiado médicamente.",
      "tirzepatide": "Una opción de doble incretina estudiada dentro de programas metabólicos y de control de peso guiados por profesionales.",
      "retatrutide": "Una opción metabólica en investigación explorada para objetivos de composición corporal y control de peso.",
      "cagrilintide": "Una opción análoga de amilina investigada junto con programas de apetito y bienestar metabólico.",
      "cagrilintide-semaglutide": "Una opción combinada explorada para la regulación del apetito y el apoyo metabólico.",
      "tesamorelin": "Una opción liberadora de hormona del crecimiento investigada para la composición corporal y el bienestar metabólico.",
      "hcg": "Una opción recetada por un profesional utilizada dentro de protocolos metabólicos y de bienestar seleccionados.",
      "l-carnitine": "Una opción de nutriente explorada para el metabolismo energético y el apoyo al uso de grasas.",
      "mic": "Una mezcla lipotrópica de metionina, inositol y colina explorada para el apoyo metabólico.",
      "bpc-157": "Un péptido ampliamente investigado para el apoyo de los tejidos, la recuperación y el bienestar intestinal.",
      "tb-500": "Un fragmento de timosina beta-4 investigado para la recuperación, la flexibilidad y la reparación de tejidos.",
      "bpc-tb": "Una opción de recuperación combinada que une BPC-157 con TB-500 para el apoyo de los tejidos.",
      "ghk-cu": "Un péptido de cobre investigado para la renovación de la piel, el cabello y el apoyo de los tejidos.",
      "ss-31": "Un péptido dirigido a la mitocondria investigado para la energía celular y la resiliencia.",
      "mots-c": "Un péptido de origen mitocondrial explorado para el metabolismo y la resistencia al ejercicio.",
      "l-arginine": "Un aminoácido explorado para la circulación, el rendimiento y el apoyo vascular.",
      "lpv": "Una opción de lisina-prolina-valina explorada dentro de protocolos de recuperación y reparación.",
      "nad": "Una coenzima celular explorada para la energía, la concentración y el apoyo al envejecimiento saludable.",
      "epithalon": "Un péptido investigado para la longevidad celular y el apoyo al sueño reparador.",
      "pinealon": "Un péptido corto explorado para el bienestar cognitivo y neurorrestaurador.",
      "cjc-1295-no-dac": "Una opción liberadora de hormona del crecimiento investigada para la recuperación y la vitalidad.",
      "cjc-1295-dac": "Una opción liberadora de hormona del crecimiento de acción prolongada para un apoyo sostenido.",
      "glutathione": "Un antioxidante maestro explorado para el apoyo a la desintoxicación, la luminosidad y la salud celular.",
      "glow": "Una mezcla estética distintiva explorada para la luminosidad de la piel y el apoyo antioxidante.",
      "snap-8": "Un péptido explorado para la apariencia de las líneas de expresión y la suavidad.",
      "lemon-bottle": "Una opción estética lipolítica explorada para el contorno y el apoyo en zonas de grasa.",
      "botulinum-toxin": "Una opción estética administrada por un profesional para la apariencia de líneas finas.",
      "b5": "Dexpantenol, explorado para el apoyo de la piel, el cabello y la barrera cutánea.",
      "b6": "Piridoxina, explorada para el equilibrio del ánimo, el metabolismo y el bienestar del sistema nervioso.",
      "methylcobalamin": "Una forma activa de B12 explorada para la energía, la concentración y el apoyo a la vitalidad.",
      "semax": "Un péptido nootrópico investigado para la concentración, la claridad y la resiliencia cognitiva.",
      "selank": "Un péptido explorado para la calma, el equilibrio del estrés y una concentración estable.",
      "dsip": "Un péptido inductor del sueño delta explorado para un sueño reparador y descansado.",
      "inositol": "Un nutriente explorado para el equilibrio del ánimo, el bienestar hormonal y el metabolismo.",
      "thymosin-alpha-1": "Un péptido investigado para el equilibrio inmunitario y el apoyo a la resiliencia.",
      "vip": "Una opción de péptido intestinal vasoactivo explorada para el apoyo inmunitario y la vitalidad.",
      "pt-141": "Un péptido explorado para el bienestar íntimo, el deseo y el apoyo a la confianza.",
    },
    faqGroups: [
      {
        heading: "Primeros pasos",
        items: [
          { q: "¿Cómo funciona IV-Dora?", a: "Cada programa comienza con una evaluación médica confidencial. Un profesional con licencia revisa tu información y determina si un protocolo personalizado es adecuado. Si lo es, los productos recetados los prepara una farmacia con licencia y se entregan de forma discreta. IV-Dora no ofrece asesoramiento médico a través del contenido del sitio web." },
          { q: "¿Necesito una receta?", a: "Los productos con receta y compuestos requieren la evaluación de un profesional con licencia, que determina si el tratamiento es adecuado para ti. No se dispensa nada sin la revisión del profesional." },
          { q: "¿Mi información es privada?", a: "Sí. Tu evaluación es confidencial, la mensajería es privada y las entregas llegan en un empaque discreto y sin marca." },
        ],
      },
      {
        heading: "Programas y productos",
        items: [
          { q: "¿Qué son los medicamentos compuestos?", a: "Los medicamentos compuestos son preparados por farmacias con licencia cuando se recetan para un paciente individual. No son medicamentos terminados aprobados por la FDA. Tu profesional analizará si una opción compuesta es adecuada para ti." },
          { q: "¿Estos productos están aprobados por la FDA?", a: "Algunos productos con receta están aprobados por la FDA; las preparaciones compuestas no son medicamentos terminados aprobados por la FDA. Las afirmaciones sobre péptidos y nutrientes no han sido evaluadas por la FDA y no pretenden diagnosticar, tratar, curar ni prevenir ninguna enfermedad." },
          { q: "¿Por qué algunas opciones dicen Receta, Compuesto o Suplemento?", a: "Estas etiquetas indican cómo se clasifica y se ofrece cada opción. Los productos con receta requieren una prescripción, los compuestos los prepara una farmacia con licencia para un paciente individual y los suplementos son apoyo nutricional, todo guiado por tu profesional." },
        ],
      },
      {
        heading: "Disponibilidad y seguridad",
        items: [
          { q: "¿Todos los programas están disponibles en mi estado?", a: "La disponibilidad varía según el estado, la decisión del profesional y las directrices farmacéuticas y regulatorias, y puede cambiar con el tiempo. Tu elegibilidad se confirma durante la evaluación y la revisión del profesional." },
          { q: "¿Y si un programa no es adecuado para mí?", a: "Si un programa no es clínicamente adecuado, tu profesional puede recomendar una alternativa o no recetarlo. Tu seguridad siempre es lo primero." },
          { q: "¿IV-Dora da asesoramiento médico en este sitio web?", a: "No. El contenido del sitio web es solo información general y no es asesoramiento médico. Consulta a un profesional con licencia sobre tus necesidades individuales." },
        ],
      },
    ],
    journal: {
      featured: {
        category: "Longevidad",
        title: "La mañana de la longevidad: pequeños rituales, energía estable",
        excerpt:
          "Cómo la primera hora del día moldea tu sueño, tu concentración y tu metabolismo — y los hábitos sencillos y con base científica a los que nuestros profesionales vuelven una y otra vez.",
        author: "Por el equipo de bienestar de IV-Dora",
      },
      habits: {
        "morning-light": {
          tag: "Ritmo circadiano",
          title: "Recibe la luz de la mañana",
          body: "De diez a veinte minutos de luz natural dentro de la primera hora tras despertar ayudan a anclar tu ritmo circadiano, favoreciendo mañanas más lúcidas y un sueño más profundo por la noche.",
        },
        "zone-2": {
          tag: "Cardio",
          title: "Entrena suave en Zona 2",
          body: "El cardio de baja intensidad, a un ritmo en el que puedes conversar, varias veces por semana desarrolla la salud metabólica y mitocondrial sin el agotamiento del alto rendimiento constante.",
        },
        "protein-first": {
          tag: "Nutrición",
          title: "Come proteína primero",
          body: "Un desayuno rico en proteína suaviza los picos de glucosa, reduce los antojos y ayuda a preservar la masa muscular con la edad.",
        },
        "contrast-therapy": {
          tag: "Recuperación",
          title: "Adopta la terapia de contraste",
          body: "Alternar calor y frío — sauna y baño frío — se está explorando por sus efectos en la circulación, el ánimo y la recuperación tras el ejercicio.",
        },
      },
      gadgets: {
        "smart-ring": {
          category: "Wearable",
          name: "Anillo inteligente de recuperación",
          blurb: "Un anillo de titanio ultraligero que registra las fases del sueño, la variabilidad de la frecuencia cardíaca y tu preparación diaria.",
          why: "Discreto, cómodo y notablemente preciso para las tendencias de sueño y recuperación.",
        },
        "glucose-monitor": {
          category: "Metabolismo",
          name: "Monitor continuo de glucosa",
          blurb: "Un sensor cutáneo que envía datos de glucosa en tiempo real a tu teléfono para ver cómo te afectan las comidas y el estrés.",
          why: "Convierte los consejos de nutrición abstractos en información personal y visible.",
        },
        "red-light": {
          category: "Fototerapia",
          name: "Panel de luz roja",
          blurb: "Un panel de luz roja e infrarroja cercana de espectro completo estudiado para la piel, la recuperación y el apoyo circadiano.",
          why: "Luz de calidad profesional en un formato elegante para casa.",
        },
        "smart-scale": {
          category: "Métricas",
          name: "Báscula de composición corporal",
          blurb: "Va más allá del peso para estimar tendencias de grasa corporal, músculo e hidratación a lo largo del tiempo.",
          why: "Las tendencias que importan, sincronizadas discretamente con tu teléfono.",
        },
        "sleep-band": {
          category: "Sueño",
          name: "Banda de seguimiento del sueño",
          blurb: "Una suave banda EEG que mide la profundidad del sueño y reproduce audio para ayudarte a conciliarlo.",
          why: "Tan cómoda que olvidas que la llevas puesta.",
        },
        "recovery-gun": {
          category: "Recuperación",
          name: "Dispositivo de percusión",
          blurb: "Terapia de percusión silenciosa y de alto par para calentamientos y recuperación tras el entrenamiento.",
          why: "Potente pero muy silencioso, con un acabado premium.",
        },
      },
    },
  },
}

// ------------------------------------------------------------
// FRENCH
// ------------------------------------------------------------
const fr = {
  ui: {
    switcher: { label: "Changer de langue" },
    header: {
      primaryNav: "Principal",
      mobileNav: "Mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      programs: "Programmes",
      allPrograms: "Tous les programmes",
      insights: "Journal",
      shop: "Boutique",
      safety: "Sécurité",
      faq: "FAQ",
      journal: "Journal",
      consult: "Réserver une consultation",
      startConsult: "Commencez votre consultation bien-être",
    },
    ticker: { label: "Annonce", message: "Nouveau dans la thérapie par peptides ?", cta: "En savoir plus sur les peptides" },
    hero: {
      eyebrow: "Bien-être guidé par des médecins",
      title: "Programmes personnalisés de peptides et de bien-être conçus autour de votre biologie",
      subtitle:
        "Découvrez des protocoles de bien-être guidés par des médecins : peptides, vitamines injectables, soutien antioxydant, programmes métaboliques et options de bien-être féminin. Chaque programme commence par un questionnaire médical et l'examen d'un praticien.",
      primaryCta: "Commencez votre consultation bien-être",
      secondaryCta: "Découvrir les programmes",
      stat1Label: "Validé par un praticien",
      stat1Value: "100%",
      stat2Label: "Pharmacies partenaires",
      stat2Value: "Agréées",
      stat3Label: "Protocoles personnalisés",
      stat3Value: "Chaque plan",
      note: "Les options sur ordonnance et préparées nécessitent l'évaluation d'un praticien agréé.",
    },
    programs: {
      eyebrow: "Programmes",
      title: "Des programmes de bien-être, organisés autour de vos objectifs",
      subtitle:
        "Chaque programme est un point de départ pour un échange avec un praticien agréé, et non une recommandation ou une ordonnance.",
      explore: "Découvrir",
      viewCategory: "Voir le programme",
      showMore: "Voir plus",
      allLabel: "Tous",
      scrollLeft: "Défiler vers la gauche",
      scrollRight: "Défiler vers la droite",
      itemsLabel: "options",
    },
    tags: {
      rx: "Ordonnance",
      compounded: "Préparé",
      supplement: "Complément",
    },
    tagNote: {
      rx: "Produit sur ordonnance : nécessite une évaluation et une ordonnance d'un praticien agréé.",
      compounded:
        "Préparation magistrale : réalisée par une pharmacie agréée lorsqu'elle est prescrite pour un patient individuel. Ce n'est pas un médicament fini approuvé par la FDA.",
      supplement: "Soutien nutritionnel : disponibilité et usage guidés par votre praticien.",
    },
    insights: {
      eyebrow: "Le journal bien-être",
      title: "Habitudes, témoignages et tendances pour bien vivre",
      subtitle: "Des habitudes fondées sur la science, de vraies expériences de membres et la science du bien-être que nous suivons.",
      exploreJournal: "Lire le Journal",
      previewLabel: "Dans ce numéro",
      tabs: [
        {
          key: "habits",
          label: "Habitudes santé",
          items: [
            { title: "Des matins riches en protéines", body: "Commencer la journée avec environ 30 g de protéines aide à stabiliser l'énergie, l'appétit et la concentration." },
            { title: "Mouvement en Zone 2", body: "Trois à quatre séances de cardio légères par semaine soutiennent la santé mitochondriale et la flexibilité métabolique." },
            { title: "Des horaires de sommeil réguliers", body: "Se coucher et se lever à la même heure chaque jour favorise la récupération plus que le nombre d'heures seul." },
          ],
        },
        {
          key: "stories",
          label: "Témoignages de membres",
          items: [
            { quote: "Le questionnaire était vraiment personnel. Mon praticien a ajusté mon protocole deux fois jusqu'à ce qu'il corresponde à ma vie.", name: "Maya R.", detail: "Programme métabolique · 6 mois" },
            { quote: "J'ai enfin de l'énergie l'après-midi et ma récupération après le sport est nettement plus rapide.", name: "Devon et Priya", detail: "Récupération + longévité" },
            { quote: "Discret, élégant et vraiment axé sur la science. On ne se sent jamais dans une démarche commerciale.", name: "Alexis T.", detail: "Bien-être féminin" },
          ],
        },
        {
          key: "trends",
          label: "Tendances bien-être",
          items: [
            { tag: "Tendance", title: "Les peptides pour la récupération", body: "L'intérêt pour les peptides de récupération ciblés ne cesse de croître avec la priorité donnée à la réparation des tissus et à la résilience." },
            { tag: "À suivre", title: "NAD+ et énergie cellulaire", body: "Les routines axées sur la longévité se concentrent de plus en plus sur le soutien mitochondrial et l'énergie cellulaire." },
            { tag: "Émergent", title: "Micronutriments personnalisés", body: "Les vitamines injectables adaptées aux analyses et aux objectifs remplacent la supplémentation universelle." },
          ],
        },
      ],
      disclaimer: "Contenu éducatif uniquement : il ne constitue pas un avis médical et ne remplace pas l'évaluation d'un praticien agréé. Les témoignages de membres sont des exemples illustratifs.",
    },
    why: {
      eyebrow: "Pourquoi IV-Dora",
      title: "Un accompagnement personnel, privé et précis",
      items: [
        { title: "Discret par conception", body: "Questionnaire confidentiel, messagerie privée et livraison sécurisée et sans marque à votre porte." },
        { title: "Une expérience élégante", body: "Un parcours serein et soigné, de la première consultation à chaque suivi." },
        { title: "Personnalisé pour vous", body: "Des protocoles façonnés par votre biologie, vos antécédents et vos objectifs, jamais standardisés." },
        { title: "Guidé par un praticien", body: "Chaque programme est examiné par un praticien agréé avant toute prescription." },
      ],
    },
    safety: {
      eyebrow: "Sécurité et transparence",
      title: "Votre sécurité guide chaque décision",
      intro:
        "IV-Dora repose sur le suivi médical et une information honnête. Veuillez consulter les informations importantes ci-dessous.",
      points: [
        { title: "Évaluation par un praticien requise", body: "Les produits sur ordonnance nécessitent l'évaluation d'un praticien agréé qui détermine si le traitement vous convient." },
        { title: "À propos des préparations magistrales", body: "Les préparations magistrales sont réalisées par des pharmacies agréées lorsqu'elles sont prescrites pour un patient individuel et ne sont pas des médicaments finis approuvés par la FDA." },
        { title: "La disponibilité varie", body: "La disponibilité varie selon l'État, la décision du praticien et les directives pharmaceutiques et réglementaires, et peut évoluer avec le temps." },
        { title: "Pas un avis médical", body: "IV-Dora ne fournit pas d'avis médical via le contenu du site web. Consultez toujours un praticien qualifié pour vos besoins individuels." },
      ],
      disclaimerTitle: "Avertissement important",
      disclaimerBody:
        "IV-Dora ne fournit pas d'avis médical via le contenu du site web. Les produits sur ordonnance nécessitent l'évaluation d'un praticien agréé. Les préparations magistrales sont réalisées par des pharmacies agréées lorsqu'elles sont prescrites pour un patient individuel et ne sont pas des médicaments finis approuvés par la FDA. La disponibilité varie selon l'État, la décision du praticien et les directives pharmaceutiques et réglementaires. Les déclarations concernant les peptides et les nutriments n'ont pas été évaluées par la FDA et ne visent pas à diagnostiquer, traiter, guérir ou prévenir une maladie. Les témoignages, biographies de praticiens et chiffres d'adhésion présentés sont illustratifs et doivent être remplacés avant le lancement.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Questions fréquentes",
      subtitle: "Des réponses claires sur le fonctionnement des programmes guidés par des médecins chez IV-Dora.",
      searchPlaceholder: "Rechercher des questions…",
      searchAria: "Rechercher dans les questions fréquentes",
      noResults: (q) => `Aucun résultat pour « ${q} ». Essayez une autre recherche.`,
      stillTitle: "D'autres questions ?",
      stillBody: "Notre équipe de conciergerie est là pour vous aider à démarrer.",
      contactCta: "Réserver une consultation",
    },
    contact: {
      eyebrow: "Commencer",
      title: "Réservez votre consultation bien-être",
      subtitle:
        "Partagez quelques informations et notre équipe vous aidera à démarrer un questionnaire médical confidentiel. Ce formulaire ne fournit pas d'avis médical.",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail",
      phone: "Téléphone (facultatif)",
      state: "État de résidence",
      statePlaceholder: "Sélectionnez votre État",
      interest: "Programme qui vous intéresse",
      interestPlaceholder: "Sélectionnez un programme",
      message: "Quels sont vos objectifs bien-être ?",
      messagePlaceholder: "Dites-nous un peu ce que vous souhaitez accomplir…",
      consent:
        "Je comprends qu'IV-Dora ne fournit pas d'avis médical via ce formulaire et que les produits sur ordonnance et préparés nécessitent l'évaluation d'un praticien agréé.",
      submit: "Demander une consultation",
      submitting: "Envoi…",
      errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
      successTitle: "Merci — nous avons bien reçu votre demande",
      successBody:
        "Un membre de notre équipe vous contactera pour vous guider dans le questionnaire médical confidentiel. Aucune décision médicale n'a été prise.",
      backHome: "Retour à l'accueil",
      sidebarTitle: "À quoi s'attendre",
      sidebarSteps: [
        "Un questionnaire médical confidentiel",
        "Un examen par un praticien agréé",
        "Une recommandation personnalisée, uniquement si elle est appropriée",
      ],
      reach: "Vous préférez nous contacter directement ?",
    },
    footer: {
      tagline: "Programmes de peptides, de vitamines et de bien-être guidés par des médecins, personnalisés selon votre biologie.",
      programsHeading: "Programmes",
      companyHeading: "Entreprise",
      supportHeading: "Assistance",
      company: [
        { label: "Journal", href: "/#insights" },
        { label: "Pourquoi IV-Dora", href: "/#why" },
        { label: "Sécurité", href: "/#safety" },
      ],
      support: [
        { label: "FAQ", href: "/faq" },
        { label: "Réserver une consultation", href: "/consultation" },
        { label: "Contact", href: "/consultation" },
      ],
      rights: "Tous droits réservés.",
      legal:
        "IV-Dora ne fournit pas d'avis médical via le contenu du site web. Les produits sur ordonnance nécessitent l'évaluation d'un praticien agréé. Les préparations magistrales sont réalisées par des pharmacies agréées pour un patient individuel et ne sont pas des médicaments finis approuvés par la FDA. La disponibilité varie selon l'État, la décision du praticien et les directives pharmaceutiques et réglementaires.",
      placeholderNote: "Le nom de la marque, les témoignages, les biographies de praticiens et le nombre de membres sont provisoires, en attente de validation.",
    },
    productDetail: {
      backToPrograms: "Tous les programmes",
      notFound: "Programme introuvable",
      backHome: "Retour à l'accueil",
      classification: "Classification",
      partOf: "Fait partie de ces programmes",
      startCta: "Commencez votre consultation bien-être",
      exploreCta: "Découvrir les options associées",
      overview: "Aperçu",
      safetyHeading: "Informations importantes",
      relatedTitle: "Autres options de ce programme",
      researchOnly: "Réservé à un usage de recherche",
      addToCart: "Ajouter au panier",
      added: "Ajouté au panier",
      perVial: "par flacon de 10 mL",
    },
    cart: {
      title: "Votre panier",
      open: "Ouvrir le panier",
      empty: "Votre panier est vide.",
      emptyCta: "Parcourir les programmes",
      item: "article",
      items: "articles",
      quantity: "Quantité",
      remove: "Retirer",
      each: "pièce",
      subtotal: "Sous-total",
      total: "Total",
      continueShopping: "Continuer mes achats",
      checkoutHeading: "Finaliser la commande",
  checkoutIntro: "Saisissez vos coordonnées, puis payez en toute sécurité via Stripe pour finaliser votre commande.",
  firstName: "Prénom",
  lastName: "Nom",
  email: "E-mail",
  phone: "Téléphone (facultatif)",
  notes: "Notes de commande (facultatif)",
  consent:
  "Je comprends qu'un praticien agréé doit vérifier l'admissibilité avant la préparation de tout produit sur ordonnance.",
  payNow: "Payer maintenant",
  submitting: "Redirection…",
  canceled: "Votre paiement a été annulé. Votre panier vous attend lorsque vous êtes prêt.",
  errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
  verifying: "Confirmation de votre paiement…",
  paidTitle: "Paiement réussi",
  paidBody: "Merci pour votre commande. Un reçu a été envoyé à votre adresse e-mail et notre équipe vous contactera pour la suite.",
  unpaidTitle: "Paiement non finalisé",
  unpaidBody: "Nous n'avons pas pu confirmer votre paiement. Si vous avez été débité, contactez-nous et nous vous aiderons rapidement.",
  orderRef: "Votre numéro de commande est",
  backHome: "Retour à l'accueil",
  backToCart: "Retour au panier",
  disclaimer:
  "Les paiements sont traités en toute sécurité par Stripe. Les produits sur ordonnance nécessitent l'examen d'un praticien avant préparation.",
  },
    hsa: {
      eyebrow: "Boutique HSA / FSA",
      title: "Achetez des technologies de santé éligibles HSA",
      subtitle:
        "Des appareils plébiscités par les praticiens pour les affections du quotidien — payez sans taxe avec votre carte HSA ou FSA au moment du paiement.",
      tabs: { bestseller: "Meilleures ventes", trending: "Tendance", new: "Nouveautés" },
      badges: { bestseller: "Meilleure vente", trending: "Tendance", new: "Nouveau" },
      shopByCondition: "Acheter par affection",
      allConditions: "Tous les produits",
      conditions: {
        pain: "Douleur",
        skin: "Peau",
        "blood-pressure": "Tension artérielle",
        sleep: "Sommeil",
        allergy: "Allergie",
        diabetes: "Diabète",
      },
      eligible: "Éligible HSA",
      addToCart: "Ajouter au panier",
      added: "Ajouté au panier",
      viewCart: "Voir le panier",
      empty: "Aucun produit ne correspond à ce filtre pour l'instant.",
      disclaimer:
        "L'éligibilité HSA/FSA peut varier selon le régime. Ce sont des appareils de bien-être général, pas un avis médical — vérifiez le remboursement auprès de l'administrateur de votre régime.",
    },
    categoryPage: {
      notFound: "Programme introuvable",
      backHome: "Retour à l'accueil",
      startCta: "Commencez votre consultation bien-être",
      optionsTitle: (label) => `Options dans ${label}`,
    },
    journal: {
      eyebrow: "Le Journal Bien-être",
      title: "Bien vivre, avec intention",
      subtitle:
        "Habitudes tendance, rituels fondés sur la science et dernières technologies de santé — sélectionnés par notre rédaction bien-être.",
      featuredBadge: "Choix de la rédaction",
      readStory: "Lire l'article",
      readTime: (min) => `${min} min de lecture`,
      pillarsEyebrow: "Le focus de la semaine",
      pillarsTitle: "Le bien-être, en trois piliers",
      pillarsSubtitle:
        "De nouvelles recommandations sur la santé mentale, l'alimentation et le mode de vie — actualisées chaque semaine.",
      spotlightBadge: "À la une cette semaine",
      updatedLabel: "Mis à jour",
      pillarLabels: {
        mental: "Santé mentale",
        eating: "Bonnes habitudes alimentaires",
        lifestyle: "Mode de vie sain",
      },
      habitsEyebrow: "Tendance",
      habitsTitle: "Les meilleures habitudes santé de la saison",
      habitsSubtitle: "Les pratiques quotidiennes que notre communauté et nos praticiens adoptent en ce moment.",
      trending: "Tendance",
      gadgetsEyebrow: "Ce que nous testons",
      gadgetsTitle: "Dernières technologies de santé",
      gadgetsSubtitle:
        "Les appareils qui facilitent la mesure, la récupération et l'optimisation de votre bien-être au quotidien.",
      whyLove: "Pourquoi on aime",
      from: "à partir de",
      ratingAria: (r) => `Noté ${r} sur 5`,
      newsletterTitle: "Recevez le Journal par e-mail",
      newsletterBody: "Des lectures bien-être mensuelles, des guides d'habitudes et des tests d'appareils. Pas de spam — désabonnement à tout moment.",
      newsletterPlaceholder: "Votre adresse e-mail",
      newsletterCta: "S'abonner",
      newsletterAria: "Adresse e-mail",
      newsletterSuccess: "Vous êtes abonné. Surveillez votre boîte de réception pour le prochain numéro.",
      disclaimer:
        "Le Journal Bien-être est destiné à une information générale uniquement et ne constitue pas un avis médical. Les appareils sont des produits indépendants et ne sont ni vendus, ni recommandés, ni approuvés médicalement par IV-Dora. Consultez un praticien agréé pour vos besoins individuels.",
    },
  },

  content: {

    categories: {
      womens: {
        label: "Santé féminine",
        short: "Santé féminine",
        description:
          "Des programmes personnalisés pour le bien-être féminin : équilibre hormonal, soutien métabolique, beauté, bien-être intime et vitalité au quotidien.",
      },
      mens: {
        label: "Santé masculine",
        short: "Santé masculine",
        description:
          "Des programmes encadrés par des praticiens qui soutiennent la vitalité, la récupération, la performance, la composition corporelle et un vieillissement en bonne santé chez l'homme.",
      },
      weight: {
        label: "Gestion du poids",
        short: "Poids",
        description:
          "Des programmes conçus pour soutenir la régulation de l'appétit, la santé métabolique, la composition corporelle et des objectifs de gestion du poids encadrés médicalement.",
      },
      longevity: {
        label: "Longévité",
        short: "Longévité",
        description:
          "Des protocoles de bien-être cellulaire axés sur l'énergie, la récupération, le soutien face au stress oxydatif, la fonction mitochondriale et la vitalité �� long terme.",
      },
      dermatology: {
        label: "Dermatologie",
        short: "Dermatologie",
        description:
          "Des options axées sur la peau et l'esthétique, conçues pour soutenir l'apparence de la peau, le soutien antioxydant, l'éclat, l'hydratation et le soin esthétique.",
      },
      sexual: {
        label: "Santé sexuelle",
        short: "Santé sexuelle",
        description:
          "Des options discrètes et encadrées par des praticiens, étudiées pour la libido, la circulation, la confiance et le bien-être intime.",
      },
      mental: {
        label: "Santé mentale",
        short: "Santé mentale",
        description:
          "Des options de bien-être étudiées pour le soutien cognitif, l'équilibre du stress, la qualité du sommeil, la concentration et le bien-être du système nerveux.",
      },
      hormone: {
        label: "Traitement hormonal",
        short: "Hormones",
        description:
          "Un soutien hormonal et de facteurs de croissance encadré par des praticiens, axé sur l'énergie, l'équilibre, la récupération et un vieillissement en bonne santé.",
      },
    },
    products: {
      "semaglutide": "Une option de programme GLP-1 étudiée pour la régulation de l'appétit et la gestion du poids encadrée médicalement.",
      "tirzepatide": "Une option double incrétine étudiée dans des programmes métaboliques et de gestion du poids guidés par un praticien.",
      "retatrutide": "Une option métabolique en cours d'étude explorée pour des objectifs de composition corporelle et de gestion du poids.",
      "cagrilintide": "Une option analogue de l'amyline étudiée avec des programmes d'appétit et de bien-être métabolique.",
      "cagrilintide-semaglutide": "Une option combinée explorée pour la régulation de l'appétit et le soutien métabolique.",
      "tesamorelin": "Une option libératrice d'hormone de croissance étudiée pour la composition corporelle et le bien-être métabolique.",
      "hcg": "Une option prescrite par un praticien utilisée dans certains protocoles métaboliques et de bien-être.",
      "l-carnitine": "Une option nutritionnelle explorée pour le métabolisme énergétique et le soutien de l'utilisation des graisses.",
      "mic": "Un mélange lipotrope de méthionine, inositol et choline exploré pour le soutien métabolique.",
      "bpc-157": "Un peptide largement étudié pour le soutien des tissus, la récupération et le bien-être intestinal.",
      "tb-500": "Un fragment de thymosine bêta-4 étudié pour la récupération, la souplesse et la réparation des tissus.",
      "bpc-tb": "Une option de récupération combinée associant BPC-157 et TB-500 pour le soutien des tissus.",
      "ghk-cu": "Un peptide de cuivre étudié pour le renouvellement de la peau, les cheveux et le soutien des tissus.",
      "ss-31": "Un peptide ciblant les mitochondries étudié pour l'énergie cellulaire et la résilience.",
      "mots-c": "Un peptide d'origine mitochondriale exploré pour le métabolisme et la résilience à l'effort.",
      "l-arginine": "Un acide aminé exploré pour la circulation, la performance et le soutien vasculaire.",
      "lpv": "Une option lysine-proline-valine explorée dans des protocoles de récupération et de réparation.",
      "nad": "Une coenzyme cellulaire explorée pour l'énergie, la concentration et le soutien au vieillissement sain.",
      "epithalon": "Un peptide étudié pour la longévité cellulaire et le soutien d'un sommeil réparateur.",
      "pinealon": "Un peptide court exploré pour le bien-être cognitif et neuro-restaurateur.",
      "cjc-1295-no-dac": "Une option libératrice d'hormone de croissance étudiée pour la récupération et la vitalité.",
      "cjc-1295-dac": "Une option libératrice d'hormone de croissance à action prolongée pour un soutien durable.",
      "glutathione": "Un antioxydant majeur exploré pour le soutien à la détoxification, l'éclat et la santé cellulaire.",
      "glow": "Un mélange esthétique signature exploré pour l'éclat de la peau et le soutien antioxydant.",
      "snap-8": "Un peptide exploré pour l'apparence des rides d'expression et la douceur.",
      "lemon-bottle": "Une option esthétique lipolytique explorée pour le contour et le soutien des zones grasses.",
      "botulinum-toxin": "Une option esthétique administrée par un praticien pour l'apparence des ridules.",
      "b5": "Le dexpanthénol, exploré pour le soutien de la peau, des cheveux et de la barrière cutanée.",
      "b6": "La pyridoxine, explorée pour l'équilibre de l'humeur, le métabolisme et le bien-être du système nerveux.",
      "methylcobalamin": "Une forme active de B12 explorée pour l'énergie, la concentration et le soutien à la vitalité.",
      "semax": "Un peptide nootrope étudié pour la concentration, la clarté et la résilience cognitive.",
      "selank": "Un peptide exploré pour le calme, l'équilibre du stress et une concentration stable.",
      "dsip": "Un peptide inducteur de sommeil delta exploré pour un sommeil réparateur et reposant.",
      "inositol": "Un nutriment exploré pour l'équilibre de l'humeur, le bien-être hormonal et le métabolisme.",
      "thymosin-alpha-1": "Un peptide étudié pour l'équilibre immunitaire et le soutien à la résilience.",
      "vip": "Une option de peptide intestinal vasoactif explorée pour le soutien immunitaire et la vitalité.",
      "pt-141": "Un peptide exploré pour le bien-être intime, le désir et le soutien à la confiance.",
    },
    faqGroups: [
      {
        heading: "Pour commencer",
        items: [
          { q: "Comment fonctionne IV-Dora ?", a: "Chaque programme commence par un questionnaire médical confidentiel. Un praticien agréé examine vos informations et détermine si un protocole personnalisé est approprié. Si c'est le cas, les produits prescrits sont préparés par une pharmacie agréée et livrés discrètement. IV-Dora ne fournit pas d'avis médical via le contenu du site web." },
          { q: "Ai-je besoin d'une ordonnance ?", a: "Les produits sur ordonnance et préparés nécessitent l'évaluation d'un praticien agréé, qui détermine si le traitement vous convient. Rien n'est délivré sans l'examen du praticien." },
          { q: "Mes informations sont-elles privées ?", a: "Oui. Votre questionnaire est confidentiel, la messagerie est privée et les livraisons arrivent dans un emballage discret et sans marque." },
        ],
      },
      {
        heading: "Programmes et produits",
        items: [
          { q: "Que sont les préparations magistrales ?", a: "Les préparations magistrales sont réalisées par des pharmacies agréées lorsqu'elles sont prescrites pour un patient individuel. Ce ne sont pas des médicaments finis approuvés par la FDA. Votre praticien discutera de la pertinence d'une option préparée pour vous." },
          { q: "Ces produits sont-ils approuvés par la FDA ?", a: "Certains produits sur ordonnance sont approuvés par la FDA ; les préparations magistrales ne sont pas des médicaments finis approuvés par la FDA. Les déclarations sur les peptides et les nutriments n'ont pas été évaluées par la FDA et ne visent pas à diagnostiquer, traiter, guérir ou prévenir une maladie." },
          { q: "Pourquoi certaines options indiquent-elles Ordonnance, Préparé ou Complément ?", a: "Ces étiquettes indiquent comment chaque option est classée et fournie. Les produits sur ordonnance nécessitent une prescription, les produits préparés sont réalisés par une pharmacie agréée pour un patient individuel, et les compléments sont un soutien nutritionnel, le tout guidé par votre praticien." },
        ],
      },
      {
        heading: "Disponibilité et sécurité",
        items: [
          { q: "Chaque programme est-il disponible dans mon État ?", a: "La disponibilité varie selon l'État, la décision du praticien et les directives pharmaceutiques et réglementaires, et peut évoluer avec le temps. Votre éligibilité est confirm��e lors du questionnaire et de l'examen du praticien." },
          { q: "Et si un programme ne me convient pas ?", a: "Si un programme n'est pas cliniquement approprié, votre praticien peut recommander une alternative ou refuser de le prescrire. Votre sécurité passe toujours en premier." },
          { q: "IV-Dora donne-t-il des avis médicaux sur ce site web ?", a: "Non. Le contenu du site web est uniquement une information générale et non un avis médical. Consultez un praticien agréé pour vos besoins individuels." },
        ],
      },
    ],
    journal: {
      featured: {
        category: "Longévité",
        title: "La matinée de la longévité : de petits rituels, une énergie stable",
        excerpt:
          "Comment la première heure de votre journée façonne votre sommeil, votre concentration et votre métabolisme — et les habitudes simples et fondées sur la science auxquelles nos praticiens reviennent sans cesse.",
        author: "Par la rédaction bien-être d'IV-Dora",
      },
      habits: {
        "morning-light": {
          tag: "Rythme circadien",
          title: "Captez la lumière du matin",
          body: "De dix à vingt minutes de lumière du jour dans l'heure qui suit le réveil aident à ancrer votre rythme circadien, favorisant des matinées plus nettes et un sommeil plus profond la nuit.",
        },
        "zone-2": {
          tag: "Cardio",
          title: "Entraînez-vous en douceur en Zone 2",
          body: "Un cardio de faible intensité, à un rythme où l'on peut converser, quelques fois par semaine développe la santé métabolique et mitochondriale sans l'épuisement du haut niveau constant.",
        },
        "protein-first": {
          tag: "Nutrition",
          title: "Mangez d'abord des protéines",
          body: "Un petit-déjeuner riche en protéines atténue les pics de glucose, réduit les fringales et aide à préserver la masse musculaire avec l'âge.",
        },
        "contrast-therapy": {
          tag: "Récupération",
          title: "Adoptez la thérapie par contraste",
          body: "Alterner chaud et froid — sauna et bain froid — est étudié pour ses effets sur la circulation, l'humeur et la récupération après l'effort.",
        },
      },
      gadgets: {
        "smart-ring": {
          category: "Objet connecté",
          name: "Bague de récupération connectée",
          blurb: "Une bague en titane ultralégère qui suit les phases de sommeil, la variabilité de la fréquence cardiaque et votre forme du jour.",
          why: "Discrète, confortable et remarquablement précise pour les tendances de sommeil et de récupération.",
        },
        "glucose-monitor": {
          category: "Métabolisme",
          name: "Capteur de glucose en continu",
          blurb: "Un capteur cutané qui transmet des données de glucose en temps réel à votre téléphone pour voir comment les repas et le stress vous affectent.",
          why: "Transforme les conseils nutritionnels abstraits en retours personnels et visibles.",
        },
        "red-light": {
          category: "Luminothérapie",
          name: "Panneau de luminothérapie rouge",
          blurb: "Un panneau de lumière rouge et proche infrarouge à spectre complet étudié pour la peau, la récupération et le soutien circadien.",
          why: "Une lumière de qualité professionnelle dans un format élégant pour la maison.",
        },
        "smart-scale": {
          category: "Mesures",
          name: "Balance à composition corporelle",
          blurb: "Va au-delà du poids pour estimer les tendances de masse grasse, de muscle et d'hydratation dans le temps.",
          why: "Les tendances qui comptent, synchronisées discrètement avec votre téléphone.",
        },
        "sleep-band": {
          category: "Sommeil",
          name: "Bandeau de suivi du sommeil",
          blurb: "Un doux bandeau EEG qui mesure la profondeur du sommeil et diffuse de l'audio pour vous aider à vous endormir.",
          why: "Si confortable que l'on oublie qu'on le porte.",
        },
        "recovery-gun": {
          category: "Récupération",
          name: "Appareil de percussion",
          blurb: "Une thérapie par percussion silencieuse et à couple élevé pour l'échauffement et la récupération après l'entraînement.",
          why: "Puissant mais très silencieux, avec une finition premium.",
        },
      },
    },
  },
}

export const TRANSLATIONS = { en, es, fr }

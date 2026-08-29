const state = {
  rows: [],
  filtered: [],
  page: 1,
  pageSize: 24,
  query: "",
  sector: "all",
  rates: new Set([15, 25, 50]),
  sort: "code-asc",
  fiftyOnly: false,
  language: "en",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const formatNumber = (value) => new Intl.NumberFormat(state.language === "fr" ? "fr-CA" : "en-CA").format(value);

const mainFrenchText = new Map([
  ["Skip to results", "Passer aux résultats"],
  ["Zero engagement // Canada", "Zéro engagement // Canada"],
  ["Counter-tariff field guide", "Guide des contre-tarifs"],
  ["Official list updated Aug. 26, 2026", "Liste officielle mise à jour le 26 août 2026"],
  ["Method", "Méthode"],
  ["A TARIFF RAISES THE PRICE.", "UN TARIF FAIT MONTER LE PRIX."],
  ["WE CAN CHOOSE WHERE THAT SALE GOES.", "NOUS POUVONS CHOISIR OÙ VA CETTE VENTE."],
  ["ISSUE 09.08.26", "ÉDITION 08.09.26"],
  ["FIELD", "GUIDE"],
  ["GUIDE", "TERRAIN"],
  ["SEARCHABLE // BILINGUAL // SOURCE-CHECKED", "RECHERCHABLE // BILINGUE // SOURCES VÉRIFIÉES"],
  ["300 VERIFIED CANADIAN-MADE PRODUCTS", "300 PRODUITS FABRIQUÉS AU CANADA ET VÉRIFIÉS"],
  ["Browse products and manufacturers across 14 sectors.", "Parcourez les produits et fabricants de 14 secteurs."],
  ["OPEN THE GUIDE", "OUVRIR LE GUIDE"],
  ["How personal avoidance adds pressure", "Comment nos choix créent une pression"],
  ["A single choice may feel small. Together, our choices can shift demand.", "Un seul choix peut sembler minime. Ensemble, nos choix peuvent déplacer la demande."],
  ["ZED DAYS helps Canadians understand the tariffs and choose where their spending goes. When many people make similar choices, reduced demand can add economic pressure for a change in trade policy. That pressure may influence businesses and governments, but no individual purchase guarantees a policy result.", "ZED DAYS aide les Canadiens à comprendre les tarifs et à choisir où va leur argent. Lorsque de nombreuses personnes font des choix semblables, la baisse de la demande peut accroître la pression économique en faveur d’un changement de politique commerciale. Cette pression peut influencer les entreprises et les gouvernements, mais aucun achat individuel ne garantit un résultat politique."],
  ["Start with one everyday choice.", "Commencez par un choix quotidien."],
  ["Choose something Canadian, look for another country of origin, buy used, repair, or simply wait.", "Choisissez canadien, cherchez une autre origine, achetez d’occasion, réparez ou attendez simplement."],
  ["That choice changes what gets sold.", "Ce choix change ce qui se vend."],
  ["When the same products keep getting passed over, retailers and importers may begin ordering less of them.", "Lorsque les mêmes produits sont régulièrement délaissés, les détaillants et importateurs peuvent commencer à en commander moins."],
  ["Small choices begin to add up.", "Les petits choix commencent à s’additionner."],
  ["Across many households, fewer purchases can become a noticeable shift in orders, inventory and sales.", "Dans de nombreux ménages, la baisse des achats peut devenir un changement visible dans les commandes, les stocks et les ventes."],
  ["The pressure becomes visible.", "La pression devient visible."],
  ["If orders and sales fall, affected suppliers may choose to raise the issue with governments. A policy response is possible, not guaranteed.", "Si les commandes et les ventes diminuent, les fournisseurs touchés peuvent choisir de soulever la question auprès des gouvernements. Une réponse politique est possible, mais elle n’est pas garantie."],
  ["Illustrative example", "Exemple illustratif"],
  ["One C$6 U.S.-origin milk product each week", "Un produit laitier américain de 6 $ CA par semaine"],
  ["1 household", "1 ménage"],
  ["10,000 households", "10 000 ménages"],
  ["100,000 households", "100 000 ménages"],
  ["1 million households", "1 million de ménages"],
  ["redirected per year", "réaffectés par année"],
  ["potential annual demand shift", "déplacement annuel potentiel de la demande"],
  ["Official tariff lines", "Lignes tarifaires officielles"],
  ["Current consolidated schedule", "Barème consolidé actuel"],
  ["At 50%", "À 50 %"],
  ["Highest retaliatory rate", "Taux de représailles le plus élevé"],
  ["Covered imports", "Importations visées"],
  ["Official aggregate, not line-level", "Total officiel, non ventilé par ligne"],
  ["Effective", "En vigueur"],
  ["12:01 a.m. EDT, 2026", "00 h 01 HAE, 2026"],
  ["FIELD NOTE 01:", "NOTE DE TERRAIN 01 :"],
  ["This explorer follows the published table exactly and will not pad the list with expired measures.", "Cet outil suit fidèlement le tableau publié et n’ajoute aucune mesure expirée."],
  ["Immediate action // consumer targets", "Action immédiate // priorités de consommation"],
  ["10 U.S. product groups to skip first", "10 groupes de produits américains à éviter d’abord"],
  ["Ranked for practical leverage, not claimed dollar volume: tariff rate + purchase visibility + Canadian substitution potential + breadth of covered lines.", "Classés selon leur effet pratique, et non selon une valeur monétaire déclarée : taux tarifaire, visibilité des achats, possibilités de remplacement canadien et étendue des lignes visées."],
  ["These are campaign priorities, not an official government value ranking. Check country of origin: tariffs apply to U.S.-origin goods, not every American brand.", "Il s’agit de priorités de campagne, et non d’un classement officiel selon la valeur. Vérifiez le pays d’origine : les tarifs visent les biens d’origine américaine, pas toutes les marques américaines."],
  ["Furniture & seating", "Meubles et sièges"],
  ["Clothing & apparel", "Vêtements"],
  ["Major appliances", "Gros électroménagers"],
  ["Dairy products", "Produits laitiers"],
  ["Paper & stationery", "Papier et papeterie"],
  ["Beauty & fragrance", "Beauté et parfums"],
  ["Sports & outdoor gear", "Sports et plein air"],
  ["Electronics & machinery", "Électronique et machinerie"],
  ["Plastic kitchenware", "Articles de cuisine en plastique"],
  ["Hand tools", "Outils à main"],
  ["50% priority", "Priorité à 50 %"],
  ["Up to 50%", "Jusqu’à 50 %"],
  ["Big-ticket, visible purchases with Canadian and non-U.S. alternatives.", "Achats importants et visibles offrant des options canadiennes et non américaines."],
  ["Frequent purchases across T-shirts, suits, trousers, dresses and outerwear.", "Achats fréquents : t-shirts, complets, pantalons, robes et vêtements d’extérieur."],
  ["High-value purchases make one brand switch count more than many small buys.", "Pour ces achats coûteux, changer de marque peut compter davantage que plusieurs petits achats."],
  ["Repeat grocery spending can redirect demand every week.", "Les achats d’épicerie répétés peuvent réorienter la demande chaque semaine."],
  ["Broad coverage and easy substitution for household and office purchases.", "Vaste couverture et remplacement facile pour la maison et le bureau."],
  ["Perfume, makeup and hair products are clearly branded and easy to replace.", "Les parfums, cosmétiques et produits capillaires sont bien identifiés et faciles à remplacer."],
  ["Includes fitness equipment, outdoor goods, golf items and fishing rods.", "Comprend le matériel de conditionnement, de plein air, de golf et les cannes à pêche."],
  ["A broad equipment category where purchase values can be substantial.", "Une vaste catégorie d’équipement où la valeur des achats peut être importante."],
  ["Everyday household products with abundant alternatives.", "Produits ménagers courants offrant de nombreuses options."],
  ["Durable purchases where origin can be checked before buying.", "Achats durables dont l’origine peut être vérifiée avant l’achat."],
  ["Verified Canadian alternatives // pilot", "Options canadiennes vérifiées // projet pilote"],
  ["Two places to start in every priority category", "Deux points de départ dans chaque catégorie prioritaire"],
  ["Independent, unpaid listings checked against official company sources on Aug. 28, 2026. “Canadian-owned” and “made in Canada” are not treated as the same claim.", "Fiches indépendantes et non rémunérées, vérifiées dans les sources officielles des entreprises le 28 août 2026. « Propriété canadienne » et « fabriqué au Canada » ne sont pas considérés comme équivalents."],
  ["Check before you buy.", "Vérifiez avant d’acheter."],
  ["Made in Canada", "Fabriqué au Canada"],
  ["Made in Canada: select products", "Fabriqué au Canada : certains produits"],
  ["Made in Canada: select collection", "Fabriqué au Canada : collection sélectionnée"],
  ["Made in Canada: select upholstery", "Fabriqué au Canada : certains meubles rembourrés"],
  ["Made in Canada: select paper", "Fabriqué au Canada : certains papiers"],
  ["Made in Canada: most products", "Fabriqué au Canada : la plupart des produits"],
  ["Made in Canada: select series", "Fabriqué au Canada : certaines séries"],
  ["Made in Canada: select tools", "Fabriqué au Canada : certains outils"],
  ["100% Canadian milk", "Lait 100 % canadien"],
  ["Canadian farmer-owned", "Propriété de producteurs laitiers canadiens"],
  ["Canadian-owned: verify origin", "Propriété canadienne : vérifier l’origine"],
  ["Canadian factory: verify product", "Usine canadienne : vérifier le produit"],
  ["Made in Ontario", "Fabriqué en Ontario"],
  ["Made in Montreal", "Fabriqué à Montréal"],
  ["Ottawa manufacturing: select tools", "Fabrication à Ottawa : certains outils"],
  ["Save to your phone // grocery field notes", "À enregistrer sur votre téléphone // notes d’épicerie"],
  ["Canadian Grocery Guide", "Guide d’épicerie canadien"],
  ["Download all 13 cards", "Télécharger les 13 cartes"],
  ["Swipe cards →", "Faites glisser les cartes →"],
  ["Use these as starting points, not guarantees.", "Utilisez-les comme points de départ, non comme garanties."],
  ["Thirteen screenshot-friendly cards with 34 verified starting points across eleven grocery-store aisles. Open a card, save the full-size image, and check the wording on the package while you shop.", "Treize cartes faciles à enregistrer, avec 34 points de départ vérifiés dans onze rayons d’épicerie. Ouvrez une carte, enregistrez l’image pleine grandeur et vérifiez le libellé sur l’emballage en magasin."],
  ["Fresh produce", "Fruits et légumes frais"],
  ["Contact ZED DAYS", "Contacter ZED DAYS"],
  ["Find a product", "Trouver un produit"],
  ["Search the schedule", "Rechercher dans le barème"],
  ["Reset", "Réinitialiser"],
  ["Search by HS code or product description", "Rechercher par code SH ou description de produit"],
  ["HS code or product description", "Code SH ou description de produit"],
  ["Tariff rate", "Taux tarifaire"],
  ["Sector", "Secteur"],
  ["All sectors", "Tous les secteurs"],
  ["Sort", "Trier"],
  ["HS code: low to high", "Code SH : ordre croissant"],
  ["Rate: high to low", "Taux : ordre décroissant"],
  ["Sector: A–Z", "Secteur : A–Z"],
  ["Show only 50%", "Afficher seulement 50 %"],
  ["Complete HS list", "Liste complète des codes SH"],
  ["Compare sectors", "Comparer les secteurs"],
  ["Export filtered CSV", "Exporter le CSV filtré"],
  ["HS code", "Code SH"],
  ["Indicative description", "Description indicative"],
  ["Rate", "Taux"],
  ["Trade impact", "Impact commercial"],
  ["Open details", "Ouvrir les détails"],
  ["No tariff lines match", "Aucune ligne tarifaire ne correspond"],
  ["Broaden the search or restore all rates.", "Élargissez la recherche ou rétablissez tous les taux."],
  ["Reset filters", "Réinitialiser les filtres"],
  ["Previous", "Précédent"],
  ["Next", "Suivant"],
  ["Filtered comparison", "Comparaison filtrée"],
  ["Retaliatory scope by sector", "Portée des représailles par secteur"],
  ["Bars show tariff-line count. Dollar exposure is available only for the full C$27.6B measure.", "Les barres indiquent le nombre de lignes tarifaires. L’exposition en dollars n’est disponible que pour la mesure globale de 27,6 G$ CA."],
  ["Keep the resource independent", "Gardons la ressource indépendante"],
  ["Support ZED DAYS", "Soutenir ZED DAYS"],
  ["ZED DAYS is an independently run Canadian public resource, researched, designed and maintained without paid listings or corporate influence.", "ZED DAYS est une ressource publique canadienne indépendante, recherchée, conçue et tenue à jour sans fiches payantes ni influence d’entreprise."],
  ["Optional contributions help cover hosting, source verification, translation, regular updates, and the development of free printable and physical field resources. When funding permits, printed materials will be distributed to communities at no charge.", "Les contributions facultatives aident à payer l’hébergement, la vérification des sources, la traduction, les mises à jour régulières et la création de ressources imprimables et physiques gratuites. Lorsque le financement le permettra, du matériel imprimé sera distribué gratuitement dans les communautés."],
  ["Contributions never influence which products or companies appear in the guide. Digital resources will remain free for everyone.", "Les contributions n’influencent jamais les produits ou entreprises qui figurent dans le guide. Les ressources numériques resteront gratuites pour tout le monde."],
  ["ZED DAYS is not currently a registered charity. Contributions are not eligible for charitable tax receipts.", "ZED DAYS n’est pas actuellement un organisme de bienfaisance enregistré. Les contributions ne donnent pas droit à un reçu fiscal."],
  ["Source: Department of Finance Canada", "Source : ministère des Finances Canada"],
  ["Open official schedule", "Ouvrir le barème officiel"],
  ["Method & limits", "Méthode et limites"],
  ["What this dashboard measures", "Ce que mesure ce tableau de bord"],
  ["Read the official announcement", "Lire l’annonce officielle"],
]);

function translateStaticText(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("script, style")) continue;
    if (node.__zedOriginal === undefined) node.__zedOriginal = node.nodeValue;
    const original = node.__zedOriginal;
    const key = original.trim().replace(/\s+/g, " ");
    const replacement = language === "fr" ? mainFrenchText.get(key) : null;
    if (replacement) {
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${replacement}${trailing}`;
    } else {
      node.nodeValue = original;
    }
  }
}

function setMainLanguage(language) {
  state.language = language;
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  document.title = language === "fr"
    ? "Guide des contre-tarifs ZED DAYS | 8 septembre 2026"
    : "ZED DAYS Counter-Tariff Field Guide | September 8, 2026";
  $("#languageEnglish").setAttribute("aria-pressed", String(language === "en"));
  $("#languageFrench").setAttribute("aria-pressed", String(language === "fr"));
  translateStaticText(language);
  if (state.rows.length) {
    renderPriorities();
    renderAlternatives();
    applyFilters();
    translateStaticText(language);
  }
}

const priorityGroups = [
  {
    title: "Furniture & seating",
    sector: "Furniture & lighting",
    rate: "50% priority",
    reason: "Big-ticket, visible purchases with Canadian and non-U.S. alternatives.",
  },
  {
    title: "Clothing & apparel",
    sector: "Clothing & apparel",
    rate: "50% priority",
    reason: "Frequent purchases across T-shirts, suits, trousers, dresses and outerwear.",
  },
  {
    title: "Major appliances",
    sector: "Appliances",
    rate: "15–25%",
    reason: "High-value purchases make one brand switch count more than many small buys.",
  },
  {
    title: "Dairy products",
    sector: "Dairy",
    rate: "25–50%",
    reason: "Repeat grocery spending can redirect demand every week.",
  },
  {
    title: "Paper & stationery",
    sector: "Wood, pulp & paper",
    rate: "Up to 50%",
    reason: "Broad coverage and easy substitution for household and office purchases.",
  },
  {
    title: "Beauty & fragrance",
    sector: "Personal & household care",
    rate: "50% priority",
    reason: "Perfume, makeup and hair products are clearly branded and easy to replace.",
  },
  {
    title: "Sports & outdoor gear",
    sector: "Sports, recreation & toys",
    rate: "50% priority",
    reason: "Includes fitness equipment, outdoor goods, golf items and fishing rods.",
  },
  {
    title: "Electronics & machinery",
    sector: "Machinery & electronics",
    rate: "15–50%",
    reason: "A broad equipment category where purchase values can be substantial.",
  },
  {
    title: "Plastic kitchenware",
    query: "tableware kitchenware",
    rate: "50% priority",
    reason: "Everyday household products with abundant alternatives.",
  },
  {
    title: "Hand tools",
    query: "hand tools",
    rate: "50% priority",
    reason: "Durable purchases where origin can be checked before buying.",
  },
];

const alternativesPilot = [
  {
    category: "Furniture & seating",
    options: [
      {
        name: "Durham Furniture",
        products: "Solid-wood bedroom and case goods",
        status: "Made in Canada",
        note: "The company says all of its furniture is made at its plant in Durham, Ontario.",
        source: "https://www.durhamfurniture.com/about-us/",
      },
      {
        name: "EQ3",
        products: "Sofas, sectionals and chairs",
        status: "Made in Canada: select upholstery",
        note: "Upholstery is crafted at EQ3’s Winnipeg headquarters. Other products may be imported.",
        source: "https://www.eq3.com/ca/en/category/inspiration/canadian-made",
      },
    ],
  },
  {
    category: "Clothing & apparel",
    options: [
      {
        name: "Province of Canada",
        products: "T-shirts, hoodies, sweats, toques and totes",
        status: "Made in Canada",
        note: "The company states that all of its products are made in Canada.",
        source: "https://provinceofcanada.com/pages/made-in-canada",
      },
      {
        name: "Stanfield’s",
        products: "Made in Canada clothing collection",
        status: "Made in Canada: select collection",
        note: "Choose from the company’s Canadian-made collection and verify the garment label.",
        source: "https://www.stanfields.com/collections/made-in-canada",
      },
    ],
  },
  {
    category: "Major appliances",
    options: [
      {
        name: "Elmira Stove Works",
        products: "Ranges, refrigerators and specialty appliances",
        status: "Made in Canada",
        note: "Elmira says its appliances are handcrafted near Elmira, Ontario.",
        source: "https://elmirastoveworks.com/pages/about-us",
      },
      {
        name: "Danby",
        products: "Compact refrigeration and specialty appliances",
        status: "Canadian-owned: verify origin",
        note: "Danby is headquartered in Guelph, but its official page does not confirm Canadian manufacturing.",
        source: "https://danby.ca/about-danby-appliances/",
      },
    ],
  },
  {
    category: "Dairy products",
    options: [
      {
        name: "Natrel / Agropur",
        products: "Milk, cream, butter and lactose-free milk",
        status: "100% Canadian milk",
        note: "Agropur states that Natrel products use 100% Canadian milk.",
        source: "https://www.agropur.com/en/news/all-news/agropur-renews-its-commitment-to-100-Canadian-milk",
      },
      {
        name: "Gay Lea Foods",
        products: "Butter, cream, cottage cheese and sour cream",
        status: "Canadian farmer-owned",
        note: "Gay Lea is a Canadian dairy farmer-owned co-operative. Verify the package origin.",
        source: "https://www.gaylea.com/about-us/about-gay-lea/",
      },
    ],
  },
  {
    category: "Paper & stationery",
    options: [
      {
        name: "Cascades",
        products: "Fluff tissue and Tuff paper towels",
        status: "Made in Canada: select products",
        note: "Cascades operates a retail tissue-products facility in Candiac, Quebec. Check the package.",
        source: "https://www.cascades.com/en/facilities/cascades-candiac",
      },
      {
        name: "Domtar",
        products: "Copy and multipurpose office paper",
        status: "Made in Canada: select paper",
        note: "Domtar’s Windsor, Quebec mill produces copy and other uncoated papers.",
        source: "https://www.domtar.com/our-location/windsor-mill/",
      },
    ],
  },
  {
    category: "Beauty & fragrance",
    options: [
      {
        name: "Consonant Skincare",
        products: "Face and body skincare",
        status: "Made in Canada: most products",
        note: "Skincare and body care are made in Canada, except stated patches and accessories.",
        source: "https://consonantskincare.com/pages/faqs",
      },
      {
        name: "ATTITUDE",
        products: "Personal-care and household products",
        status: "Canadian factory: verify product",
        note: "ATTITUDE operates its own production facility in Sherbrooke. Verify each product’s label.",
        source: "https://ca.attitudeliving.com/our-factory",
      },
    ],
  },
  {
    category: "Sports & outdoor gear",
    options: [
      {
        name: "Nova Craft Canoe",
        products: "Prospector and recreational canoes",
        status: "Made in Canada",
        note: "Nova Craft describes its canoe series as made in Canada near London, Ontario.",
        source: "https://www.novacraft.com/our-company/",
      },
      {
        name: "ClearWater Design",
        products: "Canoes, kayaks and paddleboards",
        status: "Made in Ontario",
        note: "The company says all products are manufactured in Prince Edward County, Ontario.",
        source: "https://clearwaterdesign.com/about/",
      },
    ],
  },
  {
    category: "Electronics & machinery",
    options: [
      {
        name: "Paradigm",
        products: "Persona and selected loudspeaker series",
        status: "Made in Canada: select series",
        note: "The Persona Series is designed, engineered and built near Toronto.",
        source: "https://www.paradigm.com/en/floorstanding/persona-7f",
      },
      {
        name: "Totem Acoustic",
        products: "Floorstanding and bookshelf loudspeakers",
        status: "Made in Montreal",
        note: "Totem describes its loudspeakers as handcrafted in Montreal, Quebec.",
        source: "https://totemacoustic.com/totem-acoustic-our-story/",
      },
    ],
  },
  {
    category: "Plastic kitchenware",
    options: [
      {
        name: "Smartbottle",
        products: "Reusable plastic water bottles",
        status: "Made in Canada",
        note: "Smartbottle states that its reusable bottles are made in Canada.",
        source: "https://smartbottle.ca/",
      },
      {
        name: "Starfrit / Heritage",
        products: "Kitchen accessories and cookware",
        status: "Canadian-owned: verify origin",
        note: "The company is based in Quebec, but Canadian manufacturing is not confirmed.",
        source: "https://www.starfrit.com/en/heritage",
      },
    ],
  },
  {
    category: "Hand tools",
    options: [
      {
        name: "Garant",
        products: "Snow, garden, construction and striking tools",
        status: "Made in Canada: select tools",
        note: "Garant manufactures tools in Quebec and wooden handles in New Brunswick. Check the item.",
        source: "https://www.garant.com/en/pages/about-us",
      },
      {
        name: "Veritas Tools / Lee Valley",
        products: "Planes, measuring, sharpening and joinery tools",
        status: "Ottawa manufacturing: select tools",
        note: "Veritas is Lee Valley’s Ottawa-based manufacturing arm. Verify individual listings.",
        source: "https://www.leevalley.com/en-ca/tools/brand/veritas",
      },
    ],
  },
];

const elements = {
  search: $("#searchInput"),
  sector: $("#sectorSelect"),
  sort: $("#sortSelect"),
  body: $("#resultsBody"),
  count: $("#resultCount"),
  empty: $("#emptyState"),
  prev: $("#prevButton"),
  next: $("#nextButton"),
  pageStatus: $("#pageStatus"),
  fiftyOnly: $("#fiftyOnlyButton"),
  detail: $("#detailDialog"),
  detailContent: $("#detailContent"),
  method: $("#methodDialog"),
  itemsView: $("#itemsView"),
  compareView: $("#compareView"),
  itemsTab: $("#itemsTab"),
  compareTab: $("#compareTab"),
  chart: $("#sectorChart"),
  showAll: $("#showAllButton"),
  pagination: $("#pagination"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyFilters() {
  const terms = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  state.filtered = state.rows.filter((row) => {
    const haystack = `${row.hs_code} ${row.full_description} ${row.sector}`.toLowerCase();
    const compactHaystack = haystack.replace(/[^a-z0-9]/g, "");
    const queryMatch = terms.every((term) => {
      const compactTerm = term.replace(/[^a-z0-9]/g, "");
      return haystack.includes(term) || (compactTerm.length >= 2 && compactHaystack.includes(compactTerm));
    });
    const sectorMatch = state.sector === "all" || row.sector === state.sector;
    const rateMatch = state.rates.has(row.tariff_rate_pct);
    const fiftyMatch = !state.fiftyOnly || row.tariff_rate_pct === 50;
    return queryMatch && sectorMatch && rateMatch && fiftyMatch;
  });

  state.filtered.sort((a, b) => {
    if (state.sort === "rate-desc") {
      return b.tariff_rate_pct - a.tariff_rate_pct || a.hs_code.localeCompare(b.hs_code);
    }
    if (state.sort === "sector-asc") {
      return a.sector.localeCompare(b.sector) || a.hs_code.localeCompare(b.hs_code);
    }
    return a.hs_code.localeCompare(b.hs_code);
  });

  const activePageSize = state.pageSize === "all" ? Math.max(1, state.filtered.length) : state.pageSize;
  const maxPage = Math.max(1, Math.ceil(state.filtered.length / activePageSize));
  state.page = Math.min(state.page, maxPage);
  renderTable();
  renderComparison();
}

function renderTable() {
  const showingAll = state.pageSize === "all";
  const pageSize = showingAll ? Math.max(1, state.filtered.length) : state.pageSize;
  const start = (state.page - 1) * pageSize;
  const pageRows = state.filtered.slice(start, start + pageSize);
  const fiftyCount = state.filtered.filter((row) => row.tariff_rate_pct === 50).length;
  const fr = state.language === "fr";
  const lineLabel = fr
    ? (state.filtered.length === 1 ? "ligne" : "lignes")
    : (state.filtered.length === 1 ? "line" : "lines");
  elements.count.textContent = `${formatNumber(state.filtered.length)} ${lineLabel} • ${formatNumber(fiftyCount)} ${fr ? "à" : "at"} 50%${showingAll ? (fr ? " • liste complète affichée" : " • complete list shown") : ""}`;
  elements.empty.hidden = pageRows.length !== 0;
  elements.body.innerHTML = pageRows
    .map(
      (row) => `
        <tr data-testid="row-tariff-${row.hs_code.replaceAll(".", "-")}">
          <td data-label="${fr ? "Code SH" : "HS code"}"><span class="code">${escapeHtml(row.hs_code)}</span></td>
          <td class="description" data-label="${fr ? "Description" : "Description"}">
            <strong>${escapeHtml(row.heading)}</strong>
            <span>${escapeHtml(row.description || (fr ? "Aucune description plus précise publiée" : "No narrower description published"))}</span>
          </td>
          <td data-label="${fr ? "Secteur" : "Sector"}"><span class="sector-badge">${escapeHtml(row.sector)}</span></td>
          <td data-label="${fr ? "Taux" : "Rate"}"><span class="rate-badge ${row.tariff_rate_pct === 50 ? "rate-50" : ""}">${row.tariff_rate_pct}%</span></td>
          <td data-label="${fr ? "Impact commercial" : "Trade impact"}"><span class="impact">${fr ? "Compris dans le total de 27,6 G$ CA" : "Included in C$27.6B aggregate"}</span></td>
          <td data-label="${fr ? "Détails" : "Details"}"><button class="details-button" type="button" data-code="${escapeHtml(row.hs_code)}" aria-label="${fr ? "Ouvrir les détails pour" : "Open details for"} ${escapeHtml(row.hs_code)}">${fr ? "OUVRIR" : "OPEN"} →</button></td>
        </tr>
      `,
    )
    .join("");

  const pageCount = Math.max(1, Math.ceil(state.filtered.length / pageSize));
  elements.pageStatus.textContent = `${fr ? "Page" : "Page"} ${state.page} ${fr ? "sur" : "of"} ${pageCount}`;
  elements.prev.disabled = state.page <= 1;
  elements.next.disabled = state.page >= pageCount;
  elements.pagination.hidden = showingAll || state.filtered.length <= pageSize;
  elements.showAll.setAttribute("aria-pressed", String(showingAll));
  const fullSchedule = state.filtered.length === state.rows.length;
  elements.showAll.textContent = showingAll
    ? (fr ? "Afficher 24 par page" : "Show 24 per page")
    : fullSchedule
      ? `${fr ? "Afficher les" : "Show all"} ${formatNumber(state.filtered.length)} ${fr ? "codes SH" : "HS codes"}`
      : `${fr ? "Afficher les" : "Show all"} ${formatNumber(state.filtered.length)} ${fr ? "résultats" : "matches"}`;
}

function renderComparison() {
  const fr = state.language === "fr";
  const sectors = new Map();
  for (const row of state.filtered) {
    const entry = sectors.get(row.sector) || { total: 0, fifty: 0, maxRate: 0 };
    entry.total += 1;
    entry.fifty += row.tariff_rate_pct === 50 ? 1 : 0;
    entry.maxRate = Math.max(entry.maxRate, row.tariff_rate_pct);
    sectors.set(row.sector, entry);
  }
  const sorted = [...sectors.entries()].sort((a, b) => b[1].total - a[1].total);
  const max = Math.max(1, ...sorted.map(([, value]) => value.total));
  elements.chart.innerHTML = sorted.length
    ? sorted
        .map(
          ([name, value]) => `
            <div class="sector-row">
              <span class="sector-name">${escapeHtml(name)}</span>
              <div class="bar-track" aria-label="${value.total} ${fr ? "lignes" : "lines"}, ${value.fifty} ${fr ? "à 50 pour cent" : "at 50 percent"}">
                <span class="bar-total" style="width:${(value.total / max) * 100}%"></span>
                <span class="bar-fifty" style="width:${(value.fifty / max) * 100}%"></span>
              </div>
              <span class="sector-metric" title="${fr ? "Toutes les lignes tarifaires" : "All tariff lines"}">${value.total} ${fr ? "lignes" : "lines"}</span>
              <span class="sector-metric" title="${fr ? "Lignes à 50 %" : "Lines at 50%"}">${value.fifty} × 50%</span>
              <span class="aggregate-only">${fr ? "Total seulement" : "Aggregate only"}</span>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state"><h3>${fr ? "Aucun secteur à comparer" : "No sectors to compare"}</h3><p>${fr ? "Modifiez les filtres actifs." : "Adjust the active filters."}</p></div>`;
}

function getPriorityRows(group) {
  if (group.sector) return state.rows.filter((row) => row.sector === group.sector);
  const terms = group.query.toLowerCase().split(/\s+/);
  return state.rows.filter((row) => {
    const text = row.full_description.toLowerCase();
    return terms.every((term) => text.includes(term));
  });
}

function renderPriorities() {
  const fr = state.language === "fr";
  $("#priorityGrid").innerHTML = priorityGroups
    .map((group, index) => {
      const rows = getPriorityRows(group);
      const fifty = rows.filter((row) => row.tariff_rate_pct === 50).length;
      return `
        <article class="priority-card">
          <span class="priority-rank">${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(group.title)}</h3>
          <p>${escapeHtml(group.reason)}</p>
          <div class="priority-meta">
            <span>${escapeHtml(group.rate)}</span>
            <span>${rows.length} ${fr ? "lignes" : "lines"}${fifty ? ` / ${fifty} ${fr ? "à" : "at"} 50%` : ""}</span>
          </div>
          <button type="button" data-priority="${index}" aria-label="${fr ? "Afficher les lignes tarifaires" : "Show tariff lines"}: ${escapeHtml(group.title)}">${fr ? "AFFICHER" : "SHOW"} →</button>
        </article>
      `;
    })
    .join("");
}

function renderAlternatives() {
  const fr = state.language === "fr";
  $("#alternativesGrid").innerHTML = alternativesPilot
    .map(
      (group, index) => `
        <article class="alternative-category">
          <header>
            <span class="alternative-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(group.category)}</h3>
          </header>
          <div class="alternative-options">
            ${group.options
              .map(
                (option) => `
                  <section class="alternative-option">
                    <div class="alternative-title">
                      <h4>${escapeHtml(option.name)}</h4>
                      <span class="origin-status">${escapeHtml(option.status)}</span>
                    </div>
                    <p class="alternative-products">${escapeHtml(option.products)}</p>
                    <p>${escapeHtml(option.note)}</p>
                    <a href="${escapeHtml(option.source)}" target="_blank" rel="noreferrer">${fr ? "Vérifier l’affirmation de l’entreprise" : "Verify company claim"} →</a>
                  </section>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function showPriority(index) {
  const group = priorityGroups[index];
  resetFilters();
  if (group.sector) {
    state.sector = group.sector;
    elements.sector.value = group.sector;
  } else {
    state.query = group.query;
    elements.search.value = group.query;
  }
  state.page = 1;
  applyFilters();
  $(".filters-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetFilters() {
  state.query = "";
  state.sector = "all";
  state.rates = new Set([15, 25, 50]);
  state.sort = "code-asc";
  state.fiftyOnly = false;
  state.pageSize = 24;
  state.page = 1;
  elements.search.value = "";
  elements.sector.value = "all";
  elements.sort.value = "code-asc";
  $$('input[name="rate"]').forEach((input) => (input.checked = true));
  elements.fiftyOnly.setAttribute("aria-pressed", "false");
  applyFilters();
}

function showDetails(code) {
  const row = state.rows.find((item) => item.hs_code === code);
  if (!row) return;
  const fr = state.language === "fr";
  elements.detailContent.innerHTML = `
    <span class="eyebrow">${fr ? "Article tarifaire" : "Tariff item"}</span>
    <h2 class="detail-code">${escapeHtml(row.hs_code)}</h2>
    <div class="detail-grid">
      <div class="detail-block"><span class="eyebrow">${fr ? "Taux attribué" : "Assigned rate"}</span><strong class="${row.tariff_rate_pct === 50 ? "rate-50" : ""}">${row.tariff_rate_pct}%</strong></div>
      <div class="detail-block"><span class="eyebrow">${fr ? "Secteur" : "Sector"}</span><strong>${escapeHtml(row.sector)}</strong></div>
    </div>
    <div class="detail-description">
      <span class="eyebrow">${fr ? "Description officielle" : "Official description"}</span>
      <h3>${escapeHtml(row.heading)}</h3>
      <p>${escapeHtml(row.description || (fr ? "Aucune description indicative plus précise n’a été publiée." : "No narrower indicative description published."))}</p>
    </div>
    <div class="detail-description">
      <span class="eyebrow">${fr ? "Impact commercial" : "Trade impact"}</span>
      <p>${fr ? "Compris dans le total officiel de 27,6 G$ CA. Le barème ne publie aucune valeur d’importation par article." : "Included in the official C$27.6B aggregate. No item-level import value is published in the schedule."}</p>
    </div>
    <p class="detail-description"><a class="source-link" href="${row.source_url}" target="_blank" rel="noreferrer">${fr ? "Vérifier dans le barème officiel" : "Verify in official schedule"}</a></p>
  `;
  elements.detail.showModal();
}

function exportCsv() {
  const columns = ["HS code", "Official heading", "Indicative description", "Sector", "Tariff rate", "Trade impact"];
  const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
  const lines = [
    columns.map(quote).join(","),
    ...state.filtered.map((row) =>
      [
        row.hs_code,
        row.heading,
        row.description,
        row.sector,
        `${row.tariff_rate_pct}%`,
        "Included in C$27.6B aggregate; item-level value not published",
      ]
        .map(quote)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "canada-counter-tariffs-filtered.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function setView(view) {
  const compare = view === "compare";
  elements.itemsView.hidden = compare;
  elements.compareView.hidden = !compare;
  elements.itemsTab.classList.toggle("is-active", !compare);
  elements.compareTab.classList.toggle("is-active", compare);
  elements.itemsTab.setAttribute("aria-selected", String(!compare));
  elements.compareTab.setAttribute("aria-selected", String(compare));
}

async function init() {
  renderAlternatives();
  const response = await fetch("./data/tariffs.json");
  if (!response.ok) throw new Error("Tariff data failed to load");
  state.rows = await response.json();
  const sectors = [...new Set(state.rows.map((row) => row.sector))].sort();
  elements.sector.insertAdjacentHTML(
    "beforeend",
    sectors.map((sector) => `<option value="${escapeHtml(sector)}">${escapeHtml(sector)}</option>`).join(""),
  );
  $("#totalLines").textContent = formatNumber(state.rows.length);
  $("#noticeCount").textContent = formatNumber(state.rows.length);
  $("#fiftyLines").textContent = formatNumber(state.rows.filter((row) => row.tariff_rate_pct === 50).length);
  renderPriorities();
  applyFilters();
}

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.page = 1;
  applyFilters();
});
elements.sector.addEventListener("change", (event) => {
  state.sector = event.target.value;
  state.page = 1;
  applyFilters();
});
elements.sort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  applyFilters();
});
$$('input[name="rate"]').forEach((input) =>
  input.addEventListener("change", () => {
    state.rates = new Set($$('input[name="rate"]:checked').map((checked) => Number(checked.value)));
    state.page = 1;
    applyFilters();
  }),
);
elements.fiftyOnly.addEventListener("click", () => {
  state.fiftyOnly = !state.fiftyOnly;
  elements.fiftyOnly.setAttribute("aria-pressed", String(state.fiftyOnly));
  state.page = 1;
  applyFilters();
});
elements.showAll.addEventListener("click", () => {
  state.pageSize = state.pageSize === "all" ? 24 : "all";
  state.page = 1;
  applyFilters();
});
$("#resetButton").addEventListener("click", resetFilters);
$("#emptyResetButton").addEventListener("click", resetFilters);
elements.prev.addEventListener("click", () => {
  state.page -= 1;
  renderTable();
});
elements.next.addEventListener("click", () => {
  state.page += 1;
  renderTable();
});
elements.body.addEventListener("click", (event) => {
  const button = event.target.closest(".details-button");
  if (button) showDetails(button.dataset.code);
});
$("#exportButton").addEventListener("click", exportCsv);
$("#priorityGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-priority]");
  if (button) showPriority(Number(button.dataset.priority));
});
elements.itemsTab.addEventListener("click", () => setView("items"));
elements.compareTab.addEventListener("click", () => setView("compare"));
$("#methodButton").addEventListener("click", () => elements.method.showModal());
$("#languageEnglish").addEventListener("click", () => setMainLanguage("en"));
$("#languageFrench").addEventListener("click", () => setMainLanguage("fr"));
$("#themeButton").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = current === "dark" ? "light" : "dark";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== elements.search) {
    event.preventDefault();
    elements.search.focus();
  }
});

init().catch((error) => {
  elements.count.textContent = "Data unavailable";
  elements.empty.hidden = false;
  elements.empty.querySelector("h3").textContent = "The schedule could not load";
  elements.empty.querySelector("p").textContent = error.message;
});

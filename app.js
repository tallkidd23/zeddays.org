const state = {
  language: "en",
};

const $ = (selector) => document.querySelector(selector);
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
  ["687+ VERIFIED CANADIAN-MADE PRODUCTS, AND COUNTING", "687+ PRODUITS FABRIQUÉS AU CANADA ET VÉRIFIÉS, ET LE NOMBRE AUGMENTE"],
  ["Browse products and manufacturers across 15 sectors.", "Parcourez les produits et fabricants de 15 secteurs."],
  ["OPEN THE GUIDE", "OUVRIR LE GUIDE"],
  ["MARKET", "JOURS"],
  ["DAYS", "MARCHÉ"],
  ["LOCAL // SEASONAL // SOURCE-CHECKED", "LOCAL // SAISONNIER // SOURCES VÉRIFIÉES"],
  ["FIND A FARMERS’ MARKET NEAR YOU", "TROUVER UN MARCHÉ PRÈS DE CHEZ VOUS"],
  ["Choose a Southwestern Ontario community and see its regular market days.", "Choisissez une communauté du Sud-Ouest de l’Ontario et consultez ses jours de marché habituels."],
  ["FIND MARKET DAY", "TROUVER UN MARCHÉ"],
  ["739 TARIFF LINES // FILTER BY RATE & SECTOR // EXPORT CSV", "739 LIGNES TARIFAIRES // FILTRER PAR TAUX ET SECTEUR // EXPORTER EN CSV"],
  ["OFFICIAL TARIFF HS SEARCH", "RECHERCHE OFFICIELLE DE CODES SH"],
  ["Look up any HS code or product, compare sectors, and see the September 8 counter-tariff rate.", "Recherchez un code SH ou un produit, comparez les secteurs et consultez le taux du contre-tarif du 8 septembre."],
  ["OPEN THE SEARCH", "OUVRIR LA RECHERCHE"],
  ["HS", "SH"],
  ["SEARCH", "RECHERCHE"],
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
  ["Save to your phone // grocery field notes", "À enregistrer sur votre téléphone // notes d’épicerie"],
  ["Canadian Grocery Guide", "Guide d’épicerie canadien"],
  ["Download all 13 cards", "Télécharger les 13 cartes"],
  ["Swipe cards →", "Faites glisser les cartes →"],
  ["Use these as starting points, not guarantees.", "Utilisez-les comme points de départ, non comme garanties."],
  ["Origin claims were checked through Aug. 29, 2026 using official company and Government of Canada pages. Products and sourcing change. Canadian-owned does not necessarily mean Canadian-made, and a Canadian address or maple leaf alone does not prove origin. Always confirm the wording on the specific package.", "Les déclarations d’origine ont été vérifiées jusqu’au 29 août 2026 à partir des pages officielles des entreprises et du gouvernement du Canada. Les produits et l’approvisionnement peuvent changer. Une entreprise canadienne ne fabrique pas nécessairement ses produits au Canada, et une adresse canadienne ou une feuille d’érable ne prouve pas à elle seule l’origine. Vérifiez toujours le libellé sur l’emballage précis."],
  ["Thirteen screenshot-friendly cards with 44 verified starting points across eleven grocery-store aisles. Open a card, save the full-size image, and check the wording on the package while you shop.", "Treize cartes faciles à enregistrer, avec 44 points de départ vérifiés dans onze rayons d’épicerie. Ouvrez une carte, enregistrez l’image pleine grandeur et vérifiez le libellé sur l’emballage en magasin."],
  ["Fresh produce", "Fruits et légumes frais"],
  ["Contact ZED DAYS", "Contacter ZED DAYS"],
  ["Keep the resource independent", "Gardons la ressource indépendante"],
  ["Support ZED DAYS", "Soutenir ZED DAYS"],
  ["Support", "Soutenir"],
  ["ZED DAYS is an independently run Canadian public resource, researched, designed and maintained without paid listings or corporate influence.", "ZED DAYS est une ressource publique canadienne indépendante, recherchée, conçue et tenue à jour sans fiches payantes ni influence d’entreprise."],
  ["Optional contributions help cover hosting, source verification, translation, regular updates, and the development of free printable and physical field resources. When funding permits, printed materials will be distributed to communities at no charge.", "Les contributions facultatives aident à payer l’hébergement, la vérification des sources, la traduction, les mises à jour régulières et la création de ressources imprimables et physiques gratuites. Lorsque le financement le permettra, du matériel imprimé sera distribué gratuitement dans les communautés."],
  ["Contributions never influence which products or companies appear in the guide. Digital resources will remain free for everyone.", "Les contributions n’influencent jamais les produits ou entreprises qui figurent dans le guide. Les ressources numériques resteront gratuites pour tout le monde."],
  ["Contribute via FundRazr", "Contribuer avec FundRazr"],
  ["Secure contribution processing by FundRazr.", "Traitement sécurisé des contributions par FundRazr."],
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
}

async function loadHeadlineStats() {
  try {
    const response = await fetch("./data/tariffs.json");
    if (!response.ok) throw new Error("Tariff data failed to load");
    const rows = await response.json();
    $("#totalLines").textContent = formatNumber(rows.length);
    $("#noticeCount").textContent = formatNumber(rows.length);
    $("#fiftyLines").textContent = formatNumber(rows.filter((row) => row.tariff_rate_pct === 50).length);
  } catch (error) {
    // Headline counters fall back to their static defaults in markup.
  }
}

$("#languageEnglish").addEventListener("click", () => setMainLanguage("en"));
$("#languageFrench").addEventListener("click", () => setMainLanguage("fr"));
$("#themeButton").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = current === "dark" ? "light" : "dark";
});
$("#methodButton").addEventListener("click", () => $("#methodDialog").showModal());

loadHeadlineStats();

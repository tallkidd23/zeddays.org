const guideState = {
  rows: [],
  filtered: [],
  language: "en",
  query: "",
  sector: "all",
  confidence: "all",
  sort: "sector",
  visible: 30,
};

const guide$ = (selector) => document.querySelector(selector);

const guideStrings = {
  en: {
    skip: "Skip to field-guide entries",
    mastheadKicker: "Canadian-made reference // edition 01",
    mastheadTitle: "The Canadian field guide",
    tariffsLink: "Tariffs",
    heroKicker: "Carry it. Search it. Check the label.",
    heroTitle: "300 things still made here.",
    heroBody: "A source-checked directory of products manufactured, grown, processed, assembled or built in Canada. Every listing connects a practical Canadian choice to a tariff-affected product sector.",
    editionLabel: "FIELD EDITION",
    verifiedEntries: "VERIFIED ENTRIES",
    checkedDate: "CHECKED 28.08.26",
    ruleKicker: "One hard rule",
    ruleTitle: "Made here means made here.",
    ruleBody: "A Canadian address, owner or maple leaf is not enough. An entry appears only when an official source confirms Canadian production for the named product or product line. Imported ingredients and components are disclosed when the manufacturer says so.",
    entries: "Entries",
    sectors: "Sectors",
    brands: "Brands",
    standard: "Standard",
    madeHere: "MADE HERE",
    searchKicker: "Search the shelves",
    searchTitle: "Find a Canadian-made alternative",
    reset: "Reset",
    searchLabel: "Search by product, brand, use, location or HS heading",
    searchPlaceholder: "Product, brand, use, location or HS heading",
    sector: "Sector",
    confidence: "Confidence",
    sort: "Sort",
    downloadCsv: "Download CSV",
    printGuide: "Print field guide",
    evidenceNote: "Official-source evidence opens in a new tab.",
    emptyTitle: "No field-guide entries match",
    emptyBody: "Try a broader product word or return to all sectors.",
    resetSearch: "Reset search",
    loadMore: "Load 30 more",
    fieldNoteLabel: "Field note:",
    fieldNoteBody: "Manufacturing and sourcing can change. “Made in Canada” may include imported ingredients or components. Check the origin wording on the specific item before buying. These independent, unpaid listings are informational and are not endorsements or certifications.",
    supportKicker: "Keep the resource independent",
    supportTitle: "Support ZED DAYS",
    supportBodyOne: "ZED DAYS is an independently run Canadian public resource, researched, designed and maintained without paid listings or corporate influence.",
    supportBodyTwo: "Optional contributions help cover hosting, source verification, translation, regular updates, and the development of free printable and physical field resources. When funding permits, printed materials will be distributed to communities at no charge.",
    supportBodyThree: "Contributions never influence which products or companies appear in the guide. Digital resources will remain free for everyone.",
    supportAction: "Contribute via FundRazr",
    supportProcessor: "Secure contribution processing by FundRazr.",
    supportLegal: "ZED DAYS is not currently a registered charity. Contributions are not eligible for charitable tax receipts.",
    footerEdition: "ZED DAYS // Canadian-made field guide // Edition 01",
    footerContact: "Contact ZED DAYS",
    footerReturn: "Return to the counter-tariff schedule",
    allSectors: "All sectors",
    confidenceAll: "High + medium",
    confidenceHigh: "High only",
    confidenceMedium: "Medium only",
    sortSector: "Sector",
    sortBrand: "Brand A–Z",
    sortLocation: "Location A–Z",
    all: "All",
    verifiedEntry: "verified entry",
    verifiedEntriesCount: "verified entries",
    showing: "showing",
    completeResult: "complete result shown",
    loadCount: "Load {count} more",
    number: "NO.",
    highConfidence: "HIGH CONFIDENCE",
    mediumConfidence: "MEDIUM CONFIDENCE",
    madeHereFact: "Made here",
    location: "Location",
    commonUse: "Common use",
    tariffConnection: "Tariff connection",
    hsFamily: "HS family",
    openEvidence: "Open official evidence →",
    originNotes: "Origin notes",
    caveat: "Caveat:",
    ownership: "Ownership:",
    defaultCaveat: "None stated on fetched official page",
    defaultOwnership: "ownership not verified",
    dataError: "Guide data could not be loaded.",
    metaDescription: "Search 300 source-verified products made in Canada across tariff-affected sectors.",
    brandLabel: "ZED DAYS tariff guide home",
    themeLabel: "Switch colour theme",
    sectorNavLabel: "Browse field-guide sectors",
    resultsLabel: "Canadian-made product entries",
  },
  fr: {
    skip: "Passer aux entrées du guide",
    mastheadKicker: "Référence fabriquée au Canada // édition 01",
    mastheadTitle: "Le guide canadien",
    tariffsLink: "Tarifs",
    heroKicker: "Emportez-le. Cherchez. Vérifiez l’étiquette.",
    heroTitle: "300 produits encore fabriqués ici.",
    heroBody: "Un répertoire vérifié de produits fabriqués, cultivés, transformés, assemblés ou construits au Canada. Chaque fiche relie un choix canadien concret à un secteur touché par les tarifs.",
    editionLabel: "ÉDITION TERRAIN",
    verifiedEntries: "ENTRÉES VÉRIFIÉES",
    checkedDate: "VÉRIFIÉ LE 28.08.26",
    ruleKicker: "Une règle claire",
    ruleTitle: "Fabriqué ici veut dire fabriqué ici.",
    ruleBody: "Une adresse canadienne, un propriétaire canadien ou une feuille d’érable ne suffit pas. Un produit figure dans le guide seulement lorsqu’une source officielle confirme sa fabrication au Canada. Les ingrédients et composants importés sont signalés lorsque le fabricant le précise.",
    entries: "Entrées",
    sectors: "Secteurs",
    brands: "Marques",
    standard: "Norme",
    madeHere: "FABRIQUÉ ICI",
    searchKicker: "Cherchez dans les rayons",
    searchTitle: "Trouver une option fabriquée au Canada",
    reset: "Réinitialiser",
    searchLabel: "Rechercher par produit, marque, usage, lieu ou rubrique SH",
    searchPlaceholder: "Produit, marque, usage, lieu ou rubrique SH",
    sector: "Secteur",
    confidence: "Confiance",
    sort: "Trier",
    downloadCsv: "Télécharger le CSV",
    printGuide: "Imprimer le guide",
    evidenceNote: "La preuve officielle s’ouvre dans un nouvel onglet.",
    emptyTitle: "Aucune entrée ne correspond",
    emptyBody: "Essayez un terme plus général ou revenez à tous les secteurs.",
    resetSearch: "Réinitialiser la recherche",
    loadMore: "Afficher 30 de plus",
    fieldNoteLabel: "Note de terrain :",
    fieldNoteBody: "La fabrication et l’approvisionnement peuvent changer. La mention « Fabriqué au Canada » peut inclure des ingrédients ou composants importés. Vérifiez l’indication d’origine sur le produit avant l’achat. Ces fiches indépendantes et non rémunérées sont informatives; elles ne constituent ni une recommandation ni une certification.",
    supportKicker: "Gardons la ressource indépendante",
    supportTitle: "Soutenir ZED DAYS",
    supportBodyOne: "ZED DAYS est une ressource publique canadienne indépendante, recherchée, conçue et tenue à jour sans fiches payantes ni influence d’entreprise.",
    supportBodyTwo: "Les contributions facultatives aident à payer l’hébergement, la vérification des sources, la traduction, les mises à jour régulières et la création de ressources imprimables et physiques gratuites. Lorsque le financement le permettra, du matériel imprimé sera distribué gratuitement dans les communautés.",
    supportBodyThree: "Les contributions n’influencent jamais les produits ou entreprises qui figurent dans le guide. Les ressources numériques resteront gratuites pour tout le monde.",
    supportAction: "Contribuer avec FundRazr",
    supportProcessor: "Traitement sécurisé des contributions par FundRazr.",
    supportLegal: "ZED DAYS n’est pas actuellement un organisme de bienfaisance enregistré. Les contributions ne donnent pas droit à un reçu fiscal.",
    footerEdition: "ZED DAYS // Guide des produits fabriqués au Canada // Édition 01",
    footerContact: "Contacter ZED DAYS",
    footerReturn: "Retour au barème des contre-tarifs",
    allSectors: "Tous les secteurs",
    confidenceAll: "Élevée + moyenne",
    confidenceHigh: "Élevée seulement",
    confidenceMedium: "Moyenne seulement",
    sortSector: "Secteur",
    sortBrand: "Marque A–Z",
    sortLocation: "Lieu A–Z",
    all: "Tous",
    verifiedEntry: "entrée vérifiée",
    verifiedEntriesCount: "entrées vérifiées",
    showing: "affichage de",
    completeResult: "résultat complet affiché",
    loadCount: "Afficher {count} de plus",
    number: "NO",
    highConfidence: "CONFIANCE ÉLEVÉE",
    mediumConfidence: "CONFIANCE MOYENNE",
    madeHereFact: "Fabriqué ici",
    location: "Lieu",
    commonUse: "Usage courant",
    tariffConnection: "Lien avec les tarifs",
    hsFamily: "Famille SH",
    openEvidence: "Ouvrir la preuve officielle →",
    originNotes: "Notes sur l’origine",
    caveat: "Réserve :",
    ownership: "Propriété :",
    defaultCaveat: "Aucune réserve indiquée sur la page officielle consultée",
    defaultOwnership: "propriété non vérifiée",
    dataError: "Impossible de charger les données du guide.",
    metaDescription: "Recherchez 300 produits fabriqués au Canada et vérifiés à la source dans les secteurs touchés par les tarifs.",
    brandLabel: "Accueil du guide tarifaire ZED DAYS",
    themeLabel: "Changer le thème de couleur",
    sectorNavLabel: "Parcourir les secteurs du guide",
    resultsLabel: "Produits fabriqués au Canada",
  },
};

function guideText(key) {
  return guideStrings[guideState.language][key] || guideStrings.en[key] || key;
}

function guideFormat(value) {
  return new Intl.NumberFormat(guideState.language === "fr" ? "fr-CA" : "en-CA").format(value);
}

function guideField(row, key) {
  if (guideState.language === "fr" && row[`${key}_fr`]) return row[`${key}_fr`];
  return row[key];
}

const guideElements = {
  search: guide$("#guideSearchInput"),
  sector: guide$("#guideSectorSelect"),
  confidence: guide$("#guideConfidenceSelect"),
  sort: guide$("#guideSortSelect"),
  results: guide$("#guideResults"),
  count: guide$("#guideResultCount"),
  empty: guide$("#guideEmptyState"),
  loadMore: guide$("#guideLoadMoreButton"),
  sectorIndex: guide$("#guideSectorIndex"),
  total: guide$("#guideTotal"),
  sectorTotal: guide$("#guideSectorTotal"),
  brandTotal: guide$("#guideBrandTotal"),
};

function guideEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function compactTerms(value) {
  return value.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function guideApplyFilters() {
  const terms = compactTerms(guideState.query);
  guideState.filtered = guideState.rows.filter((row) => {
    const haystack = [
      row.brand,
      row.product_or_line,
      row.common_use,
      row.sector,
      row.category,
      row.manufacturing_location,
      row.made_in_canada_claim,
      row.tariff_relevance,
      row.candidate_hs_heading,
      row.sector_fr,
      row.category_fr,
      row.product_or_line_fr,
      row.common_use_fr,
      row.made_in_canada_claim_fr,
      row.manufacturing_location_fr,
      row.ownership_note_fr,
      row.origin_caveat_fr,
      row.tariff_relevance_fr,
    ]
      .join(" ")
      .toLowerCase();
    return (
      terms.every((term) => haystack.includes(term)) &&
      (guideState.sector === "all" || row.sector === guideState.sector) &&
      (guideState.confidence === "all" || row.confidence === guideState.confidence)
    );
  });

  guideState.filtered.sort((a, b) => {
    if (guideState.sort === "brand") {
      return a.brand.localeCompare(b.brand) || a.product_or_line.localeCompare(b.product_or_line);
    }
    if (guideState.sort === "location") {
      return a.manufacturing_location.localeCompare(b.manufacturing_location) || a.brand.localeCompare(b.brand);
    }
    return a.sector.localeCompare(b.sector) || a.brand.localeCompare(b.brand);
  });

  guideRender();
}

function guideCard(row) {
  const sourceUrl = guideEscape(row.official_source_url);
  const caveat = guideField(row, "origin_caveat") || guideText("defaultCaveat");
  const confidence = row.confidence === "High" ? guideText("highConfidence") : guideText("mediumConfidence");
  return `
    <article class="field-entry" data-testid="card-guide-${guideEscape(row.id)}">
      <div class="field-entry-register">
        <span>${guideText("number")} ${String(row.id).padStart(3, "0")}</span>
        <span>${confidence}</span>
      </div>
      <div class="field-entry-heading">
        <span class="field-entry-sector">${guideEscape(guideField(row, "sector"))}</span>
        <h3>${guideEscape(row.brand)}</h3>
        <p>${guideEscape(guideField(row, "product_or_line"))}</p>
      </div>
      <dl class="field-entry-facts">
        <div>
          <dt>${guideText("madeHereFact")}</dt>
          <dd>${guideEscape(guideField(row, "made_in_canada_claim"))}</dd>
        </div>
        <div>
          <dt>${guideText("location")}</dt>
          <dd>${guideEscape(guideField(row, "manufacturing_location"))}</dd>
        </div>
        <div>
          <dt>${guideText("commonUse")}</dt>
          <dd>${guideEscape(guideField(row, "common_use"))}</dd>
        </div>
        <div>
          <dt>${guideText("tariffConnection")}</dt>
          <dd>${guideEscape(guideField(row, "tariff_relevance"))}</dd>
        </div>
        <div>
          <dt>${guideText("hsFamily")}</dt>
          <dd>${guideEscape(row.candidate_hs_heading || "n.a.")}</dd>
        </div>
      </dl>
      <div class="field-entry-evidence">
        <p>“${guideEscape(row.evidence_quote)}”</p>
        <a href="${sourceUrl}" target="_blank" rel="noreferrer">${guideText("openEvidence")}</a>
      </div>
      <details class="field-entry-notes">
        <summary>${guideText("originNotes")}</summary>
        <p><strong>${guideText("caveat")}</strong> ${guideEscape(caveat)}</p>
        <p><strong>${guideText("ownership")}</strong> ${guideEscape(guideField(row, "ownership_note") || guideText("defaultOwnership"))}</p>
      </details>
    </article>
  `;
}

function guideRender() {
  const shown = guideState.filtered.slice(0, guideState.visible);
  guideElements.results.innerHTML = shown.map(guideCard).join("");
  guideElements.empty.hidden = guideState.filtered.length !== 0;
  guideElements.results.hidden = guideState.filtered.length === 0;
  guideElements.count.textContent =
    `${guideFormat(guideState.filtered.length)} ${guideState.filtered.length === 1 ? guideText("verifiedEntry") : guideText("verifiedEntriesCount")}` +
    (guideState.filtered.length > shown.length ? ` • ${guideText("showing")} ${guideFormat(shown.length)}` : ` • ${guideText("completeResult")}`);
  guideElements.loadMore.hidden = shown.length >= guideState.filtered.length;
  guideElements.loadMore.textContent = guideText("loadCount").replace("{count}", Math.min(30, guideState.filtered.length - shown.length));

  [...guideElements.sectorIndex.querySelectorAll("button")].forEach((button) => {
    const active = button.dataset.sector === guideState.sector;
    button.setAttribute("aria-pressed", String(active));
  });
}

function guideReset() {
  guideState.query = "";
  guideState.sector = "all";
  guideState.confidence = "all";
  guideState.sort = "sector";
  guideState.visible = 30;
  guideElements.search.value = "";
  guideElements.sector.value = "all";
  guideElements.confidence.value = "all";
  guideElements.sort.value = "sector";
  guideApplyFilters();
}

function guideBuildSectorControls() {
  const counts = new Map();
  guideState.rows.forEach((row) => counts.set(row.sector, (counts.get(row.sector) || 0) + 1));
  const sectors = [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  guideElements.sector.innerHTML =
    `<option value="all">${guideText("allSectors")}</option>` +
    sectors.map(([sector, count]) => {
      const row = guideState.rows.find((item) => item.sector === sector);
      return `<option value="${guideEscape(sector)}">${guideEscape(guideField(row, "sector"))} (${count})</option>`;
    }).join("");
  guideElements.sectorIndex.innerHTML =
    `<button type="button" data-sector="all" aria-pressed="true">${guideText("all")} <span>${guideState.rows.length}</span></button>` +
    sectors
      .map(
        ([sector, count]) => {
          const row = guideState.rows.find((item) => item.sector === sector);
          return `<button type="button" data-sector="${guideEscape(sector)}" aria-pressed="false">${guideEscape(guideField(row, "sector"))} <span>${count}</span></button>`;
        },
      )
      .join("");
}

function guideLocalizeStatic() {
  document.documentElement.lang = guideState.language;
  document.documentElement.dataset.language = guideState.language;
  document.title = guideState.language === "fr"
    ? "Guide des produits fabriqués au Canada | ZED DAYS"
    : "Canadian-Made Field Guide | ZED DAYS";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = guideText(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = guideText(element.dataset.i18nPlaceholder);
  });
  document.querySelector('meta[name="description"]').setAttribute("content", guideText("metaDescription"));
  document.querySelector(".brand-link").setAttribute("aria-label", guideText("brandLabel"));
  guide$("#guideThemeButton").setAttribute("aria-label", guideText("themeLabel"));
  guideElements.sectorIndex.setAttribute("aria-label", guideText("sectorNavLabel"));
  guideElements.results.setAttribute("aria-label", guideText("resultsLabel"));
  guideElements.confidence.innerHTML = `
    <option value="all">${guideText("confidenceAll")}</option>
    <option value="High">${guideText("confidenceHigh")}</option>
    <option value="Medium">${guideText("confidenceMedium")}</option>
  `;
  guideElements.sort.innerHTML = `
    <option value="sector">${guideText("sortSector")}</option>
    <option value="brand">${guideText("sortBrand")}</option>
    <option value="location">${guideText("sortLocation")}</option>
  `;
  guideElements.confidence.value = guideState.confidence;
  guideElements.sort.value = guideState.sort;
  guide$("#guideLanguageEnglish").setAttribute("aria-pressed", String(guideState.language === "en"));
  guide$("#guideLanguageFrench").setAttribute("aria-pressed", String(guideState.language === "fr"));
}

function guideSetLanguage(language) {
  guideState.language = language;
  guideLocalizeStatic();
  if (guideState.rows.length) {
    guideBuildSectorControls();
    guideElements.sector.value = guideState.sector;
    guideApplyFilters();
  }
}

guideElements.search.addEventListener("input", (event) => {
  guideState.query = event.target.value;
  guideState.visible = 30;
  guideApplyFilters();
});
guideElements.sector.addEventListener("change", (event) => {
  guideState.sector = event.target.value;
  guideState.visible = 30;
  guideApplyFilters();
});
guideElements.confidence.addEventListener("change", (event) => {
  guideState.confidence = event.target.value;
  guideState.visible = 30;
  guideApplyFilters();
});
guideElements.sort.addEventListener("change", (event) => {
  guideState.sort = event.target.value;
  guideApplyFilters();
});
guideElements.loadMore.addEventListener("click", () => {
  guideState.visible += 30;
  guideRender();
});
guideElements.sectorIndex.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-sector]");
  if (!button) return;
  guideState.sector = button.dataset.sector;
  guideElements.sector.value = guideState.sector;
  guideState.visible = 30;
  guideApplyFilters();
  guideElements.results.scrollIntoView({ behavior: "smooth", block: "start" });
});
guide$("#guideResetButton").addEventListener("click", guideReset);
guide$("#guideEmptyResetButton").addEventListener("click", guideReset);
guide$("#guidePrintButton").addEventListener("click", () => {
  const previousVisible = guideState.visible;
  guideState.visible = guideState.filtered.length;
  guideRender();
  requestAnimationFrame(() => {
    window.print();
    guideState.visible = previousVisible;
    guideRender();
  });
});
guide$("#guideThemeButton").addEventListener("click", () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
});
guide$("#guideLanguageEnglish").addEventListener("click", () => guideSetLanguage("en"));
guide$("#guideLanguageFrench").addEventListener("click", () => guideSetLanguage("fr"));
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== guideElements.search) {
    event.preventDefault();
    guideElements.search.focus();
  }
});

guideLocalizeStatic();

fetch("./data/canadian-field-guide-bilingual.json")
  .then((response) => {
    if (!response.ok) throw new Error(guideText("dataError"));
    return response.json();
  })
  .then((rows) => {
    guideState.rows = rows;
    guideElements.total.textContent = guideFormat(rows.length);
    guideElements.sectorTotal.textContent = guideFormat(new Set(rows.map((row) => row.sector)).size);
    guideElements.brandTotal.textContent = guideFormat(new Set(rows.map((row) => row.brand)).size);
    guideBuildSectorControls();
    guideApplyFilters();
  })
  .catch((error) => {
    guideElements.count.textContent = error.message;
    guideElements.empty.hidden = false;
    guideElements.results.hidden = true;
    guideElements.loadMore.hidden = true;
  });

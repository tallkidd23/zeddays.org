const marketState = {
  rows: [],
  filtered: [],
  language: "en",
  query: "",
  city: "all",
  day: "all",
  season: "all",
  weekend: false,
};

const market$ = (selector) => document.querySelector(selector);
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const marketStrings = {
  en: {
    skip: "Skip to market listings",
    mastheadKicker: "Local food reference // Southwestern Ontario",
    mastheadTitle: "Market day finder",
    guideLink: "Products",
    supportNav: "Support",
    heroKicker: "Choose a community. Find the day. Meet the growers.",
    heroTitle: "Find market day.",
    heroBody: "Search regular farmers’ market days across Southwestern Ontario. Every listing points to an official market or municipal schedule so you can confirm before travelling.",
    editionLabel: "LOCAL EDITION",
    verifiedMarkets: "VERIFIED MARKETS & COUNTING",
    checkedDate: "CHECKED 29.08.26",
    ruleKicker: "Before you leave",
    ruleTitle: "Confirm today’s schedule.",
    ruleBody: "Market hours can change for weather, holidays and special events. Use this directory as a starting point, then open the official schedule before making the trip.",
    markets: "Markets",
    communities: "Communities",
    yearRound: "Year-round",
    region: "Region",
    southwest: "S.W. ON",
    searchKicker: "Plan the trip",
    searchTitle: "Find a market near you",
    reset: "Reset",
    searchLabel: "Search by market, city, address or product",
    searchPlaceholder: "Market, city, address or product",
    community: "Community",
    allCommunities: "All communities",
    day: "Market day",
    anyDay: "Any day",
    season: "Season",
    allMarkets: "All markets",
    yearRoundOption: "Year-round",
    seasonal: "Seasonal",
    weekend: "This weekend",
    downloadCsv: "Download CSV",
    submitLink: "Submit a market",
    evidenceNote: "Official schedules open in a new tab.",
    emptyTitle: "No markets match",
    emptyBody: "Try a nearby community, another day, or reset the filters.",
    resetSearch: "Reset search",
    fieldNoteLabel: "Field note:",
    fieldNoteBody: "Listings are independently compiled and unpaid. Market schedules can change. Confirm hours, dates and cancellations with the official market before travelling.",
    footerEdition: "ZED DAYS // Southwestern Ontario market finder // Edition 01",
    footerContact: "Contact ZED DAYS",
    footerReturn: "Return to the counter-tariff guide",
    verifiedMarket: "verified market",
    verifiedMarketsCount: "verified markets",
    completeResult: "complete result shown",
    all: "All",
    today: "Today",
    marketDays: "Market days",
    hours: "Hours",
    seasonLabel: "Season",
    location: "Location",
    products: "What you may find",
    officialSchedule: "Open official schedule →",
    directions: "Directions →",
    lastChecked: "Last checked",
    scheduleYear: "Schedule",
    yearRoundBadge: "YEAR-ROUND",
    seasonalBadge: "SEASONAL",
    confirmBadge: "CONFIRM SCHEDULE",
    dataError: "Market data could not be loaded.",
    metaDescription: "Find verified farmers’ market days, hours and official schedules across Southwestern Ontario.",
    brandLabel: "ZED DAYS tariff guide home",
    themeLabel: "Switch colour theme",
    dayNavLabel: "Browse markets by day",
    resultsLabel: "Southwestern Ontario farmers’ markets",
    submitKicker: "Help grow the directory",
    submitTitle: "Submit a market.",
    submitIntro: "Know a recurring farmers’ market in Southwestern Ontario that is missing? Send the details for independent review. There is no fee to request a listing.",
    inclusionTitle: "How inclusion works",
    inclusionOne: "Requests are free. ZED DAYS does not sell listings or preferred placement.",
    inclusionTwo: "The market should be a recurring public market in Southwestern Ontario with local farm or food producers.",
    inclusionThree: "A current official market, organizer, municipal or association page must confirm the schedule.",
    inclusionFour: "ZED DAYS reviews every request independently and may ask for clarification before publishing.",
    inclusionFive: "Submission does not guarantee inclusion. Listings may be updated or removed when schedules become outdated.",
    inclusionSix: "This form is for markets as organizations. Individual vendor applications are not accepted yet.",
    privacyLabel: "Privacy:",
    privacyBody: "This form does not store or transmit information through the website. It prepares an email in your own mail application.",
    formStep: "MARKET INTAKE // 01",
    requiredNote: "Required fields are marked *",
    formMarketName: "Market name *",
    formCommunity: "Town or city *",
    formRegion: "County or region",
    formAddress: "Market address *",
    formDays: "Regular market day(s) *",
    formDaysPlaceholder: "e.g. Saturdays",
    formHours: "Opening hours *",
    formHoursPlaceholder: "e.g. 8 a.m. – 1 p.m.",
    formSeason: "Season or operating dates *",
    formSeasonPlaceholder: "e.g. May 16 – October 10, 2026, or year-round",
    formOfficialUrl: "Official schedule webpage *",
    formUrlPlaceholder: "https://",
    formUrlHelp: "Use the market, organizer, municipal or association page that publishes the current schedule.",
    formContactName: "Your name *",
    formContactEmail: "Your email *",
    formProducts: "Products typically available",
    formProductsPlaceholder: "e.g. produce, preserves, meat, bread and flowers",
    formNotes: "Anything else ZED DAYS should know?",
    formConsent: "I confirm these details are accurate to the best of my knowledge and may be reviewed for a public listing. *",
    formEmailButton: "Prepare submission email",
    formCopyButton: "Copy details",
    formInvalid: "Please complete every required field and enter a valid email and official webpage.",
    formEmailReady: "Your email application should open with the submission prepared. Review it, then send when ready.",
    formCopied: "Submission details copied. Paste them into an email to thezeddays@gmail.com.",
    formCopyFailed: "Copying was blocked by the browser. Use “Prepare submission email” instead.",
    submissionSubject: "Market submission for ZED DAYS",
    submissionLanguage: "Submission language",
  },
  fr: {
    skip: "Passer aux marchés",
    mastheadKicker: "Répertoire alimentaire local // Sud-Ouest de l’Ontario",
    mastheadTitle: "Trouver un jour de marché",
    guideLink: "Produits",
    supportNav: "Soutenir",
    heroKicker: "Choisissez une communauté. Trouvez le jour. Rencontrez les producteurs.",
    heroTitle: "Trouvez le jour du marché.",
    heroBody: "Recherchez les jours habituels des marchés fermiers du Sud-Ouest de l’Ontario. Chaque fiche mène à un horaire officiel du marché ou de la municipalité afin de vérifier avant de partir.",
    editionLabel: "ÉDITION LOCALE",
    verifiedMarkets: "MARCHÉS VÉRIFIÉS ET ÇA CONTINUE",
    checkedDate: "VÉRIFIÉ LE 29.08.26",
    ruleKicker: "Avant de partir",
    ruleTitle: "Confirmez l’horaire du jour.",
    ruleBody: "Les heures peuvent changer en raison de la météo, des jours fériés et d’événements spéciaux. Utilisez ce répertoire comme point de départ, puis consultez l’horaire officiel avant de vous déplacer.",
    markets: "Marchés",
    communities: "Communautés",
    yearRound: "À l’année",
    region: "Région",
    southwest: "S.-O. ON",
    searchKicker: "Planifiez la sortie",
    searchTitle: "Trouver un marché près de chez vous",
    reset: "Réinitialiser",
    searchLabel: "Rechercher par marché, ville, adresse ou produit",
    searchPlaceholder: "Marché, ville, adresse ou produit",
    community: "Communauté",
    allCommunities: "Toutes les communautés",
    day: "Jour de marché",
    anyDay: "Tous les jours",
    season: "Saison",
    allMarkets: "Tous les marchés",
    yearRoundOption: "À l’année",
    seasonal: "Saisonnier",
    weekend: "Cette fin de semaine",
    downloadCsv: "Télécharger le CSV",
    submitLink: "Proposer un marché",
    evidenceNote: "Les horaires officiels s’ouvrent dans un nouvel onglet.",
    emptyTitle: "Aucun marché ne correspond",
    emptyBody: "Essayez une communauté voisine, un autre jour ou réinitialisez les filtres.",
    resetSearch: "Réinitialiser la recherche",
    fieldNoteLabel: "Note de terrain :",
    fieldNoteBody: "Les fiches sont compilées indépendamment et sans rémunération. Les horaires peuvent changer. Confirmez les heures, les dates et les annulations auprès du marché avant de vous déplacer.",
    footerEdition: "ZED DAYS // Répertoire des marchés du Sud-Ouest ontarien // Édition 01",
    footerContact: "Contacter ZED DAYS",
    footerReturn: "Retour au guide des contre-tarifs",
    verifiedMarket: "marché vérifié",
    verifiedMarketsCount: "marchés vérifiés",
    completeResult: "résultat complet affiché",
    all: "Tous",
    today: "Aujourd’hui",
    marketDays: "Jours de marché",
    hours: "Heures",
    seasonLabel: "Saison",
    location: "Adresse",
    products: "Produits possibles",
    officialSchedule: "Ouvrir l’horaire officiel →",
    directions: "Itinéraire →",
    lastChecked: "Dernière vérification",
    scheduleYear: "Horaire",
    yearRoundBadge: "À L’ANNÉE",
    seasonalBadge: "SAISONNIER",
    confirmBadge: "CONFIRMER L’HORAIRE",
    dataError: "Impossible de charger les données des marchés.",
    metaDescription: "Trouvez les jours, les heures et les horaires officiels des marchés fermiers du Sud-Ouest de l’Ontario.",
    brandLabel: "Accueil du guide tarifaire ZED DAYS",
    themeLabel: "Changer le thème de couleur",
    dayNavLabel: "Parcourir les marchés par jour",
    resultsLabel: "Marchés fermiers du Sud-Ouest de l’Ontario",
    submitKicker: "Aidez le répertoire à grandir",
    submitTitle: "Proposer un marché.",
    submitIntro: "Connaissez-vous un marché fermier récurrent du Sud-Ouest de l’Ontario qui manque au répertoire? Envoyez les renseignements pour une vérification indépendante. La demande d’inscription est gratuite.",
    inclusionTitle: "Fonctionnement de l’inclusion",
    inclusionOne: "Les demandes sont gratuites. ZED DAYS ne vend ni fiches ni placement préférentiel.",
    inclusionTwo: "Le marché doit être un marché public récurrent du Sud-Ouest de l’Ontario réunissant des producteurs agricoles ou alimentaires locaux.",
    inclusionThree: "Une page actuelle du marché, de l’organisateur, de la municipalité ou d’une association doit confirmer l’horaire.",
    inclusionFour: "ZED DAYS examine chaque demande indépendamment et peut demander des précisions avant la publication.",
    inclusionFive: "Une demande ne garantit pas l’inclusion. Une fiche peut être mise à jour ou retirée lorsque son horaire devient périmé.",
    inclusionSix: "Ce formulaire s’adresse aux marchés comme organisations. Les demandes de vendeurs individuels ne sont pas encore acceptées.",
    privacyLabel: "Confidentialité :",
    privacyBody: "Ce formulaire ne stocke ni ne transmet vos renseignements par le site. Il prépare un courriel dans votre propre application de messagerie.",
    formStep: "FICHE DU MARCHÉ // 01",
    requiredNote: "Les champs obligatoires sont marqués *",
    formMarketName: "Nom du marché *",
    formCommunity: "Ville ou municipalité *",
    formRegion: "Comté ou région",
    formAddress: "Adresse du marché *",
    formDays: "Jour(s) habituel(s) du marché *",
    formDaysPlaceholder: "p. ex. les samedis",
    formHours: "Heures d’ouverture *",
    formHoursPlaceholder: "p. ex. de 8 h à 13 h",
    formSeason: "Saison ou dates d’ouverture *",
    formSeasonPlaceholder: "p. ex. du 16 mai au 10 octobre 2026, ou à l’année",
    formOfficialUrl: "Page officielle de l’horaire *",
    formUrlPlaceholder: "https://",
    formUrlHelp: "Utilisez la page du marché, de l’organisateur, de la municipalité ou d’une association qui publie l’horaire actuel.",
    formContactName: "Votre nom *",
    formContactEmail: "Votre courriel *",
    formProducts: "Produits habituellement offerts",
    formProductsPlaceholder: "p. ex. fruits et légumes, conserves, viande, pain et fleurs",
    formNotes: "Autre renseignement utile pour ZED DAYS?",
    formConsent: "Je confirme que ces renseignements sont exacts au meilleur de ma connaissance et qu’ils peuvent être vérifiés pour une fiche publique. *",
    formEmailButton: "Préparer le courriel",
    formCopyButton: "Copier les détails",
    formInvalid: "Veuillez remplir tous les champs obligatoires et saisir un courriel et une page officielle valides.",
    formEmailReady: "Votre application de messagerie devrait s’ouvrir avec la demande préparée. Vérifiez-la, puis envoyez-la lorsque vous êtes prêt.",
    formCopied: "Détails copiés. Collez-les dans un courriel à thezeddays@gmail.com.",
    formCopyFailed: "Le navigateur a bloqué la copie. Utilisez plutôt « Préparer le courriel ».",
    submissionSubject: "Proposition de marché pour ZED DAYS",
    submissionLanguage: "Langue de la demande",
  },
};

const dayFrench = {
  Monday: "Lundi",
  Tuesday: "Mardi",
  Wednesday: "Mercredi",
  Thursday: "Jeudi",
  Friday: "Vendredi",
  Saturday: "Samedi",
  Sunday: "Dimanche",
};

const marketElements = {
  search: market$("#marketSearchInput"),
  city: market$("#marketCitySelect"),
  day: market$("#marketDaySelect"),
  season: market$("#marketSeasonSelect"),
  weekend: market$("#marketWeekendButton"),
  results: market$("#marketResults"),
  count: market$("#marketResultCount"),
  empty: market$("#marketEmptyState"),
  dayIndex: market$("#marketDayIndex"),
  total: market$("#marketTotal"),
  statTotal: market$("#marketStatTotal"),
  communityTotal: market$("#marketCommunityTotal"),
  yearRoundTotal: market$("#marketYearRoundTotal"),
};

function marketText(key) {
  return marketStrings[marketState.language][key] || marketStrings.en[key] || key;
}

function marketEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function marketFormat(value) {
  return new Intl.NumberFormat(marketState.language === "fr" ? "fr-CA" : "en-CA").format(value);
}

function marketField(row, key) {
  if (marketState.language === "fr" && row[`${key}_fr`]) return row[`${key}_fr`];
  return row[key];
}

function translatedDay(day) {
  return marketState.language === "fr" ? dayFrench[day] || day : day;
}

function normalizedDays(row) {
  return Array.isArray(row.days_of_week) ? row.days_of_week : [];
}

function matchesWeekend(row) {
  return normalizedDays(row).some((day) => day === "Saturday" || day === "Sunday");
}

function marketApplyFilters() {
  const terms = marketState.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  marketState.filtered = marketState.rows.filter((row) => {
    const haystack = [
      row.market_name,
      row.city_or_town,
      row.municipality_or_region,
      row.street_address,
      row.products_summary_en,
      row.products_summary_fr,
      row.schedule_text_en,
      row.schedule_text_fr,
    ].join(" ").toLowerCase();
    return (
      terms.every((term) => haystack.includes(term)) &&
      (marketState.city === "all" || row.city_or_town === marketState.city) &&
      (marketState.day === "all" || normalizedDays(row).includes(marketState.day)) &&
      (marketState.season === "all" ||
        (marketState.season === "year-round" ? Boolean(row.year_round) : !row.year_round)) &&
      (!marketState.weekend || matchesWeekend(row))
    );
  });

  marketState.filtered.sort((a, b) => {
    const aDay = Math.min(...normalizedDays(a).map((day) => weekdays.indexOf(day)).filter((index) => index >= 0), 8);
    const bDay = Math.min(...normalizedDays(b).map((day) => weekdays.indexOf(day)).filter((index) => index >= 0), 8);
    return aDay - bDay || a.city_or_town.localeCompare(b.city_or_town) || a.market_name.localeCompare(b.market_name);
  });
  marketRender();
}

function marketCard(row) {
  const schedule = marketField(row, "schedule_text") || "n.a.";
  const products = marketField(row, "products_summary") || "n.a.";
  const notes = marketField(row, "notes");
  const season = row.year_round
    ? marketText("yearRoundOption")
    : [row.season_start, row.season_end].filter(Boolean).join(" – ") || marketText("seasonal");
  const hours = [row.opening_time, row.closing_time].filter(Boolean).join(" – ") || schedule;
  const yearIsCurrent = String(row.schedule_year || "").includes("2026") || String(row.schedule_year || "").toLowerCase().includes("recurring");
  const badge = row.year_round ? marketText("yearRoundBadge") : yearIsCurrent ? marketText("seasonalBadge") : marketText("confirmBadge");
  const days = normalizedDays(row).map(translatedDay).join(" · ") || "n.a.";
  return `
    <article class="market-entry" data-testid="card-market-${marketEscape(row.id)}">
      <div class="market-entry-topline">
        <span>${marketEscape(row.city_or_town)}</span>
        <span class="${yearIsCurrent ? "" : "market-confirm"}">${marketEscape(badge)}</span>
      </div>
      <div class="market-entry-heading">
        <h3>${marketEscape(row.market_name)}</h3>
        <p>${marketEscape(row.municipality_or_region || row.city_or_town)}</p>
      </div>
      <div class="market-day-ticket">
        <span>${marketText("marketDays")}</span>
        <strong>${marketEscape(days)}</strong>
        <small>${marketEscape(hours)}</small>
      </div>
      <dl class="market-entry-facts">
        <div><dt>${marketText("seasonLabel")}</dt><dd>${marketEscape(season)}</dd></div>
        <div><dt>${marketText("location")}</dt><dd>${marketEscape(row.street_address || "n.a.")}</dd></div>
        <div><dt>${marketText("products")}</dt><dd>${marketEscape(products)}</dd></div>
        <div><dt>${marketText("scheduleYear")}</dt><dd>${marketEscape(row.schedule_year || "n.a.")}</dd></div>
      </dl>
      ${notes && notes !== "n.a." ? `<p class="market-entry-note">${marketEscape(notes)}</p>` : ""}
      <div class="market-entry-actions">
        <a href="${marketEscape(row.official_source_url)}" target="_blank" rel="noreferrer">${marketText("officialSchedule")}</a>
        ${row.directions_url ? `<a href="${marketEscape(row.directions_url)}" target="_blank" rel="noreferrer">${marketText("directions")}</a>` : ""}
      </div>
      <small class="market-last-checked">${marketText("lastChecked")}: ${marketEscape(row.last_checked || "2026-08-28")}</small>
    </article>
  `;
}

function marketRender() {
  marketElements.results.innerHTML = marketState.filtered.map(marketCard).join("");
  marketElements.empty.hidden = marketState.filtered.length !== 0;
  marketElements.results.hidden = marketState.filtered.length === 0;
  marketElements.count.textContent = `${marketFormat(marketState.filtered.length)} ${
    marketState.filtered.length === 1 ? marketText("verifiedMarket") : marketText("verifiedMarketsCount")
  } • ${marketText("completeResult")}`;
  [...marketElements.dayIndex.querySelectorAll("button")].forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.day === marketState.day));
  });
}

function marketBuildControls() {
  const cities = [...new Set(marketState.rows.map((row) => row.city_or_town).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  marketElements.city.innerHTML =
    `<option value="all">${marketText("allCommunities")}</option>` +
    cities.map((city) => `<option value="${marketEscape(city)}">${marketEscape(city)}</option>`).join("");
  marketElements.day.innerHTML =
    `<option value="all">${marketText("anyDay")}</option>` +
    weekdays.map((day) => `<option value="${day}">${translatedDay(day)}</option>`).join("");
  marketElements.season.innerHTML = `
    <option value="all">${marketText("allMarkets")}</option>
    <option value="year-round">${marketText("yearRoundOption")}</option>
    <option value="seasonal">${marketText("seasonal")}</option>
  `;
  const dayCounts = new Map(weekdays.map((day) => [day, 0]));
  marketState.rows.forEach((row) => normalizedDays(row).forEach((day) => dayCounts.set(day, (dayCounts.get(day) || 0) + 1)));
  marketElements.dayIndex.innerHTML =
    `<button type="button" data-day="all" aria-pressed="${marketState.day === "all"}">${marketText("all")} <span>60+</span></button>` +
    weekdays.map((day) =>
      `<button type="button" data-day="${day}" aria-pressed="${marketState.day === day}">${translatedDay(day)} <span>${dayCounts.get(day) || 0}</span></button>`
    ).join("");
  marketElements.city.value = marketState.city;
  marketElements.day.value = marketState.day;
  marketElements.season.value = marketState.season;
}

function marketLocalize() {
  document.documentElement.lang = marketState.language;
  document.documentElement.dataset.language = marketState.language;
  document.title = marketState.language === "fr"
    ? "Marchés fermiers du Sud-Ouest de l’Ontario | ZED DAYS"
    : "Southwestern Ontario Farmers’ Markets | ZED DAYS";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = marketText(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = marketText(element.dataset.i18nPlaceholder);
  });
  document.querySelector('meta[name="description"]').setAttribute("content", marketText("metaDescription"));
  document.querySelector(".brand-link").setAttribute("aria-label", marketText("brandLabel"));
  market$("#marketThemeButton").setAttribute("aria-label", marketText("themeLabel"));
  marketElements.dayIndex.setAttribute("aria-label", marketText("dayNavLabel"));
  marketElements.results.setAttribute("aria-label", marketText("resultsLabel"));
  market$("#marketLanguageEnglish").setAttribute("aria-pressed", String(marketState.language === "en"));
  market$("#marketLanguageFrench").setAttribute("aria-pressed", String(marketState.language === "fr"));
  const submissionStatus = market$("#marketSubmissionStatus");
  if (submissionStatus?.dataset.statusKey) {
    submissionStatus.textContent = marketText(submissionStatus.dataset.statusKey);
  }
  if (marketState.rows.length) marketBuildControls();
}

function marketSetLanguage(language) {
  marketState.language = language;
  marketLocalize();
  if (marketState.rows.length) marketApplyFilters();
}

function marketReset() {
  marketState.query = "";
  marketState.city = "all";
  marketState.day = "all";
  marketState.season = "all";
  marketState.weekend = false;
  marketElements.search.value = "";
  marketElements.weekend.setAttribute("aria-pressed", "false");
  marketBuildControls();
  marketApplyFilters();
}

function marketSubmissionBody() {
  const form = market$("#marketSubmissionForm");
  const data = new FormData(form);
  const labels = marketState.language === "fr"
    ? [
        ["Nom du marché", "marketName"],
        ["Ville ou municipalité", "community"],
        ["Comté ou région", "region"],
        ["Adresse", "address"],
        ["Jour(s) du marché", "days"],
        ["Heures", "hours"],
        ["Saison ou dates", "season"],
        ["Page officielle", "officialUrl"],
        ["Nom de la personne-ressource", "contactName"],
        ["Courriel", "contactEmail"],
        ["Produits habituellement offerts", "products"],
        ["Notes", "notes"],
      ]
    : [
        ["Market name", "marketName"],
        ["Town or city", "community"],
        ["County or region", "region"],
        ["Address", "address"],
        ["Market day(s)", "days"],
        ["Hours", "hours"],
        ["Season or dates", "season"],
        ["Official schedule page", "officialUrl"],
        ["Contact name", "contactName"],
        ["Contact email", "contactEmail"],
        ["Products typically available", "products"],
        ["Notes", "notes"],
      ];
  const lines = [
    "ZED DAYS — SUBMIT A MARKET",
    "",
    `${marketText("submissionLanguage")}: ${marketState.language === "fr" ? "Français" : "English"}`,
    "",
  ];
  labels.forEach(([label, key]) => {
    lines.push(`${label}: ${String(data.get(key) || "").trim() || "—"}`);
  });
  lines.push("", marketText("formConsent").replace(" *", ""));
  return lines.join("\n");
}

function marketValidateSubmission() {
  const form = market$("#marketSubmissionForm");
  const status = market$("#marketSubmissionStatus");
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = marketText("formInvalid");
    status.dataset.statusKey = "formInvalid";
    status.dataset.state = "error";
    return false;
  }
  status.textContent = "";
  status.dataset.statusKey = "";
  status.dataset.state = "";
  return true;
}

function marketPrepareSubmissionEmail(event) {
  event.preventDefault();
  if (!marketValidateSubmission()) return;
  const subject = `${marketText("submissionSubject")}: ${market$("#submissionMarketName").value.trim()}`;
  const mailto = `mailto:thezeddays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(marketSubmissionBody())}`;
  const status = market$("#marketSubmissionStatus");
  status.textContent = marketText("formEmailReady");
  status.dataset.statusKey = "formEmailReady";
  status.dataset.state = "success";
  window.location.href = mailto;
}

async function marketCopySubmission() {
  if (!marketValidateSubmission()) return;
  const status = market$("#marketSubmissionStatus");
  try {
    await navigator.clipboard.writeText(marketSubmissionBody());
    status.textContent = marketText("formCopied");
    status.dataset.statusKey = "formCopied";
    status.dataset.state = "success";
  } catch {
    status.textContent = marketText("formCopyFailed");
    status.dataset.statusKey = "formCopyFailed";
    status.dataset.state = "error";
  }
}

marketElements.search.addEventListener("input", (event) => {
  marketState.query = event.target.value;
  marketApplyFilters();
});
marketElements.city.addEventListener("change", (event) => {
  marketState.city = event.target.value;
  marketApplyFilters();
});
marketElements.day.addEventListener("change", (event) => {
  marketState.day = event.target.value;
  marketApplyFilters();
});
marketElements.season.addEventListener("change", (event) => {
  marketState.season = event.target.value;
  marketApplyFilters();
});
marketElements.weekend.addEventListener("click", () => {
  marketState.weekend = !marketState.weekend;
  marketElements.weekend.setAttribute("aria-pressed", String(marketState.weekend));
  marketApplyFilters();
});
marketElements.dayIndex.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-day]");
  if (!button) return;
  marketState.day = button.dataset.day;
  marketElements.day.value = marketState.day;
  marketApplyFilters();
  marketElements.results.scrollIntoView({ behavior: "smooth", block: "start" });
});
market$("#marketResetButton").addEventListener("click", marketReset);
market$("#marketEmptyResetButton").addEventListener("click", marketReset);
market$("#marketThemeButton").addEventListener("click", () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
});
market$("#marketLanguageEnglish").addEventListener("click", () => marketSetLanguage("en"));
market$("#marketLanguageFrench").addEventListener("click", () => marketSetLanguage("fr"));
market$("#marketSubmissionForm").addEventListener("submit", marketPrepareSubmissionEmail);
market$("#marketCopySubmission").addEventListener("click", marketCopySubmission);
document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement &&
    (target.matches("input, textarea, select") || target.isContentEditable);
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    marketElements.search.focus();
  }
});

marketLocalize();

fetch("./data/sw-ontario-farmers-markets.json")
  .then((response) => {
    if (!response.ok) throw new Error(marketText("dataError"));
    return response.json();
  })
  .then((rows) => {
    marketState.rows = rows;
    marketElements.total.textContent = "60+";
    marketElements.statTotal.textContent = "60+";
    marketElements.communityTotal.textContent = marketFormat(new Set(rows.map((row) => row.city_or_town)).size);
    marketElements.yearRoundTotal.textContent = marketFormat(rows.filter((row) => row.year_round).length);
    marketBuildControls();
    marketApplyFilters();
  })
  .catch((error) => {
    marketElements.count.textContent = error.message;
    marketElements.empty.hidden = false;
    marketElements.results.hidden = true;
  });

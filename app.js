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
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const fmt = new Intl.NumberFormat("en-CA");

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
  const lineLabel = state.filtered.length === 1 ? "line" : "lines";
  elements.count.textContent = `${fmt.format(state.filtered.length)} ${lineLabel} • ${fmt.format(fiftyCount)} at 50%${showingAll ? " • complete list shown" : ""}`;
  elements.empty.hidden = pageRows.length !== 0;
  elements.body.innerHTML = pageRows
    .map(
      (row) => `
        <tr data-testid="row-tariff-${row.hs_code.replaceAll(".", "-")}">
          <td data-label="HS code"><span class="code">${escapeHtml(row.hs_code)}</span></td>
          <td class="description" data-label="Description">
            <strong>${escapeHtml(row.heading)}</strong>
            <span>${escapeHtml(row.description || "No narrower description published")}</span>
          </td>
          <td data-label="Sector"><span class="sector-badge">${escapeHtml(row.sector)}</span></td>
          <td data-label="Rate"><span class="rate-badge ${row.tariff_rate_pct === 50 ? "rate-50" : ""}">${row.tariff_rate_pct}%</span></td>
          <td data-label="Trade impact"><span class="impact">Included in C$27.6B aggregate</span></td>
          <td data-label="Details"><button class="details-button" type="button" data-code="${escapeHtml(row.hs_code)}" aria-label="Open details for ${escapeHtml(row.hs_code)}">Open →</button></td>
        </tr>
      `,
    )
    .join("");

  const pageCount = Math.max(1, Math.ceil(state.filtered.length / pageSize));
  elements.pageStatus.textContent = `Page ${state.page} of ${pageCount}`;
  elements.prev.disabled = state.page <= 1;
  elements.next.disabled = state.page >= pageCount;
  elements.pagination.hidden = showingAll || state.filtered.length <= pageSize;
  elements.showAll.setAttribute("aria-pressed", String(showingAll));
  const fullSchedule = state.filtered.length === state.rows.length;
  elements.showAll.textContent = showingAll
    ? "Show 24 per page"
    : fullSchedule
      ? `Show all ${fmt.format(state.filtered.length)} HS codes`
      : `Show all ${fmt.format(state.filtered.length)} matches`;
}

function renderComparison() {
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
              <div class="bar-track" aria-label="${value.total} lines, ${value.fifty} at 50 percent">
                <span class="bar-total" style="width:${(value.total / max) * 100}%"></span>
                <span class="bar-fifty" style="width:${(value.fifty / max) * 100}%"></span>
              </div>
              <span class="sector-metric" title="All tariff lines">${value.total} lines</span>
              <span class="sector-metric" title="Lines at 50%">${value.fifty} × 50%</span>
              <span class="aggregate-only">Aggregate only</span>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state"><h3>No sectors to compare</h3><p>Adjust the active filters.</p></div>`;
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
            <span>${rows.length} lines${fifty ? ` / ${fifty} at 50%` : ""}</span>
          </div>
          <button type="button" data-priority="${index}" aria-label="Show ${escapeHtml(group.title)} tariff lines">SHOW →</button>
        </article>
      `;
    })
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
  elements.detailContent.innerHTML = `
    <span class="eyebrow">Tariff item</span>
    <h2 class="detail-code">${escapeHtml(row.hs_code)}</h2>
    <div class="detail-grid">
      <div class="detail-block"><span class="eyebrow">Assigned rate</span><strong class="${row.tariff_rate_pct === 50 ? "rate-50" : ""}">${row.tariff_rate_pct}%</strong></div>
      <div class="detail-block"><span class="eyebrow">Sector</span><strong>${escapeHtml(row.sector)}</strong></div>
    </div>
    <div class="detail-description">
      <span class="eyebrow">Official description</span>
      <h3>${escapeHtml(row.heading)}</h3>
      <p>${escapeHtml(row.description || "No narrower indicative description published.")}</p>
    </div>
    <div class="detail-description">
      <span class="eyebrow">Trade impact</span>
      <p>Included in the official C$27.6B aggregate. No item-level import value is published in the schedule.</p>
    </div>
    <p class="detail-description"><a class="source-link" href="${row.source_url}" target="_blank" rel="noreferrer">Verify in official schedule</a></p>
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
  const response = await fetch("./data/tariffs.json");
  if (!response.ok) throw new Error("Tariff data failed to load");
  state.rows = await response.json();
  const sectors = [...new Set(state.rows.map((row) => row.sector))].sort();
  elements.sector.insertAdjacentHTML(
    "beforeend",
    sectors.map((sector) => `<option value="${escapeHtml(sector)}">${escapeHtml(sector)}</option>`).join(""),
  );
  $("#totalLines").textContent = fmt.format(state.rows.length);
  $("#noticeCount").textContent = fmt.format(state.rows.length);
  $("#fiftyLines").textContent = fmt.format(state.rows.filter((row) => row.tariff_rate_pct === 50).length);
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

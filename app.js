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
    const queryMatch = terms.every((term) => haystack.includes(term));
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

  const maxPage = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  state.page = Math.min(state.page, maxPage);
  renderTable();
  renderComparison();
}

function renderTable() {
  const start = (state.page - 1) * state.pageSize;
  const pageRows = state.filtered.slice(start, start + state.pageSize);
  const fiftyCount = state.filtered.filter((row) => row.tariff_rate_pct === 50).length;
  elements.count.textContent = `${fmt.format(state.filtered.length)} lines • ${fmt.format(fiftyCount)} at 50%`;
  elements.empty.hidden = pageRows.length !== 0;
  elements.body.innerHTML = pageRows
    .map(
      (row) => `
        <tr data-testid="row-tariff-${row.hs_code.replaceAll(".", "-")}">
          <td><span class="code">${escapeHtml(row.hs_code)}</span></td>
          <td class="description">
            <strong>${escapeHtml(row.heading)}</strong>
            <span>${escapeHtml(row.description || "No narrower description published")}</span>
          </td>
          <td><span class="sector-badge">${escapeHtml(row.sector)}</span></td>
          <td><span class="rate-badge ${row.tariff_rate_pct === 50 ? "rate-50" : ""}">${row.tariff_rate_pct}%</span></td>
          <td><span class="impact">Included in C$27.6B aggregate</span></td>
          <td><button class="details-button" type="button" data-code="${escapeHtml(row.hs_code)}" aria-label="Open details for ${escapeHtml(row.hs_code)}">→</button></td>
        </tr>
      `,
    )
    .join("");

  const pageCount = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  elements.pageStatus.textContent = `Page ${state.page} of ${pageCount}`;
  elements.prev.disabled = state.page <= 1;
  elements.next.disabled = state.page >= pageCount;
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

function resetFilters() {
  state.query = "";
  state.sector = "all";
  state.rates = new Set([15, 25, 50]);
  state.sort = "code-asc";
  state.fiftyOnly = false;
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

import json

with open('research/alcohol_batch_deduped.json', encoding='utf-8') as f:
    batch = json.load(f)

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    existing = json.load(f)

max_id = max(e['id'] for e in existing)
NEW_SECTOR = "Beer, wine and spirits"

HS_RELEVANCE = {
    "22.03": "Replaces U.S.-origin beer subject to Canada's 25% counter-tariff on U.S. beer (heading 22.03).",
    "22.04": "Replaces U.S.-origin wine subject to Canada's 25% counter-tariff on U.S. wine (heading 22.04).",
    "22.06": "Replaces U.S.-origin cider and other fermented beverages subject to Canada's 25% counter-tariff (heading 22.06).",
    "22.08": "Replaces U.S.-origin spirits (whisky, vodka, gin, liqueurs) subject to Canada's 25% counter-tariff on U.S. spirits (heading 22.08).",
}

new_entries = []
for i, b in enumerate(batch):
    new_id = max_id + 1 + i
    entry = {
        "id": new_id,
        "sector": NEW_SECTOR,
        "category": b["category"],
        "brand": b["brand"],
        "product_or_line": b["product_or_line"],
        "common_use": b["common_use"],
        "made_in_canada_claim": b["made_in_canada_claim"],
        "manufacturing_location": b["manufacturing_location"],
        "ownership_note": b.get("ownership_note", ""),
        "origin_caveat": b.get("origin_caveat", ""),
        "tariff_relevance": HS_RELEVANCE.get(b["candidate_hs_heading"], ""),
        "candidate_hs_heading": b["candidate_hs_heading"],
        "evidence_quote": b["evidence_quote"],
        "official_source_url": b["official_source_url"],
        "secondary_source_url": b["secondary_source_url"],
        "verification_date": "2026-08-30",
        "confidence": b["confidence"],
    }
    new_entries.append(entry)

with open('research/alcohol_entries_en.json', 'w', encoding='utf-8') as f:
    json.dump(new_entries, f, indent=2, ensure_ascii=False)

print("Built", len(new_entries), "English entries, IDs", new_entries[0]["id"], "-", new_entries[-1]["id"])

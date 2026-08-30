import json

with open('research/indigenous_batch.json', encoding='utf-8') as f:
    batch = json.load(f)

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    existing = json.load(f)

max_id = max(e['id'] for e in existing)

HS_RELEVANCE = {
    "44.07": "Replaces U.S.-origin sawn lumber subject to Canada's counter-tariffs on U.S. wood products (heading 44.07).",
    "44.01": "Replaces U.S.-origin firewood and fuelwood subject to Canada's counter-tariffs on U.S. wood products (heading 44.01).",
    "16.04": "Replaces U.S.-origin canned/prepared fish subject to Canada's counter-tariffs on U.S. food products (heading 16.04).",
    "17.02": "Replaces U.S.-origin maple syrup and sugar subject to Canada's counter-tariffs on U.S. food products (heading 17.02).",
    "09.02": "Replaces U.S.-origin packaged tea subject to Canada's counter-tariffs on U.S. food products (heading 09.02).",
    "10.08": "Replaces U.S.-origin specialty grains (wild rice) subject to Canada's counter-tariffs on U.S. food products (heading 10.08).",
    "09.01": "Replaces U.S.-roasted coffee subject to Canada's counter-tariffs on U.S. food products (heading 09.01).",
    "20.05": "Replaces U.S.-origin packaged snack foods subject to Canada's counter-tariffs on U.S. food products (heading 20.05).",
    "16.02": "Replaces U.S.-origin prepared meat snacks subject to Canada's counter-tariffs on U.S. food products (heading 16.02).",
    "19.01": "Replaces U.S.-origin baking and pancake mixes subject to Canada's counter-tariffs on U.S. food products (heading 19.01).",
    "22.01": "Replaces U.S.-origin bottled water subject to Canada's counter-tariffs on U.S. food and beverage products (heading 22.01).",
    "62.01": "Replaces U.S.-origin outerwear subject to Canada's counter-tariffs on U.S. clothing and textiles (heading 62.01).",
    "64.04": "Replaces U.S.-origin footwear subject to Canada's counter-tariffs on U.S. clothing and textiles (heading 64.04).",
    "61.10": "Replaces U.S.-origin knitted apparel subject to Canada's counter-tariffs on U.S. clothing and textiles (heading 61.10).",
    "61.09": "Replaces U.S.-origin apparel subject to Canada's counter-tariffs on U.S. clothing and textiles (heading 61.09).",
    "22.08": "Replaces U.S.-origin spirits subject to Canada's 25% counter-tariff on U.S. spirits (heading 22.08).",
    "22.03": "Replaces U.S.-origin beer subject to Canada's 25% counter-tariff on U.S. beer (heading 22.03).",
    "33.04": "Replaces U.S.-origin cosmetics and skincare subject to Canada's counter-tariffs on U.S. personal care products (heading 33.04).",
    "34.01": "Replaces U.S.-origin soap subject to Canada's counter-tariffs on U.S. personal care products (heading 34.01).",
    "34.02": "Replaces U.S.-origin household cleaning products subject to Canada's counter-tariffs on U.S. cleaning products (heading 34.02).",
}

new_entries = []
for i, b in enumerate(batch):
    new_id = max_id + 1 + i
    entry = {
        "id": new_id,
        "sector": b["sector"],
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

with open('research/indigenous_entries_en.json', 'w', encoding='utf-8') as f:
    json.dump(new_entries, f, indent=2, ensure_ascii=False)

print("Built", len(new_entries), "English entries, IDs", new_entries[0]["id"], "-", new_entries[-1]["id"])

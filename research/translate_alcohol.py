import json
import pplx_sdk

with open('research/alcohol_entries_en.json', encoding='utf-8') as f:
    entries = json.load(f)

INSTRUCTION = """You are translating a Canadian-made product field guide entry from English to Canadian French (the register used on official Government of Canada bilingual pages, e.g. canada.ca French pages). Translate each of these six fields naturally and accurately, preserving brand names, proper nouns, and place names unchanged:
- category
- product_or_line
- common_use
- made_in_canada_claim
- manufacturing_location
- ownership_note
- origin_caveat
- tariff_relevance

Do NOT translate brand names, HS heading numbers, or URLs. If a source field is an empty string, return an empty string for its translation too. Use formal but accessible French suitable for a public-facing government-style bilingual website."""

SCHEMA = {
    "type": "object",
    "properties": {
        "category_fr": {"type": "string"},
        "product_or_line_fr": {"type": "string"},
        "common_use_fr": {"type": "string"},
        "made_in_canada_claim_fr": {"type": "string"},
        "manufacturing_location_fr": {"type": "string"},
        "ownership_note_fr": {"type": "string"},
        "origin_caveat_fr": {"type": "string"},
        "tariff_relevance_fr": {"type": "string"},
    },
    "required": ["category_fr", "product_or_line_fr", "common_use_fr", "made_in_canada_claim_fr",
                 "manufacturing_location_fr", "ownership_note_fr", "origin_caveat_fr", "tariff_relevance_fr"],
}

items = []
for e in entries:
    items.append(json.dumps({
        "category": e["category"],
        "product_or_line": e["product_or_line"],
        "common_use": e["common_use"],
        "made_in_canada_claim": e["made_in_canada_claim"],
        "manufacturing_location": e["manufacturing_location"],
        "ownership_note": e["ownership_note"],
        "origin_caveat": e["origin_caveat"],
        "tariff_relevance": e["tariff_relevance"],
    }, ensure_ascii=False))

results = pplx_sdk.llm.extract(
    items=items,
    instruction=INSTRUCTION,
    output_schema=SCHEMA,
    max_tokens=16384,
)

output = []
errors = []
for entry, result in zip(entries, results, strict=True):
    if result.error:
        errors.append((entry["brand"], result.error))
        continue
    r = result.result
    entry["category_fr"] = r["category_fr"]
    entry["product_or_line_fr"] = r["product_or_line_fr"]
    entry["common_use_fr"] = r["common_use_fr"]
    entry["made_in_canada_claim_fr"] = r["made_in_canada_claim_fr"]
    entry["manufacturing_location_fr"] = r["manufacturing_location_fr"]
    entry["ownership_note_fr"] = r["ownership_note_fr"]
    entry["origin_caveat_fr"] = r["origin_caveat_fr"]
    entry["tariff_relevance_fr"] = r["tariff_relevance_fr"]
    entry["sector_fr"] = "Bière, vin et spiritueux"
    output.append(entry)

print("Translated:", len(output), "Errors:", len(errors))
for brand, err in errors:
    print("ERROR:", brand, err)

with open('research/alcohol_entries_bilingual.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

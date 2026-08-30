import json
import csv

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    data = json.load(f)

BILINGUAL_FIELDS = [
    "id", "sector", "category", "brand", "product_or_line", "common_use",
    "made_in_canada_claim", "manufacturing_location", "ownership_note", "origin_caveat",
    "tariff_relevance", "candidate_hs_heading", "evidence_quote", "official_source_url",
    "secondary_source_url", "verification_date", "confidence",
    "sector_fr", "category_fr", "product_or_line_fr", "common_use_fr",
    "made_in_canada_claim_fr", "manufacturing_location_fr", "ownership_note_fr",
    "origin_caveat_fr", "tariff_relevance_fr",
]

EN_FIELDS = [
    "id", "sector", "category", "brand", "product_or_line", "common_use",
    "made_in_canada_claim", "manufacturing_location", "ownership_note", "origin_caveat",
    "tariff_relevance", "candidate_hs_heading", "evidence_quote", "official_source_url",
    "secondary_source_url", "verification_date", "confidence",
]

with open('data/canadian-field-guide-bilingual.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=BILINGUAL_FIELDS, extrasaction='ignore')
    writer.writeheader()
    for row in data:
        writer.writerow({k: row.get(k, "") for k in BILINGUAL_FIELDS})

with open('data/canadian-field-guide.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=EN_FIELDS, extrasaction='ignore')
    writer.writeheader()
    for row in data:
        writer.writerow({k: row.get(k, "") for k in EN_FIELDS})

print("Wrote", len(data), "rows to both CSVs")

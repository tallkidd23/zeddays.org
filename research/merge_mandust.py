#!/usr/bin/env python3
"""
Merge MANDUST INC. entry into canadian-field-guide-bilingual.json
Run this script locally after pulling the latest changes from GitHub.

Usage:
    python research/merge_mandust.py
    
Then run:
    python research/regenerate_csvs.py
"""

import json

print("Loading canadian-field-guide-bilingual.json...")
with open('data/canadian-field-guide-bilingual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Current entries: {len(data)}")

# MANDUST entry (bilingual)
mandust_entry = {
    "brand_en": "MANDUST INC.",
    "brand_fr": "MANDUST INC.",
    "product_en": "MANDUST",
    "product_fr": "MANDUST",
    "category_en": "HEALTH & BEAUTY",
    "category_fr": "SANTÉ·BEAUTÉ·SOINS PERSONNELS",
    "sector_en": "Cleaning, beauty and personal care",
    "sector_fr": "Nettoyage, beauté et soins personnels",
    "manufacturing_location_en": "Welland, Ontario",
    "manufacturing_location_fr": "Welland, Ontario",
    "canadian_claim_en": "Made in Canada",
    "canadian_claim_fr": "Fabriqué··au Canada",
    "evidence_url": "https://mandust.ca/",
    "product_url": "https://mandust.ca/collections/all",
    "contact_name": "Steven McInnis",
    "contact_email": "mandustpowder@gmail.com",
    "relationship_en": "Brand owner/employee",
    "relationship_fr": "Proprié··taire/employé·· de la marque",
    "origin_caveats_en": "Some ingredients and packaging components sourced from outside Canada. Blended, filled, packaged and finished in Welland, Ontario.",
    "origin_caveats_fr": "Certains ingrédients et composants d'emballage sourc hors du Canada. Mélangé··, rempli, emballé·· et fini à Welland, Ontario.",
    "confidence": "High",
    "notes_en": "Canadian-owned small business. Body powder produced and packaged in Welland, Ontario. Verified at mandust.ca.",
    "notes_fr": "Petite entreprise canadienne. Poudre corporelle produite et emballé··e à Welland, Ontario. Vérifié·· à mandust.ca.",
    "tariff_connection_en": "HS 3304 (beauty/skincare preparations)",
    "tariff_connection_fr": "SH 3304 (pré··parations de beauté​​/soins de la peau)"
}

# Append entry
data.append(mandust_entry)
print(f"After adding MANDUST: {len(data)} entries")

# Save back
print("Saving updated JSON...")
with open('data/canadian-field-guide-bilingual.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n✓ MANDUST entry added successfully!")
print("\nNext steps:")
print("1. Run: python research/regenerate_csvs.py")
print("2. Update entry counts in HTML/JS files if needed")
print("3. Commit and push to GitHub")

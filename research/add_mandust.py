#!/usr/bin/env python3
"""
Add MANDUST INC. entry to canadian-field-guide-bilingual.json using the
site's real schema (matches existing 687 entries), then regenerate CSVs.

Usage:
    python research/add_mandust.py
    python research/regenerate_csvs.py
"""
import json

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    data = json.load(f)

next_id = max(e['id'] for e in data) + 1
print(f"Current entries: {len(data)}. New id: {next_id}")

entry = {
    "id": next_id,
    "sector": "Cleaning, beauty and personal care",
    "category": "Personal care",
    "brand": "MANDUST INC.",
    "product_or_line": "MANDUST, LADYDUST and BABYDUST body powders",
    "common_use": "Talc-free, all-natural body powder for men, women and babies; moisture absorption and odor protection",
    "made_in_canada_claim": "mandust.ca describes MANDUST as a \u201cproudly Canadian brand,\u201d \u201cheadquartered in Niagara, Canada,\u201d with \u201cNorth American manufacturing,\u201d and states its powders are \u201cproudly made in Ontario.\u201d The brand's own product labelling uses the claim \u201cMade in Canada\u201d (per brand submission and third-party verification); this exact phrase was not found verbatim on the pages fetched from mandust.ca.",
    "manufacturing_location": "Welland, Ontario, Canada (tubes hand filled, packed and shipped by owner Steven McInnis)",
    "ownership_note": "Canadian-owned small business; brand owner/contact Steven McInnis, based in Welland, Ontario",
    "origin_caveat": "Some ingredients and packaging components are sourced from outside Canada. Packaging (recyclable paper tubes, 80% post-consumer recycled content) is described by mandust.ca as North American rather than specifically Canadian; ingredient sourcing (arrowroot, kaolin clay, zinc oxide) is not fully disclosed. Final product is blended, filled, packaged and finished in Welland, Ontario.",
    "tariff_relevance": "Replaces U.S.-origin body powders and personal care preparations subject to Canada's counter-tariffs (heading 33.04).",
    "candidate_hs_heading": "33.04",
    "evidence_quote": "Headquartered in Niagara, Canada... North American manufacturing... proudly made in Ontario.",
    "official_source_url": "https://mandust.ca/",
    "secondary_source_url": "https://supportontariomade.ca/fabricant/welland/mandust-inc",
    "verification_date": "2026-09-13",
    "confidence": "Medium",
    "sector_fr": "Entretien m\u00e9nager, beaut\u00e9 et soins personnels",
    "category_fr": "Soins personnels",
    "product_or_line_fr": "Poudres corporelles MANDUST, LADYDUST et BABYDUST",
    "common_use_fr": "Poudre corporelle naturelle et sans talc pour hommes, femmes et b\u00e9b\u00e9s; absorption de l'humidit\u00e9 et protection contre les odeurs",
    "made_in_canada_claim_fr": "Le site mandust.ca d\u00e9crit MANDUST comme une \u00ab marque canadienne \u00bb, \u00ab si\u00e8ge social \u00e0 Niagara, Canada \u00bb, avec une \u00ab fabrication nord-am\u00e9ricaine \u00bb, et pr\u00e9cise que ses poudres sont \u00ab fi\u00e8rement fabriqu\u00e9es en Ontario \u00bb. L'\u00e9tiquetage du produit utilise la mention \u00ab Fabriqu\u00e9 au Canada \u00bb (selon la soumission de la marque et la v\u00e9rification par des tiers); cette formulation exacte n'a pas \u00e9t\u00e9 trouv\u00e9e textuellement sur les pages consult\u00e9es de mandust.ca.",
    "manufacturing_location_fr": "Welland, Ontario, Canada (tubes remplis, emball\u00e9s et exp\u00e9di\u00e9s \u00e0 la main par le propri\u00e9taire Steven McInnis)",
    "ownership_note_fr": "Petite entreprise canadienne; propri\u00e9taire/contact de la marque Steven McInnis, bas\u00e9 \u00e0 Welland, Ontario",
    "origin_caveat_fr": "Certains ingr\u00e9dients et composants d'emballage proviennent de l'ext\u00e9rieur du Canada. L'emballage (tubes en papier recyclable, 80 % de contenu recycl\u00e9 postconsommation) est d\u00e9crit par mandust.ca comme nord-am\u00e9ricain plut\u00f4t que sp\u00e9cifiquement canadien; la provenance des ingr\u00e9dients (arrow-root, argile kaolin, oxyde de zinc) n'est pas enti\u00e8rement divulgu\u00e9e. Le produit final est m\u00e9lang\u00e9, rempli, emball\u00e9 et fini \u00e0 Welland, Ontario.",
    "tariff_relevance_fr": "Remplace les poudres corporelles et pr\u00e9parations de soins personnels d'origine am\u00e9ricaine vis\u00e9es par les contre-mesures tarifaires du Canada (position tarifaire 33.04).",
}

data.append(entry)
print(f"After adding MANDUST: {len(data)} entries")

with open('data/canadian-field-guide-bilingual.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved. Next: python research/regenerate_csvs.py")

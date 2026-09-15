#!/usr/bin/env python3
"""
Add Canvas Prints Ltd. entry to canadian-field-guide-bilingual.json
using the site's real schema (matches existing entries), then regenerate CSVs.

Usage:
    python research/add_canvas_prints.py
    python research/regenerate_csvs.py
"""
import json

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    data = json.load(f)

next_id = max(e['id'] for e in data) + 1
print(f"Current entries: {len(data)}. New id: {next_id}")

entry = {
    "id": next_id,
    "sector": "Paper, tissue, packaging and printed goods",
    "category": "Commercial printing",
    "brand": "Canvas Prints Ltd.",
    "product_or_line": "Custom photo canvas prints and stretched canvas wall art",
    "common_use": "Personalized printed canvas wall art from customer-submitted photos, for home and office decor",
    "made_in_canada_claim": "Company states Canadian orders are printed, finished and quality-checked in its Alberta workshop (Pincher Creek), using cotton canvas, archival pigment inks, and hand-built stretcher frames from Canadian fir",
    "manufacturing_location": "Alberta (Pincher Creek workshop). Calgary, Edmonton, Vancouver-area/Surrey, and Markham/Toronto are disclosed courier pickup points, not separate production sites",
    "ownership_note": "Canadian family-owned business; CEO Vojtech Vyhnak, Alberta. Business registered since May 2020 (BBB profile)",
    "origin_caveat": "Manufacturing location stated at the provincial level (Alberta) rather than naming Pincher Creek on the regional storefront sites; this reflects an imprecise description rather than a misrepresentation, and was confirmed directly by the company. Raw material origin (cotton canvas fibre, printing inks) is not fully disclosed; frames use Canadian fir. The tariff-relevant category (finished printed pictures/photographs, HS 49.11) is the Canadian-produced output itself, which directly substitutes for the U.S.-origin equivalent regardless of upstream material sourcing.",
    "tariff_relevance": "Replaces U.S.-origin printed pictures and photographs (heading 49.11), which is subject to Canada's 50% counter-tariff on U.S. products. No separate counter-tariff applies to the raw canvas fabric or ink inputs, so the finished Canadian-printed product is a direct substitute.",
    "candidate_hs_heading": "49.11",
    "evidence_quote": "Every Calgary order is printed, finished, and quality-checked by our family team in Alberta.",
    "official_source_url": "https://www.canvasprintscalgary.com/",
    "secondary_source_url": "https://www.bbb.org/ca/ab/pincher-creek/profile/printing-services/canvas-prints-ltd-0017-138931",
    "verification_date": "2026-09-15",
    "confidence": "High",
    "sector_fr": "Papier, papier hygiénique, emballages et imprimés",
    "category_fr": "Impression commerciale",
    "product_or_line_fr": "Impressions photo personnalisées sur toile et œuvres murales sur toile tendue",
    "common_use_fr": "Œuvres murales imprimées personnalisées à partir de photos envoyées par le client, pour la décoration résidentielle et de bureau",
    "made_in_canada_claim_fr": "L'entreprise déclare que les commandes canadiennes sont imprimées, finies et contrôlées dans son atelier en Alberta (Pincher Creek), en utilisant de la toile de coton, des encres pigmentaires archivistiques et des cadres tendeurs fabriqués à la main en sapin canadien",
    "manufacturing_location_fr": "Alberta (atelier de Pincher Creek). Calgary, Edmonton, la région de Vancouver/Surrey et Markham/Toronto sont des points de ramassage divulgués par coursier, et non des sites de production distincts",
    "ownership_note_fr": "Entreprise familiale canadienne; chef de la direction Vojtech Vyhnak, Alberta. Entreprise enregistrée depuis mai 2020 (profil du BBB)",
    "origin_caveat_fr": "L'emplacement de fabrication est indiqué à l'échelle provinciale (Alberta) plutôt que de nommer Pincher Creek sur les sites régionaux; cela reflète une description imprécise plutôt qu'une déclaration inexacte, et a été confirmé directement par l'entreprise. L'origine des matériaux bruts (fibre de toile de coton, encres d'impression) n'est pas entièrement divulguée; les cadres utilisent du sapin canadien. La catégorie pertinente pour les contre-mesures tarifaires (images et photographies imprimées finies, SH 49.11) est le produit fini fabriqué au Canada, qui remplace directement l'équivalent d'origine américaine, peu importe la provenance des matériaux en amont.",
    "tariff_relevance_fr": "Remplace les images et photographies imprimées d'origine américaine (position 49.11), visées par la contre-mesure tarifaire canadienne de 50 % sur les produits américains. Aucune contre-mesure distincte ne s'applique à la toile brute ou aux encres, de sorte que le produit fini imprimé au Canada constitue un substitut direct.",
}

data.append(entry)
print(f"After adding Canvas Prints Ltd.: {len(data)} entries")

with open('data/canadian-field-guide-bilingual.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved. Next: python research/regenerate_csvs.py")

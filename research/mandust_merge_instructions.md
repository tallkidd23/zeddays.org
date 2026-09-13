# MANDUST INC. - Merge Instructions

## Entry Summary
- **Brand**: MANDUST INC.
- **Product**: MANDUST (body powder)
- **Category**: HEALTH & BEAUTY
- **Sector**: Cleaning, beauty and personal care
- **Manufacturing**: Welland, Ontario
- **Canadian Claim**: Made in Canada
- **Confidence**: High
- **Origin Caveats**: Some ingredients and packaging components sourced from outside Canada

## Verification Sources
1. https://mandust.ca/ - Official site with Made in Canada claim
2. https://mandust.ca/pages/about-us - Confirms Welland, ON operations
3. https://supportontariomade.ca/fabricant/welland/mandust-inc - Ontario Made listing
4. https://fyicanada.ca/mandust-mens-body-powder - 98/100 Canadian score, notes packaging from North America

## Contact
- Steven McInnis
- mandustpowder@gmail.com
- Brand owner/employee

## Merge Steps

### Option 1: Use existing merge scripts (recommended)
```bash
# Copy mandust_entries_bilingual.json to research/
# Run your existing merge script (similar to indigenous merge)
python research/merge_indigenous.py  # Adapt for mandust
python research/regenerate_csvs.py
```

### Option 2: Manual merge
1. Open `data/canadian-field-guide-bilingual.json`
2. Append the entry from `research/mandust_entries_bilingual.json`
3. Run `python research/regenerate_csvs.py` to update CSVs
4. Update entry count in field-guide.html, field-guide.js, index.html, app.js
5. Commit and push

### Option 3: Direct edit
1. Add entry to `data/canadian-field-guide-bilingual.json` array
2. Add corresponding row to `data/canadian-field-guide-bilingual.csv`
3. Add corresponding row to `data/canadian-field-guide.csv` (non-bilingual)
4. Update entry counts in HTML/JS files
5. Commit and push

## Notes
- Entry follows the same structure as indigenous_entries_bilingual.json
- Confidence rated "High" based on multiple verification sources
- Origin caveats properly documented (ingredients/packaging from outside Canada)
- Fits existing "Cleaning, beauty and personal care" sector

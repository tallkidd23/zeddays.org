import json

with open('data/canadian-field-guide-bilingual.json', encoding='utf-8') as f:
    existing = json.load(f)

with open('research/indigenous_entries_bilingual.json', encoding='utf-8') as f:
    new_entries = json.load(f)

before = len(existing)
merged = existing + new_entries

with open('data/canadian-field-guide-bilingual.json', 'w', encoding='utf-8') as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print("Before:", before, "New:", len(new_entries), "After:", len(merged))

# Sector counts after merge
from collections import Counter
c = Counter(e['sector'] for e in merged)
for sector, count in sorted(c.items(), key=lambda x: -x[1]):
    print(count, sector)

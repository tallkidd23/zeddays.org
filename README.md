# Tariff Scope Explorer

A static, searchable dashboard of the Government of Canada's tariff items for the countermeasures effective September 8, 2026.

## Data

- `data/tariffs.json`: dashboard dataset
- `data/tariffs.csv`: machine-readable export of the complete official table
- `data/summary.json`: extraction and validation counts

The consolidated Government of Canada schedule contains 648 current tariff items:

- 21 at 15%
- 214 at 25%
- 413 at 50%

The official announcement reports C$27.6 billion in covered U.S. imports for the measure as a whole. No item-level dollar value is published in the tariff schedule, so the dashboard labels item trade impact as aggregate-only rather than inventing allocations.

## Run locally

Serve this directory with any static web server and open `index.html`.

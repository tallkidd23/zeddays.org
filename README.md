# ZED DAYS Counter-Tariff Field Guide

A static, searchable ZED DAYS campaign dashboard of the Government of Canada's tariff items for the countermeasures effective September 8, 2026.

The interface uses the established ZED DAYS paper, ink and maple-red palette; vertical slashed-zero emblem; typewriter typography; and “Zero Engagement. Unlimited Power.” tagline.

## Data

- `data/tariffs.json`: dashboard dataset
- `data/tariffs.csv`: machine-readable export of the complete official table
- `data/summary.json`: extraction and validation counts

The consolidated Government of Canada schedule contains 648 current tariff items:

- 21 at 15%
- 214 at 25%
- 413 at 50%

The official announcement reports C$27.6 billion in covered U.S. imports for the measure as a whole. No item-level dollar value is published in the tariff schedule, so the dashboard labels item trade impact as aggregate-only rather than inventing allocations.

The Top 10 section is an editorial actionability ranking based on tariff rate, retail visibility, substitution potential and breadth of covered tariff lines. It is explicitly not presented as an official dollar-volume ranking.

## Run locally

Serve this directory with any static web server and open `index.html`.

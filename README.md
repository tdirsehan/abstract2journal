# Abstract2Journal

An evidence-based academic journal recommender that matches research abstracts and keywords with suitable journals using OpenAlex search, publication evidence, topic overlap, and similar published articles.

Live app:
https://tdirsehan.github.io/abstract2journal/

## How it works

1. Enter an abstract and optional keywords.
2. The app first tries OpenAlex semantic search and automatically falls back to OpenAlex text search when needed.
3. Retrieved journal articles are grouped by journal.
4. A Journal Fit score is calculated from article-match strength, evidence frequency, keyword/topic overlap, and recency.
5. Up to 10 journal recommendations are displayed.

## Each result includes

- Journal name
- Journal Fit score
- Overlapping Aspects
- Multi-sentence explanation of why the journal fits
- Most similar real published article returned by OpenAlex
- Verified article link, prioritizing DOI when available

## Evidence integrity

- The app does not invent article titles or URLs.
- Article links are derived from OpenAlex records.
- Journal Fit is an evidence-based matching score, not an acceptance probability.
- Users should always verify the journal's current aims & scope, indexing, quartile, APC, and submission requirements on the official publisher website.

The current version is a static GitHub Pages application and does not require a separate server or end-user API key for casual use.

## Academic AI Tool Portfolio

This project is part of the Academic AI Tool Portfolio by Prof. Dr. Taşkın Dirsehan:
https://github.com/tdirsehan

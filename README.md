# Abstract2Journal

AI-powered academic journal recommender that matches research abstracts and keywords with suitable journals using OpenAlex semantic search and publication evidence.

How it works:
1. Enter an abstract and optional keywords.
2. The app uses OpenAlex semantic search to retrieve up to 50 similar recent journal articles.
3. Those articles are grouped by journal.
4. An explainable Journal Fit Score is calculated from semantic similarity, evidence frequency, keyword/topic overlap, and recency.
5. Up to 10 journals are shown.

Each result includes:
- Journal Fit Score
- Overlapping Aspects
- Multi-sentence fit explanation
- Most similar real published article in that journal
- Verified article link taken from the OpenAlex API response
- OpenAlex journal link
- Copyable verification prompt

Evidence integrity:
- The app does not invent article titles or URLs.
- Link priority: DOI returned by OpenAlex, then OpenAlex publisher landing page, then OpenAlex work record.
- Journal Fit is not an acceptance probability.

Deployment: static HTML for GitHub Pages.
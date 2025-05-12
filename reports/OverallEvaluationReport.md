## Project Overview

This report summarizes the testing done for the Spring Pet Clinic application. Both the frontend (UI) and backend (API) were tested. I used Playwright for automated tests and GitHub Actions to run tests in ci/cd automatically.

### Observations

### Backend API Observations

- Incorrect Status Codes: APIs return 500 Internal Server Error for not-found entities instead of the correct 404 Not Found.
- No Response Body: Many APIs return empty content (204 No Content or nothing at all), reducing their usefulness for validation.
- Duplicate Entity Creation: Sending the same data again creates a new record instead of checking for duplicates.

### Frontend (UI) Observations

- Search Limitations: Owner search only works with either the first or last name. Searching with a full name (e.g., "David Smith") yields no results.
- No Notifications or Messages: There’s no message shown to confirm if an owner or pet was added or edited successfully. Users don’t know if the action worked.

### Why I choose these Test Cases for Automation

- Important Features: Owner and Pet forms are key parts of the app.
- Regression-Prone: These are the most frequently used flows and prone to regression.
- Time-Efficient: Filling forms and checking results is faster with automation.
- API: Basic CRUD and status validation help ensure backend reliability.

### Recommendations

- Add data-testid or unique attributes to all action links/buttons for easier and stable test targeting.
- Fix HTTP status codes to align with REST standards (e.g., return 404 for not found).
- Improve duplication logic or return appropriate messages when creating existing data.
- Improve search feature to allow multi-word queries.
- Display a success message after adding or editing data so users know their action worked.

### Related Documentation

- [README](../README.md)
- [Manual Test Cases](../ManualTestCases.md)
- [Bug Report](./BugReport.md)

## Project Overview

This report outlines the testing work carried out for the Spring Pet Clinic application. Both frontend (UI) and backend (API) functionalities were tested thoroughly using a combination of manual and automated testing approaches.

Automation was done using Playwright with typescript, and tests were executed automatically in CI/CD via GitHub Actions.

### Observations

### Backend API Observations

- Incorrect Status Codes: For example, when a record is not found, the API returns a 500 Internal Server Error instead of the correct 404 Not Found.
- Missing Response Body: Many APIs return empty content (204 No Content or nothing at all), reducing their usefulness for validation.
- Duplicate Entity Creation: Sending the same data again creates a new record instead of checking for duplicates.

### Frontend (UI) Observations

- Search Limitations: Searching for owners only works if you enter either the first name or last name. Full names like “David Smith” return no results.
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

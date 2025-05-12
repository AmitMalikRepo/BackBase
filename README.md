## Test Automation Framework for Spring Petclinic

This is a test automation framework built using Playwright and TypeScript. It focuses on testing both frontend and backend functionalities of the spring petclinic application. The framework automates key features such as search functionality, adding new owners and thier pets, updating owner details to ensure the web app performs reliably under different conditions and also on the backend side, it includes comprehensive API testing with CRUD operations to ensure reliability, correctness, and consistency of the system under various conditions.

## Table of Contents

1. Overview
2. Features
3. Project Structure
4. Test Scripts
5. Installation
6. Running Tests
7. Accessing Test Reports
8. Playwright Configuration
9. CI Integration
10. Reports and Manual Test Cases  

### Overview

This repository contains the automated test framework developed for testing spring petclininc application, a leading real estate platform. The framework is designed to ensure seamless functionality of the website's core features, from frontend UI tests to backend API validations.

The framework is fully integrated with GitHub Actions, a CI/CD pipeline tool that automates test execution on every code push or pull request, ensuring the quality and stability of the application.

### Features

- End-to-End Testing: Test complete flows such as search, add new owner or pet, and navigation across pages.
- Parallel Execution: Maximize performance with fully parallelized tests.
- Detailed Reporting: HTML reports generated after test runs for visual insights.
- Retry Mechanism: Automatic retry on failed tests (especially useful in CI environments).
- CI Integration: Configured with GitHub Actions for automated test runs on pull requests.
- Configurable Tests: Easily configure browser, retries, and other settings in playwright.config.ts.

### Project Structure

Here’s an outline of the project’s structure:

<pre>
├── .github
│   └── workflows
│       └── playwright.yml                    # GitHub Actions workflow for running Playwright tests in CI/CD
│
├── reports
│   ├── OverAllEvaluationReport.md             # Overall evaluation report
│   └── BugReport.md                           # Document containing bugs/issues identified during testing
│   
│   
├── src
│   ├── helper
│   │   ├── ownerAPIHelper.ts                 # Helper file for managing API requests related to owner
│   │   ├── petAPIHelper.ts                   # Helper file for managing API requests related to pet
│   │   ├── veterinariansAPIHelper.ts         # Helper file for managing API requests related to veterinarians
│   │   └── visitsAPIHelper.ts                # Helper file for managing API requests related to visits
│   │
│   ├── pages
│   │   ├── HomePage.ts                       # Page Object Model (POM) for the home page
│   │   └── OwnerPage.ts                      # Page Object Model (POM) for the owner page
│   │
│   ├── testdata
│   │   ├── backend
│   │   │   ├── owner.json                    # Backend test data for owner-related operations
│   │   │   ├── pet.json                      # Backend test data for pet-related operations
│   │   │   ├── vetData.json                  # Backend test data for veterinarians-related operations  
│   │   │   └── visits.json                   # Backend test data for visits
│   │   │
│   │   └── frontend
│   │       ├── owner.json                    # Frontend test data for owner-related operations
│   │       ├── pet.json                      # Frontend test data for pet-related operations
│   │
│   └── utils
│       └── testDataUtils.ts                  # Utility functions for processing and managing test data across tests
│
├── tests
│   ├── backend
│   │   ├── owner.spec.ts                     # Backend test case for testing owner-related API functionalities
│   │   ├── pet.spec.ts                       # Backend test case for testing pet-related API functionalities
│   │   ├── veterinarians.spec.ts             # Backend test case for testing veterinarian-related API functionalities 
│   │   └── visits.spec.ts                    # Backend test case for testing visit-related API functionalities
│   │
│   └── frontend
│       ├── homePage.spec.ts                  # Frontend test case for verifying home page UI elements and functionality
│       └── owner.spec.ts                     # Frontend test case for testing owner management functionality
│       └── pet.spec.ts                       # Frontend test case for testing pet functionality
│
├── docker-compose.yml                        # Docker Compose file to set up and run Spring Petclinic app
├── ManualTestCases.md                        # Manual test cases for validating Spring Pet Clinic application functionality
├── openapi.yml                               # OpenAPI (Swagger) specification for the API used by the Spring Petclinic app
├── package.json                              # Node.js project configuration file, including dependencies and scripts
├── playwright.config.ts                      # Configuration file for Playwright tests (test setup, timeouts, browser settings, etc.)
├── tsconfig.json                             # TypeScript configuration file for compiling TypeScript to JavaScript
└── README.md                                 # Documentation for the project (setup, usage, test instructions, etc.)   
</pre>

### Test Scripts

- Frontend Tests: These tests check the user interface and interactions on the web application. They cover critical functionalities such as navigating the home page, searching and adding new owners or pets.

You can find these tests in the `tests/frontend/ directory`

- Backend Tests: The backend tests include API tests for verifying the response and status code.

They are located in the `tests/backend/ directory`

### Installation

#### Prerequisites

Before getting started, make sure the following tools are installed on your machine:

- Node.js: This is essential to run JavaScript and TypeScript code, as well as install the necessary packages.
- Git: You will need Git for version control to clone the project repository and manage changes.
- Docker: You will need Docker to run the Spring Petclinic application locally.

### Steps to Install

- Clone the repository: Using git command `git clone gitProjectURL`
- Install dependencies: Run `npm install` in order to install all required packages and dependencies.

### Running Test

Once you have the project set up, here’s how you can run it.

- Run docker service: First run the the Spring Petclinic application, run: `docker compose up` and wait until the application is fully up and accessible at http://localhost:8080
- Run the tests: To execute all the Playwright tests from project, run: `npx playwright test` this will run all the tests defined in the tests/ directory.
- Running a specific test file: `npx playwright test homePage.spec.ts` this will run all the tests defined in the home.spec.ts file.
- Running a specific test case with title: `npx playwright test -g "Home Page Elements Visibility"` this will the test thave have title 'Home Page Elements Visibility' .
- Running a specific test in debug mode: `PWDEBUG=Console npx playwright test -g "Search and view an existing owner with the last name"` this will run the test in debug mode.
- View HTML Test Report: After running tests, you can view the detailed HTML report with: `npx playwright show-report`

### Accessing Test Reports

After each GitHub Actions workflow run, the Playwright test reports are uploaded as artifacts. Follow the steps below to access them:

- Go to the Actions tab in the GitHub repository.
- Click on the relevant workflow run.
- At the bottom of the workflow, under the Artifacts section, you will find:
  - `backend-tests-report` — Report for backend test results.
  - `frontend-tests-report` — Report for frontend test results.
- Click on the desired artifact to download it as a .zip file.
- Extract the zip and open index.html to view the full test report in your browser.

### Playwright Configuration

The core configuration of Playwright is defined in the playwright.config.ts file. It includes settings such as:

- Test Timeouts: Specifies how long a test can run before being considered as failed due to timeout.
- Retries: Configures how many times a test should be retried if it fails.
- Browser Settings: Defines which browsers the tests will run in, along with other browser-related options like headless mode.

You can modify this file to adjust the test environment according to your needs.

### CI/ Integration

This project employs GitHub Actions to automatically run tests whenever code is pushed to the repository. The CI configuration is located in the `.github/workflows/` directory. Here’s how the process works:

- Whenever new code is committed to the repository or a pull request is made, the GitHub Actions workflow triggers automatic test execution. This ensures immediate feedback on code quality, preventing potential bugs from being merged into the main codebase.
- Tests run in a headless browser on the CI server, ensuring the code doesn’t break any functionality.
- Test results, including screenshots and videos, are stored as artifacts for review.

### Managing Test Data

All input data used for API-based and frontend test scenarios is maintained in a structured way to ensure reusability and separation of concerns.

- Test data is stored in the `src/testdata/ directory`.
- The data is loaded into tests via import statements.
- This approach makes it easy to manage and update payloads without modifying the test logic.

### Reports and Manual Test Cases

This project includes both automated and manual testing documentation:

##### Manual Test Cases
- All manual test scenarios are written and maintained in markdown format for easy visibility.
- You can find them here: [Manual Test Cases](./ManualTestCases.md)

##### Reports

Located in the `reports/` directory:
- [OverAll Evaluation Report](./reports/OverAllEvaluationReport.md)
Summary of the testing efforts including test selection, key findings, issues observed, and recommendations.

- [Bug Report](./reports/BugReport.md)
List of defects and inconsistencies found during testing with severity and status.

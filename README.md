# Github Issues Explorer

**Explore GitHub repositories and view their issues in one web app.**

## App Features

- **Repository Browsing**: List of open repositories, sorted by descending stargazer counts.
- **Issue Viewing**: Detailed view of repository issues, sorted by creation date.

## Project Features

- **Pagination**: Paginated results for both repository listings and issue details.
- **Continuous Integration (CI)**: Includes running tests, linting, and format checks on every pull request.
- **Continuous Deployment (CD)**: Automated deployment pipeline using Netlify.

## Key Technologies

Key packages and technologies used in this project:

- [Angular](https://angular.io/) • [v17](<(https://blog.angular.io/introducing-angular-v17-4d7033312e4b)>) - The core framework.
- [Angular Material](https://material.angular.io/) - For UI components.
- [Akita](https://opensource.salesforce.com/akita/docs/angular/architecture) - State management solution.

## Live Demo

Check out the live app: [Github Issue Explorer](https://github-issue-explorer-tj.netlify.app/)

## Getting Started

Follow these instructions to set up the app locally.

### Prerequisites

Install these on your local machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/) (includes [npm](http://npmjs.com))

### Cloning the Repository

Make sure you have access to the repo, then clone it:

```bash
git clone https://github.com/Talha-Jamil-TJ/github-issue-explorer.git
```

### Installing Dependencies

Install all necessary dependencies:

```bash
npm install
```

### Running the Development Server

Launch the development server:

```bash
npm run start
# or nx serve
```

_Navigate to [`http://localhost:4200/`](http://localhost:4200/). The app will auto-reload when source files change._

### Building the App

To build the project:

```bash
npm run build
# or nx build
```

Build artifacts will be in the `dist/` directory.

### Running Unit Tests

Execute unit tests with:

```bash
 npm run test
 # or nx test
```

## Branch Structure

Overview of the branch organization:

- `master`: Latest stable changes.

### Component and service with Unit Tests

- TokenFormComponent
- TokenService

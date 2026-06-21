# Contributing

## How to contribute
1. Fork or clone the repository.
2. Create a feature branch.
3. Make focused, well-tested changes.
4. Open a pull request with a clear summary.

## Setup
- Install dependencies with `npm install`.
- Start the dev server with `npm start`.
- Build with `npm run build`.
- Run tests with `npm test -- --watchAll=false`.

## Code style guidelines
- Use ES module imports in source files.
- Keep components small and focused.
- Prefer surgical changes over broad refactors.
- Reuse existing CSS patterns in `src/App.css`.
- Avoid adding external dependencies unless absolutely necessary.

## Testing
- Add Jest tests for new utilities and behavior.
- Follow the existing `src/utils/crypto.test.js` structure for utility tests.
- Verify the app still builds before opening a PR.

## Pull request process
- Describe the problem and the solution.
- Include screenshots or recordings for UI changes when helpful.
- Note any security-sensitive behavior changes.
- Ensure tests and build checks pass.

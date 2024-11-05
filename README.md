# NutriWell

A nutrition management system built with Next.js, Payload CMS, and TypeScript.

## Prerequisites

- Node.js ^18.20.2 || >=20.9.0
- pnpm (recommended) or npm
- SQLite (for development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nutri-well
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   ```env
   PAYLOAD_SECRET=your-secret-key
   DATABASE_URI=sqlite://nutri-well.db
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. Generate required types:
   ```bash
   npm run generate:types
   ```

5. Run database migrations:
   ```bash
   npm run payload migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Development Scripts

## Contributing

### Development Workflow

1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with..."
   git commit -m "docs: update documentation"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (Prettier and ESLint configurations)
- Write meaningful commit messages following conventional commits
- Add appropriate documentation for new features
- Ensure all tests pass before submitting a PR

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update any relevant documentation
3. Make sure your code follows the existing style conventions
4. Include a clear description of the changes in your PR
5. Link any related issues in your PR description

## License

This project is licensed under the MIT License.
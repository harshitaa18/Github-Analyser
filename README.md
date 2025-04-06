# GitHub Profile Analyzer

## Technologies Used

- React for frontend
- TypeScript for type safety
- ShadCN UI for components
- GitHub REST API for data

## Setup Instructions

### Installation

1. Clone the repository or extract the ZIP file
```bash
git clone https://github.com/ksingh-08/Github-Analyzer.git # If cloning from repository
# OR
# Extract the ZIP file to a directory of your choice
```

2. Navigate to the project directory
```bash
cd githubtask
```

3. Install dependencies
```bash
npm install
# OR
yarn install
```

4. Start the development server
```bash
npm run dev
# OR 
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# OR
yarn build
```

The build will be available in the `dist` directory.
## Setup GitHub Token (Recommended)

To avoid GitHub API rate limiting and access more detailed user data:

1. Go to [GitHub Developer Settings](https://github.com/settings/tokens)
2. Generate a **Personal Access Token** with **public_repo** access
3. In the `.env` file in the root of your project:
4. VITE_GITHUB_TOKEN=your_token_here


## Deployment

You can deploy this application to any static site hosting service like Vercel, Netlify, GitHub Pages, etc.

Example deployment with Vercel:

1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

2. Run the deploy command
```bash
vercel
```

3. Follow the prompts to complete deployment



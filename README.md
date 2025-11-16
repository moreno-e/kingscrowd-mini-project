# Kingscrowd Deals Dashboard

A Nuxt 3 application for viewing and managing active investment deals.

## Project Overview

This application displays a paginated table of active Reg CF and Reg A+ investment deals with filtering, loading/error states, and CSV export functionality. The API key is secured server-side through Nuxt API routes, and data is cached for performance for 1 hour. 

### Tradeoffs 
Tradeoffs include using a custom pagination component to avoid hydration issues and server-side caching (1 hour) which may show stale data. Could update api to fetch all the data at once rather than on each page request. Retrieve the first page then call the remaining pages.

### Next Steps 
Next steps would include:
- Adding unit tests
- Implementing proper error logging/monitoring
- Adding input/param validation via api validator
- Extracting more logic into a reusable composable.
- Update api to handle / check for rate limit and token amount
- Update url to show current page. Enable user to copy and paste to go to specific page.

### AI Tools Used - Claude AI

Ran into issues implementing the UPagination with the v-model not updating the current page whenever a new page was selected. Spent more time than I would have liked attempting to fix the issue. Asked Claude to help create pagination functionality for time. Also asked to review project to ensure proper styling and accessibility was applied. As well as ensure CSV implementation was correct.

### Possible API Bug?
- Getting 404 for api health status.

## Images

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
KINGSCROWD_API_TOKEN=your_api_token
KINGSCROWD_DEALS_API_URL=your_deals_api_url
KINGSCROWD_API_HEALTH_URL=your_health_api_url
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production

Build for production:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

## Additional Commands

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

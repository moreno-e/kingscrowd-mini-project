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
- API docs have some formatting issues
- Noticed when calling the last page of the results the total_pages amount changes to a different number. Possible user error but would like to investigate further
Page 1:
<img width="849" height="714" alt="Screenshot 2025-11-16 at 4 36 47 PM" src="https://github.com/user-attachments/assets/112d4377-3874-42ef-807b-1dbf3f5c5bb9" />
Page 2:
<img width="840" height="621" alt="Screenshot 2025-11-16 at 4 36 28 PM" src="https://github.com/user-attachments/assets/c62afad1-d4ad-45df-bb0f-8e09be77905d" />


## Image Of Dashboard (Not full screen)
<img width="1376" height="731" alt="Screenshot 2025-11-16 at 4 49 45 PM" src="https://github.com/user-attachments/assets/981518b9-6d19-40d9-a90a-7c7ebf30057b" />


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

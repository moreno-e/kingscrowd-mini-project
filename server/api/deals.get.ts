import type { DealsResponse } from '../types/deals';
import { ApiResponse, HTTP_STATUS_CODES } from '../types/api';

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const page = Number(query.page) || 1;

    const filters = [
      {
        key: 'raise_status',
        symbol: '=',
        value: ['Active'],
      },
      {
        key: 'category_group_1',
        symbol: '=',
        value: ['RegCF', 'RegA+'],
      },
    ];

    try {
      const config = useRuntimeConfig();

      const dealsResponse: DealsResponse = await $fetch(
        `${config.kingscrowdDealsApiUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${config.kingscrowdApiToken}`,
            Accept: 'application/json',
          },
        },
      );

      if (dealsResponse.data && dealsResponse.status.status_code === HTTP_STATUS_CODES.OK) {
        const apiResponse: ApiResponse<DealsResponse> = createApiResponse(dealsResponse);

        return apiResponse;
      } else {
        return handleApiError(
          dealsResponse.status,
          dealsResponse.status.error_message,
          dealsResponse.status.status_code,
        );
      }
    } catch (error) {
      return handleApiError(error, 'Deals API', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    getKey: (event) => {
      const query = getQuery(event);
      return `deals-page-${query.page || 1}`; // Unique key per page
    },
  },
);

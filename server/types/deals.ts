// documentation shows ending with two arrays should be object ending
// timestamp off
export interface DealsResponse {
  data: {
    count: number;
    total_count: number;
    total_pages: number;
    current_page: number;
    result: DealsResults[];
  };
  status: DealStatus;
}

// data about each organization's captial funding rounds via
// RegCF or RegA (company may have multiple deals)
export interface DealsResults {
  id: number;
  name: string;
  funding_gather_money_raised_to_date: MoneyRaisedToDate;
  company_id: CompanyId;
  raise_status: RaiseStatus;
  platform_id: {
    id: number;
    name: string;
  };
  close_date: string;
}

export interface MoneyRaisedToDate {
  raw: string;
  usd: string;
  formatted: string;
  fiat: {
    name: string;
    sign: string;
    symbol: string;
  };
}

export interface CompanyId {
  id: number;
  name: string;
}
export interface RaiseStatus {
  id: string;
  name: string;
  slug: string;
  parent_category_id: string;
}

// timestamp def off, extra "?
export interface DealStatus {
  timestamp: string;
  status_code: number; // should make type HTTP Status Code
  error_message: string | null;
  credit_cost: number;
  credits_remaining: number;
}

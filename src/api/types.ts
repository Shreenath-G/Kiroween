// API Testing Types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiEndpoint {
  id: string;
  name: string;
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: string;
  description?: string;
}

export interface ApiCollection {
  name: string;
  baseUrl?: string;
  endpoints: ApiEndpoint[];
  auth?: AuthConfig;
  variables?: Record<string, string>;
}

export interface AuthConfig {
  type: 'bearer' | 'basic' | 'apikey' | 'none';
  token?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  apiKeyHeader?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  duration: number;
  timestamp: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  isTimeout?: boolean;
}

export interface RequestHistory {
  endpointId: string;
  request: {
    method: HttpMethod;
    url: string;
    headers?: Record<string, string>;
    body?: string;
  };
  response?: ApiResponse;
  error?: ApiError;
  timestamp: number;
}

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiEndpoint, ApiResponse, ApiError, AuthConfig } from './types';

export class ApiClient {
  private timeout = 10000; // 10 seconds

  async makeRequest(
    endpoint: ApiEndpoint,
    auth?: AuthConfig,
    variables?: Record<string, string>
  ): Promise<{ response?: ApiResponse; error?: ApiError }> {
    const startTime = Date.now();

    try {
      // Replace variables in URL
      let url = endpoint.url;
      if (variables) {
        Object.entries(variables).forEach(([key, value]) => {
          url = url.replace(`{{${key}}}`, value);
        });
      }

      // Build headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...endpoint.headers,
      };

      // Add authentication
      if (auth) {
        this.addAuth(headers, auth);
      }

      // Build request config
      const config: AxiosRequestConfig = {
        method: endpoint.method,
        url,
        headers,
        timeout: this.timeout,
      };

      // Add body for POST/PUT/PATCH
      if (endpoint.body && ['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        try {
          config.data = JSON.parse(endpoint.body);
        } catch {
          config.data = endpoint.body;
        }
      }

      // Make request
      const axiosResponse = await axios(config);
      const duration = Date.now() - startTime;

      const response: ApiResponse = {
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: axiosResponse.headers as Record<string, string>,
        data: axiosResponse.data,
        duration,
        timestamp: Date.now(),
      };

      return { response };
    } catch (err) {
      const error = this.handleError(err as AxiosError);
      
      return { error };
    }
  }

  private addAuth(headers: Record<string, string>, auth: AuthConfig): void {
    switch (auth.type) {
      case 'bearer':
        if (auth.token) {
          headers['Authorization'] = `Bearer ${auth.token}`;
        }
        break;
      case 'basic':
        if (auth.username && auth.password) {
          const encoded = btoa(`${auth.username}:${auth.password}`);
          headers['Authorization'] = `Basic ${encoded}`;
        }
        break;
      case 'apikey':
        if (auth.apiKey && auth.apiKeyHeader) {
          headers[auth.apiKeyHeader] = auth.apiKey;
        }
        break;
    }
  }

  private handleError(err: AxiosError): ApiError {
    if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
      return {
        message: 'Request timeout',
        code: err.code,
        isTimeout: true,
      };
    }

    if (err.response) {
      return {
        message: err.response.statusText || 'Request failed',
        status: err.response.status,
        code: err.code,
      };
    }

    return {
      message: err.message || 'Network error',
      code: err.code,
    };
  }

  setTimeout(ms: number): void {
    this.timeout = ms;
  }
}

export const apiClient = new ApiClient();

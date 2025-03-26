/**
 * Interface for configuration options for the API client in constructor.
 */
export interface ApiClientOptions {
    baseUrl?: string;
    timeout?: number;
    defaultHeaders?: Record<string, string>;
    apiName: string;
}

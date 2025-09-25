// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Models extends APIResource {
  /**
   * Get environment's available model metadata
   */
  retrieve(modelID: string, options?: RequestOptions): APIPromise<ModelResponse> {
    return this._client.get(path`/models/${modelID}`, options);
  }

  /**
   * Get environment's available model list metadata
   */
  list(options?: RequestOptions): APIPromise<ModelsResponse> {
    return this._client.get('/models', options);
  }
}

/**
 * model metadata
 */
export interface ModelResponse {
  /**
   * model id
   */
  id: string;

  /**
   * model context length
   */
  context_length?: number;

  /**
   * model max completion tokens
   */
  max_completion_tokens?: number;

  /**
   * type
   */
  object?: 'model';

  /**
   * model owner
   */
  owned_by?: string;

  /**
   * pricing details
   */
  pricing?: ModelResponse.Pricing;

  /**
   * additional sn metadata
   */
  sn_metadata?: unknown;

  [k: string]: unknown;
}

export namespace ModelResponse {
  /**
   * pricing details
   */
  export interface Pricing {
    /**
     * price per completion token in USD
     */
    completion?: number;

    /**
     * price per input hour
     */
    duration_per_hour?: number | null;

    /**
     * price per prompt token in USD
     */
    prompt?: number;
  }
}

/**
 * object containing available models and metadata
 */
export interface ModelsResponse {
  /**
   * array of model metadata list
   */
  data: Array<ModelResponse>;

  object?: 'list';

  [k: string]: unknown;
}

export declare namespace Models {
  export { type ModelResponse as ModelResponse, type ModelsResponse as ModelsResponse };
}

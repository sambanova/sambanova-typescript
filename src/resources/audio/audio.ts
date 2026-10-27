// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TranscriptionsAPI from './transcriptions';
import { TranscriptionCreateParams, TranscriptionResponse, Transcriptions } from './transcriptions';
import * as TranslationsAPI from './translations';
import { TranslationCreateParams, TranslationResponse, Translations } from './translations';

export class Audio extends APIResource {
  transcriptions: TranscriptionsAPI.Transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
  translations: TranslationsAPI.Translations = new TranslationsAPI.Translations(this._client);
}

/**
 * A segment of transcribed or translated text. Timings are exact at audio chunk
 * boundaries and interpolated within a chunk. `tokens`, `avg_logprob`,
 * `compression_ratio` and `no_speech_prob` are always empty or zero.
 */
export interface TranscriptionSegment {
  /**
   * Index of the segment.
   */
  id: number;

  /**
   * Average logprob of the segment. Always zero.
   */
  avg_logprob: number;

  /**
   * Compression ratio of the segment. Always zero.
   */
  compression_ratio: number;

  /**
   * End time of the segment in seconds.
   */
  end: number;

  /**
   * Probability of no speech in the segment. Always zero.
   */
  no_speech_prob: number;

  /**
   * Seek offset of the segment.
   */
  seek: number;

  /**
   * Start time of the segment in seconds.
   */
  start: number;

  /**
   * Temperature parameter used to generate the segment.
   */
  temperature: number;

  /**
   * Text content of the segment.
   */
  text: string;

  /**
   * Token IDs of the text content. Always empty.
   */
  tokens: Array<number>;

  [k: string]: unknown;
}

Audio.Transcriptions = Transcriptions;
Audio.Translations = Translations;

export declare namespace Audio {
  export { type TranscriptionSegment as TranscriptionSegment };

  export {
    Transcriptions as Transcriptions,
    type TranscriptionResponse as TranscriptionResponse,
    type TranscriptionCreateParams as TranscriptionCreateParams,
  };

  export {
    Translations as Translations,
    type TranslationResponse as TranslationResponse,
    type TranslationCreateParams as TranslationCreateParams,
  };
}

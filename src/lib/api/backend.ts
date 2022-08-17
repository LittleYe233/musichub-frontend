/**
 * @file backend.ts
 * @description Utility to connect with back-end of this project.
 */

import type IBackendAPI from 'src/types/api/backend';
import type { ProjectConfig, ServerConfig, SongPiece } from 'src/types/config';
import { projectConfig } from '../config';

export const ENDPOINT_PATHS: Record<string, string> = {
  getSongs: '/rest/get-config/songs',
};

export const DEFAULT_SONG_PIECE: SongPiece = {
  name: '<Song Name>',
  artist: '<Song Artist>',
  album: '<Song Album>',
  url: null,
  cover_art_url: new URL('default_cover.jpg', projectConfig.client.root).href,
  lrc: null,
};

/**
 * Class of back-end APIs.
 */
export default class BackendAPI implements IBackendAPI {
  /**
   * Root URL of API entrypoints.
   * @default 'http://localhost:8083'
   */
  root: string = 'http://localhost:8083';

  constructor(config: ServerConfig | ProjectConfig) {
    if ('server' in config) {
      // config is an instance of ProjectConfig.
      config = config.server as ServerConfig;
    }

    // bind property values to instance
    this.root = config.root ?? this.root;
  }

  /**
   * Parses the endpoint with path fragment.
   * @param endpoint Path of endpoint.
   * @param options An object with `root` property of the root URL.
   * @returns The target full URL to the endpoint.
   * @throws `ReferenceError` when endpoint is undefined in built-in list.
   */
  public static parseEndpoint(endpoint: string, options?: { root: string }): string {
    if (!(endpoint in ENDPOINT_PATHS)) {
      throw ReferenceError(`endpoint ${endpoint} is undefined`);
    }

    return new URL(ENDPOINT_PATHS[endpoint], options.root).href;
  }

  /**
   * Parses the endpoint with path fragment.
   * @param endpoint Path of endpoint.
   * @returns The target full URL to the endpoint.
   * @throws `ReferenceError` when endpoint is undefined in built-in list.
   */
  parseEndpoint(endpoint: string): string {
    if (!(endpoint in ENDPOINT_PATHS)) {
      throw ReferenceError(`endpoint ${endpoint} is undefined`);
    }

    return new URL(ENDPOINT_PATHS[endpoint], this.root).href;
  }

  /******************
   * API implements *
   ******************/
  /**
   * Implements `getSongs` endpoint.
   * @returns A promise which resolves to an array of `SongPiece` when HTTP request status is ok, else a `Response`.
   */
  async getSongs(): Promise<SongPiece[] | Response> {
    const resp = await fetch(this.parseEndpoint('getSongs'), {
      headers: {
        'Content-Type': 'application/json',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    });

    return resp.status === 200 ? await resp.json() : resp;
  }

  parseSongs(songs: SongPiece[]): SongPiece[] {
    // override the default values
    return songs.map((v) => ({
      id: v.id || DEFAULT_SONG_PIECE.id,
      name: v.name || DEFAULT_SONG_PIECE.name,
      artist: v.artist || DEFAULT_SONG_PIECE.artist,
      album: v.album || DEFAULT_SONG_PIECE.album,
      url: v.url || DEFAULT_SONG_PIECE.url,
      cover_art_url: v.cover_art_url || DEFAULT_SONG_PIECE.cover_art_url,
      lrc: v.lrc || DEFAULT_SONG_PIECE.lrc,
    }));
  }
}

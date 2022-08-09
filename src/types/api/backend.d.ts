import type BackendAPI from 'src/lib/api/backend';
import type { SongPiece } from '../config';

export default interface IBackendAPI {
  /**
   * Root URL of API entrypoints.
   */
  root: string;

  public static parseEndpoint(endpoint: string, options?: { root: string }): string;
  parseEndpoint(endpoint: string): string;

  getSongs(): Promise<SongPiece[] | Response>;
}

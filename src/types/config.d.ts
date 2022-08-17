export interface ClientConfig {
  host: string;
  port: number;
  strictPort: boolean;
  root: string;
}

export interface ServerConfig {
  root: string;
}

export interface RawProjectConfig {
  client?: Partial<ClientConfig>;
  server?: Partial<ServerConfig>;
}

export interface ProjectConfig {
  client: ClientConfig;
  server: ServerConfig;
}

/**
 * Declaration of interface for one piece of songs.
 */
export interface SongPiece {
  /** ID of the song (in a song list). */
  id?: number;
  /** Name of the song. */
  name: string | null;
  /** String or array of the artists. */
  artist: string[] | string | null;
  /** Name of the album. */
  album: string | null;
  /** Relative or absolute URL of the media file. */
  url: string;
  /** Path of the album cover image. */
  cover_art_url: string | null;
  /** Path of the lyric file (should be SRT). */
  lrc: string | null;
}

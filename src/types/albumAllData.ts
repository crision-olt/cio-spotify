import type { Album } from './album';
import type { ArtistByAlbumId } from './artistByAlbumId';
import type { Song } from './song';

export type AlbumAllData = Album & {
  artists: ArtistByAlbumId[];
  songs: Song[];
};

import type { Album } from './album';
import type { ArtistByAlbumId } from './artistByAlbumId';

export type AlbumWithArtists = Album & {
  artists: ArtistByAlbumId[];
};

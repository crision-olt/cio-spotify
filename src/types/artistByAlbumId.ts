import type { Artist } from './artist';

export type ArtistByAlbumId = Artist & {
  albumId: string;
};

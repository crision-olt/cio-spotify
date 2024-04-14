import { db, eq, Artist, AlbumArtists, inArray } from 'astro:db';

import type { Result } from '#types/result.js';
import type { ArtistByAlbumId } from '#types/artistByAlbumId.js';

const artistSelect = () => ({
  id: Artist.id,
  name: Artist.name,
  cover: Artist.cover,
  albumId: AlbumArtists.albumId,
});

const unknownError = { message: 'An unknown error occurred', status: 500 };

export const getArtistsByAlbumIds = async (ids: string[]): Promise<Result<ArtistByAlbumId[]>> => {
  try {
    const artistsQuery = await db
      .select(artistSelect())
      .from(Artist)
      .innerJoin(AlbumArtists, eq(Artist.id, AlbumArtists.artistId))
      .where(inArray(AlbumArtists.albumId, ids));
    return [artistsQuery, undefined];
  } catch (error: unknown) {
    return [undefined, [unknownError]];
  }
};

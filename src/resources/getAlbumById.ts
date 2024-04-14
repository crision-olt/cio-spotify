import { db, eq, Album } from 'astro:db';

import type { AlbumAllData } from '#types/albumAllData.js';
import type { Result } from '#types/result.js';
import { getAlbumSongsWithArtist } from './getAlbumSongsWithArtist';
import { getArtistsByAlbumIds } from './getArtistsByAlbumIds';
import { nonNullish } from '#utils/nonNullish.js';
import type { DBError } from '#types/dbError.js';

const albumSelect = () => ({
  id: Album.id,
  title: Album.title,
  cover: Album.cover,
  color: Album.color,
});

const notFound: DBError = { message: 'Album not found', status: 404 };
const albumIdRequired: DBError = { message: 'Album ID is required', status: 400 };
const unknownError: DBError = { message: 'An unknown error occurred', status: 500 };

export const getAlbumById = async (id: string | undefined): Promise<Result<AlbumAllData>> => {
  if (!id) {
    return [undefined, [albumIdRequired]];
  }
  try {
    const albumQuery = db.select(albumSelect()).from(Album).where(eq(Album.id, id));

    const artistsQuery = getArtistsByAlbumIds([id]);

    const songsQuery = getAlbumSongsWithArtist(id);

    const [[album], [artists, artistsError], [songs, songsError]] = await Promise.all([
      albumQuery,
      artistsQuery,
      songsQuery,
    ]);
    const checkErrors = [];

    !album && checkErrors.push(notFound);
    artistsError && checkErrors.concat(artistsError);
    songsError && checkErrors.concat(songsError);

    const errors = checkErrors.filter(nonNullish);

    if (errors.length) {
      return [undefined, errors];
    }

    return [
      {
        ...album,
        artists: artists ?? [],
        songs: songs ?? [],
      },
      undefined,
    ];
  } catch (error: unknown) {
    return [undefined, [unknownError]];
  }
};

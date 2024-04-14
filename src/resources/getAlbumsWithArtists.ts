import { db, Album } from 'astro:db';

import type { AlbumWithArtists } from '#types/albumWithArtists.js';
import { getArtistsByAlbumIds } from './getArtistsByAlbumIds';
import type { Result } from '#types/result.js';

const unknownError = { message: 'An unknown error occurred', status: 500 };

export const getAlbumsWithArtists = async (): Promise<Result<AlbumWithArtists[]>> => {
  try {
    const select = {
      id: Album.id,
      title: Album.title,
      cover: Album.cover,
      color: Album.color,
    };

    const albumsResult = await db.select(select).from(Album).all();

    const [artists, artistsError] = await getArtistsByAlbumIds(
      albumsResult.map((album) => album.id),
    );

    if (artistsError) {
      return [undefined, artistsError];
    }
    const albums = albumsResult.map((album) => {
      return {
        ...album,
        artists: artists.filter((artist) => artist.albumId === album.id),
      };
    });

    return [albums, undefined];
  } catch (error: unknown) {
    return [undefined, [unknownError]];
  }
};

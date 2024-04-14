import type { DBError } from '#types/dbError.js';
import type { Result } from '#types/result.js';
import type { SongWithArtists } from '#types/songWithArtists.js';
import { db, eq, inArray, Artist, Song, SongArtists } from 'astro:db';

const songSelect = () => ({
  id: Song.id,
  title: Song.title,
  albumId: Song.albumId,
  image: Song.image,
  duration: Song.duration,
});

const artistSelect = () => ({
  id: Artist.id,
  name: Artist.name,
  cover: Artist.cover,
  songId: SongArtists.songId,
});

const albumIdRequired: DBError = { message: 'Album ID is required', status: 400 };
const unknownError: DBError = { message: 'An unknown error occurred', status: 500 };

export const getAlbumSongsWithArtist = async (
  albumId: string | undefined,
): Promise<Result<SongWithArtists[]>> => {
  if (!albumId) {
    return [undefined, [albumIdRequired]];
  }
  try {
    const songs = await db.select(songSelect()).from(Song).where(eq(Song.albumId, albumId));

    const artists = await db
      .select(artistSelect())
      .from(Artist)
      .innerJoin(SongArtists, eq(Artist.id, SongArtists.artistId))
      .innerJoin(Song, eq(Song.id, SongArtists.songId))
      .where(
        inArray(
          SongArtists.songId,
          songs.map((song) => song.id),
        ),
      )
      .groupBy(SongArtists.songId);

    const result = songs.map((song) => {
      return {
        ...song,
        artists: artists.filter((artist) => artist.songId === song.id),
      };
    });

    return [result, undefined];
  } catch (error: unknown) {
    return [undefined, [unknownError]];
  }
};

import { db, eq, Album, Artist, Song, SongArtists } from 'astro:db';

import type { AlbumWithArtists } from '#types/albumWithArtists.js';

export const getAlbumsWithArtists = async (): Promise<AlbumWithArtists[]> => {
  const select = {
    id: Album.id,
    title: Album.title,
    cover: Album.cover,
    color: Album.color,
    artist: Artist.name

  }

  const result = await db
    .select(select)
    .from(Album)
    .groupBy(Album.id)
    .innerJoin(Song, eq(Album.id, Song.albumId))
    .innerJoin(SongArtists, eq(Song.id, SongArtists.songId))
    .innerJoin(Artist, eq(SongArtists.artistId, Artist.id));

  return result;
};

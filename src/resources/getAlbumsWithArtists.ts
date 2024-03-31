import { db, eq, Album, Artist, Song, SongArtists } from 'astro:db';

import type { AlbumWithArtists } from '#types/albumWithArtists.js';
import { uniqueElements } from '#utils/uniqueElements.js';


export const getAlbumsWithArtists = async (): Promise<AlbumWithArtists[]> => {
    const result = await db
  .select()
  .from(Album)
  .innerJoin(Song, eq(Album.id, Song.albumId))
  .innerJoin(SongArtists, eq(Song.id, SongArtists.songId))
  .innerJoin(Artist, eq(SongArtists.artistId, Artist.id))
  .all();
  const albums = uniqueElements(result.map(({ Album, Artist})=> ({...Album, artists: [Artist.name]})), ['id']);
  return albums;
};

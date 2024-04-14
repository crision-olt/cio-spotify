import { defineDb, defineTable, column } from 'astro:db';

export const Album = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    color: column.text(),
    cover: column.text(),
  },
  indexes: {
    albumId: { on: ['id'], unique: true },
  },
});

export const Artist = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    cover: column.text(),
  },
  indexes: {
    artistId: { on: ['id'], unique: true },
  },
});

export const Song = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    albumId: column.text(),
    image: column.text(),
    duration: column.number(),
  },
  indexes: {
    songId: { on: ['id'], unique: true },
  },
  foreignKeys: [
    {
      columns: 'albumId',
      references: () => Album.columns.id,
    },
  ],
});

export const AlbumArtists = defineTable({
  columns: {
    albumId: column.text(),
    artistId: column.text(),
  },
  foreignKeys: [
    {
      columns: 'albumId',
      references: () => Album.columns.id,
    },
    {
      columns: 'artistId',
      references: () => Artist.columns.id,
    },
  ],
});

export const SongArtists = defineTable({
  columns: {
    songId: column.text(),
    artistId: column.text(),
  },
  foreignKeys: [
    {
      columns: 'songId',
      references: () => Song.columns.id,
    },
    {
      columns: 'artistId',
      references: () => Artist.columns.id,
    },
  ],
});

export default defineDb({
  tables: { Album, Artist, Song, SongArtists, AlbumArtists },
});

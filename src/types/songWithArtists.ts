import type { Artist } from './artist';
import type { Song } from './song';

export type SongWithArtists = Song & {
  artists: Artist[];
};

import { db, Album, Artist, Song, SongArtists } from 'astro:db';

const imageAlbums = [
    'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    'https://f4.bcbits.com/img/a1435058381_65.jpg'
];

const imageArtists = [
    'https://tracktribe.com/assets/images/artist/otis_mcdonald_list_image.png',
    'https://tracktribe.com/assets/images/artist/gunnar_olsen_list_image.png', 
    'https://tracktribe.com/assets/images/artist/silent_partner_list_image.png'
];

export default async function seed() {
    await db.insert(Album).values([
        {id: '1', title: 'Learning Side', color: 'dark', cover: imageAlbums[0]},
        {id: '2', title: 'Chill Side', color: 'blue', cover: imageAlbums[1]},
        {id: '3', title: 'Deep Side', color: 'red', cover: imageAlbums[2]},
    ]);
    await db.insert(Artist).values([
        {id: '1', name: 'Track Tribe', cover: imageArtists[0]},
        {id: '2', name: 'Quincas Moreira', cover: imageArtists[1]},
        {id: '3', name: 'Freedom Trail Studio', cover: imageArtists[2]},
    ]);
    await db.insert(Song).values([
        {id: '1', title: 'No indication', albumId: '1', image: imageAlbums[0], duration: 90},
        {id: '2', title: 'Little umbrellas', albumId: '1', image: imageAlbums[0], duration: 163},
        {id: '3', title: 'Sweethearts', albumId: '1', image: imageAlbums[0], duration: 222},
        {id: '4', title: 'Limousines', albumId: '1', image: imageAlbums[0], duration: 421},
        {id: '5', title: 'Lazy Laura', albumId: '2', image: imageAlbums[1], duration: 259},
        {id: '6', title: 'Funky carioca', albumId: '2', image: imageAlbums[1], duration: 182},
        {id: '7', title: 'Nature nurture', albumId: '2', image: imageAlbums[1], duration: 213},
        {id: '8', title: 'La docerola', albumId: '2', image: imageAlbums[1], duration: 230},
        {id: '9', title: 'Putting on the ritz', albumId: '3', image: imageAlbums[2], duration: 382},
        {id: '10', title: 'Take me out to the ballgame', albumId: '3', image: imageAlbums[2], duration: 462},
        {id: '11', title: 'Thou swell', albumId: '3', image: imageAlbums[2], duration: 205},
        {id: '12', title: 'When irish eyes are smiling', albumId: '3', image: imageAlbums[2], duration: 228},
    ]);
    await db.insert(SongArtists).values([
        {songId: '1', artistId: '1'},
        {songId: '2', artistId: '1'},
        {songId: '3', artistId: '1'},
        {songId: '4', artistId: '1'},
        {songId: '5', artistId: '2'},
        {songId: '6', artistId: '2'},
        {songId: '7', artistId: '2'},
        {songId: '8', artistId: '2'},
        {songId: '9', artistId: '3'},
        {songId: '10', artistId: '3'},
        {songId: '11', artistId: '3'},
        {songId: '12', artistId: '3'},
    ]);

}

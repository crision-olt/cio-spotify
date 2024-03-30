import { db, Album, Artist, Song, SongArtists } from 'astro:db';

export default async function seed() {
    await db.insert(Album).values([
        {id: '1', title: 'The Dark Side of the Moon', color: 'dark', cover: 'dark-side-of-the-moon.jpg'},
        {id: '2', title: 'Chill Lo-Fi Music', color: 'blue', cover: "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353"},
        {id: '3', title: '', color: 'red', cover: 'https://f4.bcbits.com/img/a1435058381_65.jpg'},
    ]);
    await db.insert(Artist).values([
        {id: '1', name: 'Pink Floyd', cover: 'pink-floyd.jpg'},
        {id: '2', name: 'The Beatles', cover: 'the-beatles.jpg'},
        {id: '3', name: 'Michael Jackson', cover: 'michael-jackson.jpg'},
    ]);
    await db.insert(Song).values([
        {id: '1', title: 'Speak to Me', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 90},
        {id: '2', title: 'Breathe', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 163},
        {id: '3', title: 'On the Run', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 222},
        {id: '4', title: 'Time', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 421},
        {id: '5', title: 'The Great Gig in the Sky', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 276},
        {id: '6', title: 'Money', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 382},
        {id: '7', title: 'Us and Them', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 462},
        {id: '8', title: 'Any Colour You Like', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 205},
        {id: '9', title: 'Brain Damage', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 228},
        {id: '10', title: 'Eclipse', albumId: '1', image: 'dark-side-of-the-moon.jpg', duration: 123},
        {id: '11', title: 'Come Together', albumId: '2', image: 'abbey-road.jpg', duration: 259},
        {id: '12', title: 'Something', albumId: '2', image: 'abbey-road.jpg', duration: 182},
        {id: '13', title: 'Maxwell\'s Silver Hammer', albumId: '2', image: 'abbey-road.jpg', duration: 213},
        {id: '14', title: 'Oh! Darling', albumId: '2', image: 'abbey-road.jpg', duration: 230},
    ]);
    await db.insert(SongArtists).values([
        {songId: '1', artistId: '1'},
        {songId: '2', artistId: '1'},
        {songId: '3', artistId: '1'},
        {songId: '4', artistId: '1'},
        {songId: '5', artistId: '1'},
        {songId: '6', artistId: '1'},
        {songId: '7', artistId: '1'},
        {songId: '8', artistId: '1'},
        {songId: '9', artistId: '1'},
        {songId: '10', artistId: '1'},
        {songId: '11', artistId: '2'},
        {songId: '12', artistId: '2'},
        {songId: '13', artistId: '2'},
        {songId: '14', artistId: '2'},
    ]);

}

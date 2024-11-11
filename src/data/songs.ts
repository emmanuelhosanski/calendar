import { Song } from '../types';

export const songs: Song[] = [
  {
    id: 1,
    title: "Billie Jean",
    artist: "Michael Jackson",
    audioUrl: "/songs/day1.mp3",
    imageHint: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800",
    lyricsHint: "Je ne veux pas grand chose pour Noël..."
  },
  {
    id: 2,
    title: "Last Christmas",
    artist: "Wham!",
    audioUrl: "/songs/day2.mp3",
    imageHint: "https://images.unsplash.com/photo-1514994960127-ed3ef9239d11?w=800",
    lyricsHint: "L'année dernière, je t'ai donné mon cœur..."
  },
  // Add the rest of your songs here
];
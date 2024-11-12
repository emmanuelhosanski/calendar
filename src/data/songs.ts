import { Song } from '../types';

export const songs: Song[] = [
  {
    id: 1,
    title: "Billie Jean",
    artist: "Michael Jackson",
    audioUrl: "/songs/day1.mp3",
    imageHint: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800",
    lyricsHint: `
    Les gens m'ont toujours dit : 
    "Fais attention à ce que tu fais
    Ne brise pas le cœur des jeunes filles" (hee-hee)
    Et ma mère m'a toujours dit : 
    "Fais attention à qui tu aimes
    Et fais attention à ce que tu fais (oh-oh)
    Parce que le mensonge devient la vérité" (oh-oh), hé-hé
    
    Billie Jean n'est pas mon amante
    C'est juste une fille qui prétend que c'est moi (oh, bébé)
    Mais le gamin n'est pas mon fils (hoo)
    Elle dit que c'est moi qui suis (oh, bébé)
    Mais le gamin n'est pas mon fils (hee-hee-hee, non-non, hee-hee-hee, hoo)
    `
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
export interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  imageHint: string;
  lyricsHint: string;
}

export type Mode = 'test' | 'real';
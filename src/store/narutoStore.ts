import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { naruto } from '../assets/seasons';

type IPath = '.' | './' | string;
const forBuild = location.hostname;
const forDev = 'localhost';
export const PATH: IPath = `http://${forBuild}:8080/`;

export interface IParam {
  mediaURL: string;
  selectedEpisode: IEpisode;
}

export interface IImage {
  source: string;
}
export interface IEpisode {
  season_number?: number;
  id: string;
  title: string;
  playedSeconds: number;
  next_episode_title?: string;
  next_episode_id?: string;
  skip?: number;
  isRelleno?: boolean;
  episode: string;
  description: string;
  episode_number: number;
  images: IImage;
}
export interface ISeason {
  id: number;
  title: string;
  seasonName: string;
  seasonShort: string;
  episodesAmount: string;
  episodes: IEpisode[];
}
export interface INaruto {
  name: string;
  description: string;
  seasons: ISeason[];
}

interface NarutoStore {
  naruto: INaruto;
  videoURL: string;
  selectedEpisode: IEpisode;
  selectedSeason: ISeason;
  selectEpisode: (episode: IEpisode, videoURL: string) => void;
  savePlayedSeconds: (playedSeconds: number) => void;
  selectSeason: (season: ISeason) => void;
}

export const useNarutoStore = create<NarutoStore>()(
  persist(
    (set) => ({
      naruto,
      videoURL: `${PATH}media/${naruto.seasons[0].episodes[0].episode}.mp4`,
      selectedEpisode: naruto.seasons[0].episodes[0],
      selectedSeason: naruto.seasons[0],
      savePlayedSeconds: (playedSeconds: number) =>
        set((currentState) => {
          const naruto_ = currentState.naruto;
          const selectedEpisode = currentState.selectedEpisode;
          // to update episode also here
          //const selectedSeason = currentState.selectedSeason;

          const seasonIndex = naruto_.seasons.findIndex(
            ({ id }) => id === selectedEpisode.season_number
          );
          const episodeIndex = naruto_.seasons[seasonIndex].episodes.findIndex(
            ({ episode_number }) =>
              episode_number === selectedEpisode.episode_number
          );
          const prevEpisode =
            naruto_.seasons[seasonIndex].episodes[episodeIndex];

          const updatedEpisode = { ...prevEpisode, playedSeconds };

          // updating selected episode in selected season:
          // naruto_.seasons[seasonIndex].episodes[episodeIndex];

          // const updatedSeason = {}
          naruto_.seasons[seasonIndex].episodes[episodeIndex] = updatedEpisode;
          const selectedSeason = naruto_.seasons[seasonIndex];
          return {
            naruto: naruto_,
            selectedEpisode: updatedEpisode,
            selectedSeason,
          };
        }),

      selectEpisode: (episode: IEpisode, videoURL) =>
        set(() => ({ videoURL, selectedEpisode: episode })),
      selectSeason: (season: ISeason) =>
        set(() => ({ selectedSeason: season })),
    }),
    {
      name: 'naruto',
    }
  )
);

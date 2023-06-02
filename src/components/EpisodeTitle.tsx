import * as React from 'react';
import { IEpisode } from '../store/narutoStore';

interface IEpisodeTitleProps {
  episode: IEpisode;
}

export const EpisodeTitle: React.FC<IEpisodeTitleProps> = ({ episode }) => {
  if (!episode) {
    return <>No Title</>;
  }

  return (
    <span className="font-semibold hidden sm:inline">
      <span className="text-white">Episode {episode.episode_number}</span>
      <span className=" text-white mx-2">{episode.title}</span>

      {episode.isRelleno && (
        <span className="text-yellow-400 rounded  uppercase mx-2 opacity-70">
          - episodio de relleno
        </span>
      )}
    </span>
  );
};

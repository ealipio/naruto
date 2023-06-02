import * as React from 'react';
import { useNarutoStore, ISeason, IParam, PATH } from '../store/narutoStore';

interface ISeasonContentProps {
  selectedSeason: ISeason;
  onSelectEpisode: (info: IParam) => void;
}

export const SeasonContent: React.FC<ISeasonContentProps> = ({
  selectedSeason,
  onSelectEpisode,
}) => {
  const selectedEpisode = useNarutoStore((state) => state.selectedEpisode);

  const handleEpisodeClick =
    (selectedEpisode: any) =>
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      const mediaURL = `${PATH}media/${selectedEpisode.episode}.mp4`;

      onSelectEpisode({ selectedEpisode, mediaURL });
    };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-4">
      {selectedSeason.episodes.map((episode: any) => {
        return (
          <div className="" key={episode.id}>
            <div className="font-bold text-lime-600 my-2">
              {episode.episode}: {episode.title}
            </div>
            <div className="bg-green-400 relative">
              <img
                className={`rounded cursor-pointer  border-4 ${
                  selectedEpisode.episode === episode.episode
                    ? 'border-purple-500'
                    : 'border-black'
                }`}
                onClick={handleEpisodeClick(episode)}
                src={`${PATH}images/${selectedSeason.seasonName}/${episode.images.source}`}
                loading="lazy"
              ></img>
              {episode.isRelleno && (
                <div className="bg-red-600 text-white rounded p-1 uppercase mx-2 absolute bottom-4 right-2">
                  relleno
                </div>
              )}
            </div>
            <div className="text-yellow-300 hidden sm:block">
              {episode.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

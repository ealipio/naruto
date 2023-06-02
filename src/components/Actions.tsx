import * as React from 'react';
import { useNarutoStore, PATH } from '../store/narutoStore';

interface IEpisodeTitleProps {}

export const Actions: React.FC<IEpisodeTitleProps> = () => {
  const naruto = useNarutoStore((state) => state.naruto);
  const selectedSeason = useNarutoStore((state) => state.selectedSeason);
  const selectedEpisode = useNarutoStore((state) => state.selectedEpisode);

  const selectSeason = useNarutoStore((state) => state.selectSeason);
  const selectEpisode = useNarutoStore((state) => state.selectEpisode);

  // const handleSkipIntro =
  //   (selectedEpisode: IEpisode) =>
  //   (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     if (playerRef.current && selectedEpisode.skip) {
  //       playerRef.current.seekTo(selectedEpisode.skip, 'seconds');
  //     }
  //   };

  const setEpisode = (id: number) => {
    const [episode] = selectedSeason.episodes.filter(
      ({ episode_number }) => episode_number === id
    );
    if (episode) {
      selectEpisode(episode, `${PATH}media/${id}.mp4`);
    }
  };

  // const handleSaveSkipTime = (selectedEpisode: IEpisode) => () => {
  //   // save current time as a skip property
  // };

  const nextSeasonAndSetFirstEpisode = () => {
    const nextSeasonId = selectedSeason.id + 1;
    const [nextSeason] = naruto.seasons.filter(({ id }) => id === nextSeasonId);
    selectSeason(nextSeason);
    const newEpisode = nextSeason.episodes[0];
    const newVideoURL = `${PATH}media/${newEpisode.episode}.mp4`;
    selectEpisode(newEpisode, newVideoURL);
  };

  const handlePrev = () => {
    setEpisode(selectedEpisode.episode_number - 1);
  };

  const handleNext = () => {
    const nextEpisodeNumber = selectedEpisode.episode_number + 1;
    const nextEpisodeId = selectedEpisode?.next_episode_id;

    if (nextEpisodeNumber > 500) {
      console.log('last episode bro, there is no more :(');
      return;
    }
    // verify next episode belongs to current season
    const [nextEpisode] = selectedSeason.episodes.filter(
      (episode) => episode.id === nextEpisodeId
    );
    if (nextEpisode) {
      setEpisode(nextEpisodeNumber);
    } else {
      // jump to next season and set first episode
      nextSeasonAndSetFirstEpisode();
    }
  };

  return (
    <div className="flex justify-evenly gap-4 w-full my-2">
      {/* <button
        className="bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded h-10 w-52"
        onClick={handleSkipIntro(selectedEpisode)}
      >
        SkipIntro
      </button> */}

      {/* <button
        disabled
        className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded h-10 w-52 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSaveSkipTime(selectedEpisode)}
      >
        SaveSkip
      </button> */}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 w-40"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 w-40"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

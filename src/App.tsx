import React from 'react';
import ReactPlayer from 'react-player';

import { useNarutoStore, IParam, PATH } from './store/narutoStore';
import { SeasonContent } from './components/SeasonContent';
import { EpisodeTitle } from './components/EpisodeTitle';
import { Actions } from './components/Actions';

interface IProgress {
  playedSeconds: number;
}
function App() {
  const naruto = useNarutoStore((state) => state.naruto);
  const videoURL = useNarutoStore((state) => state.videoURL);
  const selectedSeason = useNarutoStore((state) => state.selectedSeason);
  const selectedEpisode = useNarutoStore((state) => state.selectedEpisode);

  const playerRef = React.useRef<ReactPlayer>(null);

  const selectSeason = useNarutoStore((state) => state.selectSeason);
  const selectEpisode = useNarutoStore((state) => state.selectEpisode);
  const savePlayedSeconds = useNarutoStore((state) => state.savePlayedSeconds);

  const handleStart = () => {
    console.log('handleStart', selectedEpisode.playedSeconds);
    playerRef.current?.seekTo(selectedEpisode.playedSeconds, 'seconds');
  };

  const handleOnProgress = ({ playedSeconds }: IProgress) => {
    savePlayedSeconds(playedSeconds);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seasonId = Number(e.target.value);
    const [selectedSeason] = naruto.seasons.filter(({ id }) => id === seasonId);

    selectSeason(selectedSeason);
    // select the first episode by default
    const newEpisode = selectedSeason.episodes[0];
    const newVideoURL = `${PATH}media/${newEpisode.episode}.mp4`;
    selectEpisode(newEpisode, newVideoURL);
  };

  const handleSelectEpisode = ({ mediaURL, selectedEpisode }: IParam) => {
    selectEpisode(selectedEpisode, mediaURL);
  };

  return (
    <div className="w-screen  bg-black m-auto p-4">
      <div className="flex flex-col items-start">
        <div className="absolute font-bold text-yellow-400 opacity-40">
          <EpisodeTitle episode={selectedEpisode} />
        </div>

        {!videoURL && <div className="mt-4 mb-4">{naruto.description}</div>}

        {videoURL && (
          <ReactPlayer
            width={'100%'}
            height={'620px'}
            playing={true}
            controls
            progressInterval={5000}
            onProgress={handleOnProgress}
            onStart={handleStart}
            url={videoURL}
            ref={playerRef}
          />
        )}

        <Actions />

        <div>
          <select
            className="my-4"
            onChange={handleSelect}
            name="selectedSeason"
            value={selectedSeason.id}
          >
            {naruto.seasons.map((season) => {
              return (
                <option value={season.id} key={season.id}>
                  {season.seasonShort}: {season.title}
                </option>
              );
            })}
          </select>
        </div>

        {selectedSeason && (
          <SeasonContent
            onSelectEpisode={handleSelectEpisode}
            selectedSeason={selectedSeason}
          />
        )}
      </div>
      <div className="text-white my-10">With &#128154; Eisson &#127925; 💗</div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { AlbumType, SongType } from '../types';
import emptyHeart from '../images/empty_heart.png';
import checkedHeart from '../images/checked_heart.png';

type MusicCardProps = {
  musicList: [AlbumType, ...SongType[]],
};
function MusicCard({ musicList }: MusicCardProps) {
  const [, ...albumContent] = musicList;
  const [checkedBox, setCheckedBox] = useState(false);

  return (
    <div>
      {albumContent.map((music) => (
        <div key={ music.trackId }>
          <p>{ music.trackName }</p>
          <audio
            data-testid="audio-component"
            src={ music.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>

          </audio>

          <label
            htmlFor={ `${music.trackId}` }
            data-testid={ `checkbox-music-${music.trackId}` }
          >
            <input
              type="checkbox"
              id={ `${music.trackId}` }
              onChange={ () => setCheckedBox(!checkedBox) }
            />

            <img
              src={ checkedBox ? checkedHeart : emptyHeart }
              alt="favorite"
            />

          </label>
        </div>
      ))}
    </div>
  );
}

export default MusicCard;

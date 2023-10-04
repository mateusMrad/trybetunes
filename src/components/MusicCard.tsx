import { AlbumType, SongType } from '../types';

type MusicCardProps = {
  musicList: [AlbumType, ...SongType[]],
};
function MusicCard({ musicList }: MusicCardProps) {
  const [, ...albumContent] = musicList;
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
        </div>
      ))}
    </div>
  );
}

export default MusicCard;

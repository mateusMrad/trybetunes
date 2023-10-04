import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import Carregando from './Carregando';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [musicList, setMusicList] = useState<[AlbumType, ...SongType[]]>([
    { artistName: '',
      collectionName: '',
    },
    {
      trackId: 0,
      trackName: '',
      previewUrl: '',
    },
  ]);

  useEffect(() => {
    async function handleFetchGetMusic() {
      setLoading(true);
      const result = await getMusics(id as string);
      setMusicList(result);
      setLoading(false);
    }
    handleFetchGetMusic();
  }, [id]);
  return (
    <div>
      <h3 data-testid="artist-name">{musicList[0].artistName}</h3>
      <h3 data-testid="album-name">{musicList[0].collectionName}</h3>
      <MusicCard musicList={ musicList } />
      {loading && <Carregando />}
    </div>
  );
}

export default Album;

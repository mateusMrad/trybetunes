import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import { AlbumType } from '../types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [searchBtn, setSearchBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length >= 2) {
      setSearchBtn(false);
    } else {
      setSearchBtn(true);
    }
    setInputContent(value);
    setArtistName(value);
  }

  async function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setInputContent('');
    setLoading(true);
    const result = await searchAlbumsAPI(inputContent);
    setAlbums(result);
    setLoading(false);
  }
  return (
    <div>
      <form>
        <label htmlFor="band">
          Nome da Banda ou Artista
          <input
            data-testid="search-artist-input"
            type="text"
            id="band"
            onChange={ handleChange }
            value={ inputContent }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ searchBtn }
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </form>
      {loading && <Carregando />}
      <div>
        { albums.length === 0
        && (
          <p>Nenhum álbum foi encontrado</p>
        ) }
        { albums.length > 0
        && (
          <div>
            <p>{`Resultado de álbuns de: ${artistName}`}</p>
            {albums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                { album.collectionName }
              </Link>
            ))}
          </div>
        ) }
      </div>
    </div>
  );
}

export default Search;

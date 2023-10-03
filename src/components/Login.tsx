import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

function Login() {
  const [enterBtn, setEnterBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length >= 3) {
      setEnterBtn(false);
    } else {
      setEnterBtn(true);
    }
    setInputContent(value);
  }

  async function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLoading(true);
    await createUser({ name: inputContent });
    setLoading(false);
    navigate('/search');
  }

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="login-name-input"
            type="text"
            id="name"
            onChange={ handleChange }
            value={ inputContent }
          />
        </label>
        <button
          data-testid="login-submit-button"
          disabled={ enterBtn }
          onClick={ handleClick }
        >
          Entrar

        </button>
      </form>
      {loading && <Carregando />}
    </div>
  );
}

export default Login;

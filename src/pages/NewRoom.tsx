
import illustrationImg from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

import { Button } from '../components/Button';
import '../styles/auth.scss';
// import { useContext } from 'react';
// import { AuthConstext } from '../context/AuthContext';

export function NewRoom(){

    // const { user } = useContext(AuthConstext);

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong> Crie Sala de Q&amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoimg} alt="Letmeask" />
 
                    <h2>Criar um nova sala</h2>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                        />
                        <Button >
                            Criar sala
                        </Button>
                    </form>

                    <p> 
                        Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
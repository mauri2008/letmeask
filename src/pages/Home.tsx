

import illustrationImg from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import '../styles/auth.scss';

export function Home(){
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        navigate('/room/new')
    }
    

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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do google" />
                        crie sua sala com o Google
                    </button>

                    <div className="separator" >
                        ou entre em uma sala
                    </div>

                    <form>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                        />
                    </form>
                    <Button >
                        Entrar na sala
                    </Button>
                </div>
            </main>
        </div>
    )
}
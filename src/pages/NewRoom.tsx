import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

import { database } from '../Services/firebase';



import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
// import { useContext } from 'react';
// import { AuthConstext } from '../context/AuthContext';

export function NewRoom(){

    const { user } = useAuth();
    const navigate = useNavigate()

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/room/${firebaseRoom.key}`)
        
    }


    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong> Crie Sala de Q&amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content" >
                    <img src={logoimg} alt="Letmeask" />
 
                    <h2>Criar um nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event=>setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit" >
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
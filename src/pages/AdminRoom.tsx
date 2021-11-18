
import { useNavigate, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode';


import { Button } from '../components/Button'
import { ListQuestion } from '../components/ListQuestion';

import removeImg from '../assets/images/delete.svg';



import '../styles/room.scss';

import { useRoom } from '../hooks/useRoom';
import { database } from '../Services/firebase';



export function AdminRoom(){

    const navigate = useNavigate();
    const { id } = useParams();
    const { questions, title } = useRoom(id);

    async function handleEndRoom() {
        await database.ref(`rooms/${id}`).update({
            endedAt: new Date(),
        })

        navigate('/');
    }

    async function handleDeleteQuestion(questionId: string)
    {
        if(window.confirm('Tem certeza que deseja remover esta pergunta?')){
             await database.ref(`rooms/${id}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room" >
            <header>
                <div className="content">
                    <img src={logoImg} alt=" letmeask" />
                    <div>
                        <RoomCode code={id} />
                        <Button isOutlined onClick={()=> handleEndRoom()}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title" >
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>


                <div>
                    {
                        questions.map(question=>(
                            <ListQuestion 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type='button'
                                    onClick={()=>handleDeleteQuestion(question.id)}
                                >
                                    <img src={removeImg} alt="Remover Pergunta" />
                                </button>
                            </ListQuestion>
                        ))
                    }
                </div>

            </main>
        </div>
    )
}
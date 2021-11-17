import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../Services/firebase';

import { Button } from '../components/Button'
import { ListQuestion } from '../components/ListQuestion';

import '../styles/room.scss';

type firebaseQuestion = Record<string, {
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighLighted:boolean;
}>

type Questions = {
    id: string;
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighLighted:boolean;
}
export function Room(){

    const { id } = useParams();
    const { user } = useAuth();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestitons ] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${id}`);

        roomRef.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestion: firebaseQuestion = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) =>{
                return{
                    id:key,
                    content:value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestitons(parsedQuestions);
        })
    },[id])
    
    async function handleSendQuestion(event : FormEvent){

        event.preventDefault();

        if(newQuestion.trim() ==='')
        {
            return;
        }

        if(!user){
            throw new Error('You must be logged in');
        }

        const question ={
            content: newQuestion,
            author:{
                name: user.name,
                avatar:user.avatar,
            },
            isHighLighted:false,
            isAnswered: false,
        };

        await database.ref(`rooms/${id}/questions`).push(question)

        setNewQuestion('');
    }

    return(
        <div id="page-room" >
            <header>
                <div className="content">
                    <img src={logoImg} alt=" letmeask" />
                    <RoomCode code={id} />
                </div>
            </header>

            <main className="content">
                <div className="room-title" >
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que voce quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {
                            user ?(
                                <div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>
                            ):(
                                <span> Para enviar uma pergunta, <button>faça seu login</button></span>
                            )
                        }
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                
                <div>
                    {
                        questions.map(question=>(
                            <ListQuestion 
                                comment={question.content}
                                avatar={question.author.avatar}
                                name={question.author.name}
                            />
                        ))
                    }
                </div>

            </main>
        </div>
    )
}
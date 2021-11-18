import { useEffect, useState } from "react";
import { database } from "../Services/firebase";
import { useAuth } from "./useAuth";


type firebaseQuestion = Record<string, {
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighLighted:boolean;
    likes: Record<string, {
        authorId: string;
    }>;
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
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string|undefined ){
    const { user } = useAuth();
    const [questions, setQuestitons ] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    
    
    useEffect(()=>{
        if(roomId?.trim() ==='')
        {
            return;
        }
        const roomRef = database.ref(`rooms/${roomId}`);

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
                    likeCount: Object.values(value.likes ?? {} ).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuestitons(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
        }

    },[roomId, user?.id])

    return{questions, title}
}
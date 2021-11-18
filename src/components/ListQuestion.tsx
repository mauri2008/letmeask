
import { ReactNode } from 'react';
import likeImg from '../assets/images/like.svg';
import { auth } from '../Services/firebase';

import '../styles/list-question.scss';

type ListQuestionsProps ={
    content: string;
    author: {
        name:string;
        avatar:string;
    }
    children?: ReactNode;
    isAnswered?:boolean;
    isHighLighted?:boolean;
}


export function ListQuestion ( {content, author, children , isAnswered = false, isHighLighted=false} : ListQuestionsProps){
    return(
        <div 
            id="list-question" 
            className={`${isHighLighted && !isAnswered? 'highlighted': ''} ${isAnswered? 'answered':''}` }
        >
            <p>{content}</p>
            <div className="list-question-footer">
                <div className="list-question-user">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>

                <div className="list-question-btn-group">
                    {children}
                </div>

            </div>
        </div>
    )
}

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
}


export function ListQuestion ( {content, author, children} : ListQuestionsProps){
    return(
        <div id="list-question">
            <p>{content}</p>
            <div className="list-question-footer">
                <div className="list-question-user">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>

                <div>
                    {children}
                </div>

            </div>
        </div>
    )
}
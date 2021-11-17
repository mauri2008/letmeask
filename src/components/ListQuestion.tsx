
import likeImg from '../assets/images/like.svg';

import '../styles/list-question.scss';

type ListQuestionsProps ={
    comment:string;
    avatar:string;
    name: string;
}


export function ListQuestion ( props: ListQuestionsProps){
    return(
        <div id="list-question">
            <p>{props.comment}</p>
            <div className="list-question-footer">
                <div className="list-question-user">
                    <img src={props.avatar} alt={props.name} />
                    <span>{props.name}</span>
                </div>

                <div className="list-question-like">
                    <span>16</span>
                    <button>
                        <img src={likeImg} alt="like" />
                    </button>
                </div>

            </div>
        </div>
    )
}
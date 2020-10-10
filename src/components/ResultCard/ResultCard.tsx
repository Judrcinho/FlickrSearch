import React from 'react';
import './ResultCard.scss';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';

import {IImageSearchResult} from '../../common/types';

type ResultsListProps = {
    fetchResults:(searchQuery: string) => void,
    result: IImageSearchResult
}

const ResultCard:React.FC<ResultsListProps> = (props) => {
    const dispatch: Dispatch<any> = useDispatch();

    return <div className="resultCard">
                <a 
                    className="resultCard__thumbnail"
                    href={props.result.fullImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={props.result.imageUrl} alt="unsplash_image" />
                </a>
                <div className="resultCard__tags">
                        <div className="resultCard__tags__wrapper">
                            {props.result.tags.map((tag, index) => 
                                <div 
                                    key={index} 
                                    className="resultCard__tags__wrapper_tag"
                                    onClick={() => {
                                        dispatch(props.fetchResults(tag));
                                    }}
                                >
                                    {tag}
                                </div>)
                            }
                        </div>
                </div>
                <div className="resultCard__background" />
                <div className="resultCard__footer">
                    <div className="resultCard__footer_date">{props.result.date}</div>
                </div>
            </div>
}

export default ResultCard;
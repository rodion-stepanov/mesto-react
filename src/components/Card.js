import React from 'react';

function Card(props) {
// console.log(props.card.link);
    function handleClick() {
        props.onImageOpen();
        props.onCardClick(props.card);
    }

    return (
        <figure className="cards__item">
            <img onClick={handleClick} src={props.card.link} alt={`${props.card.name}`} className="cards__image" />
            <button className="cards__delete-button" />
            <figcaption className="cards__name">
                <p className="cards__name-caption">{props.card.name}</p>
                <div className="cards__like">
                    <button type="button" className="cards__like-button" />
                    <p className="cards__like-counter">{props.card.likes.length}</p>
                </div>
            </figcaption>
        </figure>
    );
}

export default Card;

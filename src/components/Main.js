import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInfoUser()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    React.useEffect(() => {
        api.getInitialCards()
            .then((result) => {
                setCards(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [cards]);

    return (
        <main className="main">
            <section className="profile">
                <button onClick={props.onEditAvatar} type="button" className="profile__avatar-button">
                    <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                </button>
                <div className="profile__edit-info">
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__button"></button>
            </section>

            <section className="cards">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onImageOpen={props.onImagePopup} onCardClick={props.onCardClick} />
                ))}
            </section>
        </main>
    )
}

export default Main;
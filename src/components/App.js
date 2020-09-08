import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);




  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card)
      .then(() => {
        const arrWithoutCard = cards.filter((i) => i !== card);
        setCards(arrWithoutCard);
      })

  }

  React.useEffect(() => {
    api.getInfoUser()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleImagePopupclick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false)
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.sendInfoUser(user)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups()
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups()
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.createCard(card)
      .then((newCard) => {
        setCards([...cards, newCard])
      })
      .then(() => {
        closeAllPopups();
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onCardClick={handleCardClick}
            onImagePopup={handleImagePopupclick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>

        <EditProfilePopup isLoading={isLoading} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <ConfirmDeletePopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />

        <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;

import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import PopupWithImage from './PopupWithImage'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

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
  }

  return (

    <div className="App">
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} onImagePopup={handleImagePopupclick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
      </div>

      <PopupWithForm title='Редактировать профиль' name="profile_edit" button='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input autoComplete="off" id="user-name" type="text" name="userName" className="popup__input popup__input_value_name"
          minLength="2" maxLength="40" required />
        <span id="user-name-error" className="popup__error popup__error_position_top"></span>
        <input autoComplete="off" id="user-description" type="text" name="userDescription"
          className="popup__input popup__input_value_description" minLength="2" maxLength="200" required />
        <span id="user-description-error" className="popup__error popup__error_position_bottom"></span>
      </PopupWithForm>

      <PopupWithForm title='Новое место' name="card_add" button='Создать' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input autoComplete="off" id="card-name" type="text" name="name" placeholder="Название"
          className="popup__input popup__input_place_name" minLength="1" maxLength="30" required />
        <span id="card-name-error" className="popup__error popup__error_position_top"></span>
        <input autoComplete="off" id="card-url" type="url" name="link" placeholder="Ссылка на картинку"
          className="popup__input popup__input_place_image" required />
        <span id="card-url-error" className="popup__error popup__error_position_bottom"></span>
      </PopupWithForm>

      <PopupWithImage card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm title='Вы уверены?' name="delete_confirm" button='Да' />

      <PopupWithForm title='Обновить аватар' name="avatar_edit" button='Сохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input autoComplete="off" id="avatar-url" type="url" name="link" placeholder="Ссылка на картинку"
          className="popup__input popup__input_place_image" required />
        <span id="avatar-url-error" className="popup__error popup__error_position_bottom"></span>
      </PopupWithForm>

    </div >
  );
}

export default App;

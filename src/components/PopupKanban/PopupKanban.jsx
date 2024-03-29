import './PopupKanban.scss';
import pencilSimple from '../../images/PencilSimple.svg'
import trashSimple from '../../images/TrashSimple.svg'
import close from '../../images/closePopup.svg'

export function PopupKanban() {
    const arrProject = [{ nameProject: "gsdfgsdg" }, { nameProject: "пвпапвыпв" }]

    return <div className="popup-kanban">
        <div className='popup-kanban__popup'>
            <h1 className="popup-kanban__title">Редактировать</h1>
            {arrProject.map((item) => {
                return <div className='popup-kanban__input-conteiner'>
                    <input type='text ' className="popup-kanban__input" placeholder={item.nameProject}></input>
                    <img className="popup-kanban__img-pen" src={pencilSimple} alt="создать проект" />
                    <img className="popup-kanban__img" src={trashSimple} alt="удалить проект" />
                </div>
            })}
            <button className='popup-kanban__button '>Добавить новый проект +</button>
            <button className='popup-kanban__button popup-kanban__button_purple'>Подтвердить</button>
            <button className='popup-kanban__button popup-kanban__button_close'><img className="popup-kanban__img" src={close} alt="закрыть модальное окно" /></button>
        </div>
    </div>;
}
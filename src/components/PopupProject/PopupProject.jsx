import './PopupProject.scss';

function PopupProject({ projects, setIsOpenPopupProject, handleClickProject }) {
  const projectsName = projects.map((i) => i);

  projectsName.splice(0, 2);
  const handkeClickProject = () => {
    setIsOpenPopupProject(false);
  };

  return (
    <div className="popup-project">
      <ul className="popup-project__popup">
        {projectsName.map((project) => (
          <button
            type="button"
            key={project.id}
            className="popup-project__button-project"
            onClick={() => handleClickProject(project)}
          >
            <li className="popup-project__item" onClick={handkeClickProject}>
              {project.name}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default PopupProject;

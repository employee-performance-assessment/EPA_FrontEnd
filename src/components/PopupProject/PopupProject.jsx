import './PopupProject.scss';

function PopupProject({ projects, onClick }) {
  console.log(projects);
  function handleClickProject(e) {
    console.log('cheise project');
  }

  return (
    <div className="popup-project" onClick={onClick}>
      <ul className="popup-project__popup">
        {projects.splice(0, 2).map((project) => (
          <li className="popup-project__item">{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PopupProject;

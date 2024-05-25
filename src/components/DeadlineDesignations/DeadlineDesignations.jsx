import './DeadlineDesignations.scss';

function DeadlineDesignations() {
  return (
    <div className='designations'>
      <div className='designation designation_completed' />
      <span className='designation-text'>Выполнено в срок</span>
      <div className='designation designation_delayed' />
      <span className='designation-text'>Выполнено не в срок</span>
    </div>
  );
}

export default DeadlineDesignations;

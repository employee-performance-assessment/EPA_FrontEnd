import { useState } from 'react';
import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import './DeadlineAnalytics.scss';

function DeadlineAnalytics() {
  const [isPrivate, setIsPrivate] = useState(false);
  const completedResult = 80;
  const failureResult = 20;
  const name = 'Alex Proscurjacovsckich';

  return (
    <div className='deadline'>
      {isPrivate ? (
        <div className='deadline-private'> </div>
      ) : (
        <div className='deadline-command'>
          <div className='deadline-command__graph-container'>
            <h2 className='deadline-command__title'>Команда</h2>
            <div className='deadline-command__graph'>
              <div className='deadline-command__completed' style={{ height: `${completedResult}%` }} />
              <div className='deadline-command__failure' style={{ height: `${failureResult}%` }} />
              <span className='deadline-command__completed-text'>{completedResult}%</span>
              <span className='deadline-command__failure-text'>{failureResult}%</span>
            </div>
            <DeadlineDesignations />
          </div>
          <div className='deadline-command__leaders-intruders'>
            <div className='deadline-command__employees-container'>
              <p className='deadline-command__employees-header'>Лидеры</p>
              <div className='deadline-command__employees'>
                <div className='deadline-command__employee'>
                  <div className='deadline-command__employee-icon deadline-command__employee-icon_leader' />
                  <p className='deadline-command__employee-name'>{name}</p>
                </div>
                <div className='deadline-command__employee'>
                  <div className='deadline-command__employee-icon deadline-command__employee-icon_leader' />
                  <p className='deadline-command__employee-name'>{name}</p>
                </div>
              </div>
            </div>
            <div className='deadline-command__employees-container'>
              <p className='deadline-command__employees-header'>Нарушители дедлайна</p>
              <div className='deadline-command__employee'>
                <div className='deadline-command__employee-icon deadline-command__employee-icon_intruder' />
                <p className='deadline-command__employee-name'>{name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeadlineAnalytics;

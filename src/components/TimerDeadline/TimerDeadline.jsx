import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import styles from './TimerDeadline.module.scss';

function TimerDeadline() {
  const taskData = {
    dateValue: 7,
    progressValue: 70,
    status: 'Done',
  };
  const [progress, setProgress] = useState(0);
  const [colorButton, setColorButton] = useState('');
  const [textButton, setTextButton] = useState('');

  const handleButtonType = (status) => {
    if (status === 'Complete') {
      setColorButton('rgb(242, 72, 34)');
      setTextButton('Пора сдавать на ревью');
    }
    if (status === 'Done') {
      setColorButton('rgb(0, 211, 127)');
      setTextButton('Well done');
    }
    if (status === 'InWork') {
      setColorButton('rgb(197, 182, 241)');
      setTextButton('На ревью');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        const diff = Math.random() * 1;
        return Math.min(100 + diff, taskData.progressValue);
      });
    }, 500);

    handleButtonType(taskData.status);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDateValue = (date) => {
    if (date === (1 || 21 || 31 || 41 || 51)) {
      return `Остался ${date} день`;
    }
    if (date < (5 || 25 || 35 || 45 || 55)) {
      return `Осталось ${date} дня`;
    }
    if (date > (4 || 24 || 34 || 44 || 54)) {
      return `Осталось ${date} дней`;
    }
  };

  return (
    <div className={styles.container}>
      {taskData.dateValue === 0 ? (
        <button
          style={{ backgroundColor: colorButton }}
          className={styles.progress}
        >
          <span className={styles.statusText}>{textButton}</span>
        </button>
      ) : (
        <button className={styles.progress}>
          <LinearProgress
            color="inherit"
            className={styles.range}
            variant="determinate"
            value={progress}
          />
          <span className={styles.text}>
            {handleDateValue(taskData.dateValue)}
          </span>
        </button>
      )}
    </div>
  );
}

export default TimerDeadline;

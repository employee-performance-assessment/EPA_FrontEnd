import styles from './CriterionInput.module.scss';

function CriterionInput({ text }) {
  return (
    <div className={styles.criterion__container}>
      <input
        className={styles.criterion__text}
        type="text"
        placeholder={text}
        value={text}
        // После уточнения функционала добавить возможность админу вводить текст
        readOnly={true}
      />
    </div>
  );
}

export default CriterionInput;

import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Daha Fazla Yükle
    </button>
  );
};

export default LoadMoreBtn;

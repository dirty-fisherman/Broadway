import styles from './OfflineMessage.module.css';

export default function Spinner() {
  return (
    <div className={styles.offlineWrapper}>
      No one's online right now! Check back later.
    </div>
  )
}

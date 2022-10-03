import styles from './Streamer.module.css'

export default function Streamer({ game, started_at, title, user_name, thumbnail_url, profile_image_url }) {
  return (
    <a className={styles.Streamer} href={`https://twitch.tv/${user_name}`} target="_blank">
      <div className={styles.StreamerThumbnail} style={{ backgroundImage: `url(${thumbnail_url.replace('{width}', '640').replace('{height}', '360')})` }} />
      <div className={styles.StreamerInfo}>
        <span className={styles.StreamerAvatar} style={{ backgroundImage: `url(${profile_image_url})` }}>
        </span>
        <div>
          <h1 className={styles.StreamerUser}>{user_name}</h1>
          <h2 className={styles.StreamerTitle}>{title}</h2>
          <h3 className={styles.StreamerCategory}>{game}</h3>
        </div>
      </div>
    </a>
  )
}

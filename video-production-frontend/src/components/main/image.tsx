import image from './ноут.png'; 
import styles from './Image.module.css'
export function Image(){
    return(
        <div className={styles.container}>
            <div className={styles.grayBlock}>
                <img src={image} alt="Описание" className={styles.overlayImage} />
            </div>
        </div>
    )
    
}
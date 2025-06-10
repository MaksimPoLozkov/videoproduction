import styles from './buttonMain.module.css'


export function ButtonOne(){
    return(
        <div>
            <button className={styles.but} >Обсудить проект</button>
        </div>
    )
}
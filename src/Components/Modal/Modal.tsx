import React, {useState} from 'react';
import styles from './FileUpload.module.css';

export const Modal: React.FC = ({}) => {

    return(
        <div className={styles.dropModal}>
            <div className={styles.dropModalText}>
                Drop Your File Here
            </div>
            
        </div>
    )
}
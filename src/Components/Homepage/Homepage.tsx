import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Homepage.module.css";
import menu from "../../Media/dropdown.png";
import menuContent from "../../Media/menuContent.png";

type Props = {
    openModal: (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Homepage: React.FC<Props> = ({
    openModal,
}) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const toggleOption = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setDropdown(!dropdown);
      event.stopPropagation();
    }

    const showModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      closeOption();
      openModal(event);
    }
    const closeOption = () => {
      setDropdown(false);
    }
    return (
    <div className={styles.CanvaHomePage} onClick={closeOption}>
        <Button
        variant="info"
        onClick={toggleOption}
        className={styles.createDesignBtn}
      >
        Create a design
      </Button>
     { dropdown && 
     (<img src={menu} className={styles.menuCont} alt="menu"/>) &&
      (<img src={menuContent} onClick={showModal} className={styles.menuContent} alt="menu content"/>)}
    </div>
    )
}

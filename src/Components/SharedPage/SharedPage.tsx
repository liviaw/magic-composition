import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./SharedPage.module.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import GetAppIcon from "@material-ui/icons/GetApp";
import { showToast } from "../Toast/Toast";

/**
 * Share section. This will direct you to the chosen social medias
 */

const delay = (name: string, URL: string): string => {
  showToast("This feature is not available yet, directing you to " + name);
  setTimeout(function () {
    window.location.href = URL;
  }, 5000);
  return URL;
};
export const SharedPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <button className={styles.round}>
            <VisibilityIcon
              onClick={() => delay("Canva", "https://www.canva.com")}
            />
          </button>
          <p className={styles.tinyText}>Link to Watch</p>

          <button className={styles.round}>
            <MailOutlineIcon
              onClick={() => delay("Canva", "https://www.canva.com")}
            />
          </button>
          <p className={styles.tinyText}>Send Email</p>
        </Col>
        <Col>
          <button className={styles.round}>
            <TwitterIcon
              onClick={() => delay("Twitter", "https://www.twitter.com")}
            />
          </button>
          <p className={styles.tinyText}>Tweet!</p>
          <button className={styles.round}>
            <GetAppIcon
              onClick={() => delay("Canva", "https://www.canva.com")}
            />
          </button>
          <p className={styles.tinyText}>Download</p>
        </Col>
        <Col>
          <button className={styles.round}>
            <FacebookIcon
              onClick={() => delay("Facebook", "https://www.facebook.com")}
            />
          </button>
          <p className={styles.tinyText}>Facebook</p>

          <button className={styles.round}>
            <MoreHorizIcon />
          </button>
          <p className={styles.tinyText}>More</p>
        </Col>
      </Row>
    </Container>
  );
};

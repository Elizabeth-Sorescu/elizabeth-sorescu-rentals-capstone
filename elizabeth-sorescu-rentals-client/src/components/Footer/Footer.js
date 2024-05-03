import "./Footer.scss";
import fbIcon from "../../assets/icons/soc-med/fb.svg";
import igIcon from "../../assets/icons/soc-med/ig.svg";
import twIcon from "../../assets/icons/soc-med/tw.svg";
import tkIcon from "../../assets/icons/soc-med/tk.svg";

function Footer() {
  return (
    <main className="footer-section">
      <div className="footer-section__left-grp">
        <div className="footer-section__left-grp--icons">
          <img
            className="footer-section__icons--elem-icon"
            src={fbIcon}
            alt="user profile icon"
            href="https://www.facebook.com/"
            target="_blank"
          ></img>

          <img
            className="footer-section__icons--elem-icon"
            src={igIcon}
            alt="user profile icon"
            href="https://www.instagram.com/"
            target="_blank"
          ></img>

          <img
            className="footer-section__icons--elem-icon"
            src={twIcon}
            alt="user profile icon"
            href="https://www.twitter.com/"
            target="_blank"
          ></img>

          <img
            className="footer-section__icons--elem-icon"
            src={tkIcon}
            alt="user profile icon"
            href="https://www.tiktok.com/"
            target="_blank"
          ></img>
        </div>
        <p className="footer-section__left-grp--label">Connect with us</p>
      </div>
      <div className="footer-section__rightt-grp">
        Help us improve the app. Please provide feedback.
      </div>
    </main>
  );
}

export default Footer;

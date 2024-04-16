import fbIcon from "../../assets/icons/soc-med/icons8-facebook-64.png";

function Footer() {
  return (
    <div>
      <div className="footer-icons">
        <div className="footer-icons__fb">
          <a href="https://www.facebook.com/" target="_blank">
            <img src={fbIcon} alt="user profile icon"></img>
          </a>
        </div>
        <div className="footer-icons__fb">
          <img
            src={fbIcon}
            alt="user profile icon"
            href="https://www.facebook.com/"
            target="_blank"
          ></img>
        </div>
      </div>
      <label>Connect with us</label>
    </div>
  );
}

export default Footer;

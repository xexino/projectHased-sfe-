import React from "react";
import logo from '../assets/logo.svg'
function Footer() {
  return (
    <footer className="s-footer">
      <div className="row footer-top">
        <div className="column large-4 medium-5 tab-full">
          <div className="footer-logo">
            <a className="site-footer-logo" >
              <img src={logo} alt="Homepage" />
            </a>
          </div>
          <p>
            Laborum ad explicabo. Molestiae voluptates est. Quisquam labore
            tenetur et assumenda voluptatibus a beatae. Rerum odio ducimus
            reprehenderit sit animi laborum nostrum dolorum animi voluptates est
            voluptatibus a beatae.
          </p>
        </div>
        <div className="column large-half tab-full">
          <div className="row">
            <div className="column large-7 medium-full">
              <h4 className="h6">Our Location</h4>
              <p>
                lorem lorem lorem lorem kak <br />
                lorem lorem Vlorem lorem <br />
                94043 US
              </p>

              <p>
                <a className="btn btn--footer"
                >
                  Get Direction
                </a>
              </p>
            </div>
            <div className="column large-5 medium-full">
              <h4 className="h6">Quick Links</h4>
              <ul className="footer-list">
                <li>
                  <a >Home</a>
                </li>
                <li>
                  <a >About</a>
                </li>
                <li>
                  <a>Volunteer</a>
                </li>
                <li>
                  <a>Connect Groups</a>
                </li>
                <li>
                  <a>Upcoming Events</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row footer-bottom">
        <div className="column ss-copyright">
          <span>© Copyright xexino 2022</span>
          <span>
            Design by
            <a >StyleShout</a>
          </span>
        </div>
      </div>
{/* 
      <div className="ss-go-top">
        <a className="smoothscroll" title="Back to Top" href="#top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0l8 9h-6v15h-4v-15h-6z" />
          </svg>
        </a>
      </div> */}
    </footer>
  );
}

export default Footer;

import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  return (
    <nav>
      <ul>
        <h1 id="title">
          <i class="fa-solid fa-satellite"></i>Cosmic Insights
        </h1>
        <li>
          <Link to="potd" smooth={true} duration={1000}>
            Picture of the Day
          </Link>
        </li>
        <li>
          <Link to="visibility" smooth={true} duration={1000}>
            Visibility
          </Link>
        </li>
        <li>
          <Link to="news-section" smooth={true} duration={1000}>
            News
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

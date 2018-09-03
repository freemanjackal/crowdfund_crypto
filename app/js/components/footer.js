import React from 'react';

function Footer(){

  return(

      <React.Fragment>

    <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-sm-6 footerleft ">
        <div className="logofooter"> Logo</div>
        <p><i className="fa fa-envelope"></i> E-mail : info@fundworld.com</p>
        
      </div>
      <div className="col-md-2 col-sm-6 paddingtop-bottom">
        <h6 className="heading7">GENERAL LINKS</h6>
        <ul className="footer-ul">
          <li><a href="#"> Career</a></li>
        </ul>
      </div>
      <div className="col-md-3 col-sm-6 paddingtop-bottom">
        <h6 className="heading7">LATEST Campaigns</h6>
        <div className="post">
          <p>WIP<span>August 2018</span></p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 paddingtop-bottom">
        <div className="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-height="300" data-small-header="false"  data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
          <div className="fb-xfbml-parse-ignore">
            <blockquote cite="https://www.facebook.com/facebook"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<div className="copyright">
  <div className="container">
    <div className="col-md-6">
      <p>© 2018 - All Rights with FundTheWorld.crypto</p>
    </div>
    <div className="col-md-6">
      <ul className="bottom_ul">
        <li><a href="#">About us</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Faq's</a></li>
        <li><a href="#">Site Map</a></li>
      </ul>
    </div>
  </div>
</div>
      </React.Fragment>

);
}

export default Footer;

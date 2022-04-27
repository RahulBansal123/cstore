import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'Become a seller', to: '/sell' },
    { id: 1, name: 'Shop by brand', to: '/brands' },
    { id: 2, name: 'Contact Us', to: '/contact' },
  ];

  const footerLinks = infoLinks.map((item) => (
    <p key={item.id} style={{ margin: 0 }}>
      <Link key={item.id} to={item.to} className="footer-p">
        {item.name}
      </Link>
    </p>
  ));

  return (
    <footer className="footer">
      <Container>
        <div className="footer-copyright">
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} CStore</p>
          {footerLinks}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

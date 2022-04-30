/**
 *
 * NavigationMenu
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

class NavigationMenu extends React.PureComponent {
  render() {
    return (
      <div className="navigation-menu">
        <div className="menu-header"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
  };
};

export default connect(mapStateToProps, actions)(NavigationMenu);

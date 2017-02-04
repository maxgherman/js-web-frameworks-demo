import './home.less';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { openMenu, closeMenu } from '../redux/actions';
import routes from '../routing/routes';

import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';


class Home extends Component {
    
    constructor(props) {
        super(props);
    }
    
    menuOpen() {
        const { dispatch } = this.props;
        dispatch(openMenu());
    }

    menuClose() {
        const { dispatch } = this.props;
        dispatch(closeMenu());
    }

    rightNavigation() {
        let path = routes.getNextPath(this.props.location.pathname);

        if(path) {
            this.context.router.push(path);
        }
    }

    leftNavigation() {
        let path = routes.getPrevtPath(this.props.location.pathname);

        if(path) {
            this.context.router.push(path);
        }
    }

    renderLinks() {
        return routes.items
        .map((item, index) => 
            <Link key={index} to={item.path}>{item.name}</Link>);
    }

    render() {
        let sideNavClass = classNames({
            sidenav : true,
            open: this.props.openMenu,
            close: !this.props.openMenu
        });

        return (
            <div className="home">
                <div className={sideNavClass}>
                    <span
                        className="closebtn" 
                        onClick={this.menuClose.bind(this)}>&times;
                    </span>
                    {this.renderLinks()}
                </div>
                
                <header>
                    <Appbar>
                        <div className="mui--appbar-line-height">
                            <div className="name">
                                <span 
                                    className="open"
                                    onClick={this.menuOpen.bind(this)}>&#9776;
                                </span>
                            </div>
                            <div className="header">
                                <span>{this.props.title}</span>
                            </div>
                            <div className="arraows">
                                <div 
                                    className="arrow-left"
                                    onClick={this.leftNavigation.bind(this)}>
                                    <div className="inner"></div>
                                </div>
                                <div 
                                    className="arrow-right"
                                    onClick={this.rightNavigation.bind(this)}>
                                    <div className="inner"></div>
                                </div>
                            </div>
                        </div>
                    </Appbar>
                </header>
                <Container>
                    {this.props.children}
                </Container>
            </div>);
    }
}

Home.contextTypes = { router: PropTypes.object.isRequired };
Home.propTypes = { 
    openMenu: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    location: PropTypes.object
 };

function mapStateToProps(state) {
  return {
      openMenu: state.menu.openMenu,
      title: state.slide.title
  };
}

export default connect(mapStateToProps)(Home);
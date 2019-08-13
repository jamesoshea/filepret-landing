import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavbarBrand,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Cookies from 'universal-cookie';
import Package from '../../package';
import Styles from '../../css/index.scss';

import UserMenu from './userMenu';
import SigninModal from './signinModal';

export default class extends React.Component {
  static propTypes() {
    return {
      session: PropTypes.object.isRequired,
      providers: PropTypes.object.isRequired,
      children: PropTypes.object.isRequired,
      fluid: PropTypes.boolean,
      navmenu: PropTypes.boolean,
      signinBtn: PropTypes.boolean,
    };
  }

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  state = {
    navOpen: false,
    modal: false,
    providers: null,
  };

  async toggleModal(e) {
    if (e) e.preventDefault();

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies();
      cookies.set('redirect_url', window.location.pathname, { path: '/' });
    }

    this.setState({
      providers: this.state.providers || (await NextAuth.providers()),
      modal: !this.state.modal,
    });
  }

  render() {
    const { title } = this.props;
    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title || 'Filepret'}</title>
          <style dangerouslySetInnerHTML={{ __html: Styles }} />
        </Head>
        <Navbar light className="navbar navbar-expand-md pt-3 pb-3">
          <Link prefetch href="/">
            <div>
              <NavbarBrand href="/">Filepret</NavbarBrand>
            </div>
          </Link>
          <label htmlFor="nojs-navbar-check" className="nojs-navbar-label mt-2">
            <input
              className="nojs-navbar-check"
              id="nojs-navbar-check"
              type="checkbox"
              aria-label="Menu"
            />
          </label>
          <div className="nojs-navbar">
            <Nav navbar>
              <div className="dropdown nojs-dropdown">
                <Link href="/about">
                  <div className="nav-item">
                    <span className="nav-link">About</span>
                  </div>
                </Link>
              </div>
            </Nav>
            <UserMenu
              session={this.props.session}
              toggleModal={this.toggleModal}
              signinBtn={this.props.signinBtn}
            />
          </div>
        </Navbar>
        <MainBody
          navmenu={this.props.navmenu}
          fluid={this.props.fluid}
          container={this.props.container}
        >
          {this.props.children}
        </MainBody>
        <Container fluid={this.props.fluid}>
          <hr className="mt-3" />
          <p className="text-muted small">
            <Link href="https://github.com/jamesoshea/filepret-landing">
              <a className="text-muted font-weight-bold">
                <span className="icon ion-logo-github" /> {Package.name}{' '}
                {Package.version}
              </a>
            </Link>
            <span> built with </span>
            <Link href="https://github.com/zeit/next.js">
              <a className="text-muted font-weight-bold">
                Next.js {Package.dependencies.next.replace('^', '')}
              </a>
            </Link>
            <span> &amp; </span>
            <Link href="https://github.com/facebook/react">
              <a className="text-muted font-weight-bold">
                React {Package.dependencies.react.replace('^', '')}
              </a>
            </Link>
            .<span className="ml-2">&copy; {new Date().getYear() + 1900}.</span>
          </p>
        </Container>
        <SigninModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          session={this.props.session}
          providers={this.state.providers}
        />
      </>
    );
  }
}

export function MainBody(props) {
  const { children, container, fluid, navmenu } = props;
  if (container === false) {
    return children;
  } else if (navmenu === false) {
    return (
      <Container fluid={fluid} style={{ marginTop: '1em' }}>
        {children}
      </Container>
    );
  }
  return (
    <Container fluid={fluid} style={{ marginTop: '1em' }}>
      <Row>
        <Col xs="12" md="9" lg="10">
          {children}
        </Col>
        <Col xs="12" md="3" lg="2" style={{ paddingTop: '1em' }}>
          <h5 className="text-muted text-uppercase">Examples</h5>
          <ListGroup>
            <ListGroupItem>
              <Link prefetch href="/examples/authentication">
                <a href="/examples/authentication" className="d-block">
                  Auth
                </a>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link prefetch href="/examples/async">
                <a href="/examples/async" className="d-block">
                  Async
                </a>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link prefetch href="/examples/layout">
                <a href="/examples/layout" className="d-block">
                  Layout
                </a>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link prefetch href="/examples/routing">
                <a href="/examples/routing" className="d-block">
                  Routing
                </a>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link prefetch href="/examples/styling">
                <a href="/examples/styling" className="d-block">
                  Styling
                </a>
              </Link>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

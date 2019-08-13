import Cookies from 'universal-cookie';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import Router from 'next/router';
import { Button, Form, Nav, NavItem } from 'reactstrap';
import React from 'react';

async function handleSignoutSubmit(event) {
  event.preventDefault();

  // Save current URL so user is redirected back here after signing out
  const cookies = new Cookies();
  cookies.set('redirect_url', window.location.pathname, { path: '/' });

  await NextAuth.signout();
  Router.push('/');
}

function AdminMenuItem(props) {
  const { session } = props;
  if (session.user && session.user.admin === true) {
    return (
      <>
        <Link prefetch href="/admin">
          <a href="/admin" className="dropdown-item">
            <span className="icon ion-md-settings mr-1" />
            Admin
          </a>
        </Link>
      </>
    );
  }
  return <div />;
}

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignoutSubmit = handleSignoutSubmit.bind(this);
  }

  render() {
    const { session, toggleModal, signinBtn } = this.props;
    if (session && session.user) {
      // If signed in display user dropdown menu
      return (
        <Nav className="ml-auto" navbar>
          <div className="dropdown nojs-dropdown">
            <div className="nav-item">
              <span className="dropdown-toggle nav-link d-none d-md-block">
                <span
                  className="icon ion-md-contact"
                  style={{
                    fontSize: '2em',
                    position: 'absolute',
                    top: -5,
                    left: -25,
                  }}
                />
              </span>
              <span className="dropdown-toggle nav-link d-block d-md-none">
                <span className="icon ion-md-contact mr-2" />
                {session.user.name || session.user.email}
              </span>
            </div>
            <div className="dropdown-menu">
              <Link prefetch href="/account">
                <a href="/account" className="dropdown-item">
                  <span className="icon ion-md-person mr-1" />
                  Your Account
                </a>
              </Link>
              <AdminMenuItem {...this.props} />
              <div className="dropdown-divider d-none d-md-block" />
              <div className="dropdown-item p-0">
                <Form
                  id="signout"
                  method="post"
                  action="/auth/signout"
                  onSubmit={handleSignoutSubmit}
                >
                  <input name="_csrf" type="hidden" value={session.csrfToken} />
                  <Button
                    type="submit"
                    block
                    className="pl-4 rounded-0 text-left dropdown-item"
                  >
                    <span className="icon ion-md-log-out mr-1" />
                    Sign out
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Nav>
      );
    }
    if (signinBtn === false) {
      // If not signed in, don't display sign in button if disabled
      return null;
    }
    // If not signed in, display sign in button
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <a
            href="/auth?redirect=/"
            className="btn btn-outline-primary"
            onClick={toggleModal}
          >
            <span className="icon ion-md-log-in mr-1" />
            Sign up / Sign in
          </a>
        </NavItem>
      </Nav>
    );
  }
}

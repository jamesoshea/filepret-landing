import React from "react";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import Page from "../components/page";
import Layout from "../components/layout";
import HandshakeIcon from "../components/svg/handshake";
import KeyIcon from "../components/svg/key";
import DumpsterIcon from "../components/svg/dumpster";
import HeroImage from "../components/svg/hero";

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <Jumbotron
          className="text-light rounded-0"
          style={{
            backgroundColor: "rgba(73,155,234,1)",
            background:
              "radial-gradient(ellipse at center, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)",
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.1)"
          }}
        >
          <Container className="mt-2 mb-2">
            <h1 className="display-2 mb-3" style={{ fontWeight: 300 }}>
              <br className="v-block d-lg-none" /> Filepret
            </h1>
            <p className="text-center">wow sdovihdfoaj</p>
          </Container>
        </Jumbotron>
        <Container>
          <h2 className="text-center display-4 mt-5 mb-2">
            Why do I Need a Formatter?
          </h2>
          <h2 className="text-center display-4 mt-2 mb-5">Getting Started</h2>
          <p>Wow here is some amazing content</p>
        </Container>
      </Layout>
    );
  }
}

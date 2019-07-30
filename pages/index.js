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
            <p className="lead mb-5">
              A self-hostable file formatter and host
              {/* <p className="text-right" style={{ width: "100%" }}>
                <a
                  href="https://github.com/iaincollins/nextjs-starter"
                  className="btn btn-outline-light btn-lg"
                >
                  <span className="icon ion-logo-github mr-2" /> Check it out on
                  GitHub
                </a>
              </p> */}
            </p>
            <p className="text-center">
              <HeroImage color={"#499bea"} />
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <h2 className="text-center display-4 mt-5 mb-2">Features</h2>
          <Row className="pb-5">
            <Col xs="12" sm="4" className="pt-5">
              <p className="text-center">
                <HandshakeIcon height={200} />
              </p>
              <h3 className="text-center mb-4">Automatic formatting</h3>
              <p className="text-center">No more bikeshedding</p>
            </Col>
            <Col xs="12" sm="4" className="pt-5">
              <p className="text-center">
                <KeyIcon height={200} />
              </p>
              <h3 className="text-center mb-4">Secure Hosting</h3>
              <p className="text-center">SSL certs right out of the box</p>
            </Col>
            <Col xs="12" sm="4" className="pt-5">
              <p className="text-center">
                <DumpsterIcon height={200} />
              </p>
              <h4 className="text-center mb-4">Easy to Install</h4>
              <p className="text-center">
                Set up forwarding and run one script
              </p>
            </Col>
          </Row>
          <h2 className="text-center display-4 mt-2 mb-5">Getting Started</h2>
          <p>Wow here is some amazing content</p>
        </Container>
      </Layout>
    );
  }
}

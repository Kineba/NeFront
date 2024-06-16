import { Container, Row, Col } from "reactstrap";

const HomePageHeader = (props) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{props.title}</h1>
              <p className="text-white mt-0 mb-5">
                {props.description}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePageHeader;

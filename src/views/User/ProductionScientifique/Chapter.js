import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableChapter from "../TableProduction/TableChapter";

const Chapter = () => {
  return (
    <>
      <HeaderProd title="Chapitre d'ouvrage" description="Un chapitre d'ouvrage scientifique est une section ou une partie d'un livre qui aborde un sujet spécifique dans le domaine de la science. Ces chapitres sont généralement écrits par des experts ou des chercheurs dans le domaine et sont souvent utilisés comme sources de référence dans la recherche académique."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="14">
        <Card className="bg-secondary shadow">
            {/* <div className="text-center">
              <h3>
                Jessica Jones
                <span className="font-weight-light">, 27</span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Bucharest, Romania
              </div>
              <div className="h5 mt-4">
                <i className="ni business_briefcase-24 mr-2" />
                Solution Manager - Creative Tim Officer
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                <h1>Chapter</h1>
              </div>
              <hr className="my-4" />
              <p>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                Murphy — writes, performs and records all of his own music.
              </p>
              <a href="#pablo" onClick={(e) => e.preventDefault()}></a>
            </div> */}
            <TableChapter />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Chapter;

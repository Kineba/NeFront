import React from "react";
import HeaderProd from "components/Headers/HeaderProd";
import { Container, Col, Card } from "reactstrap";
import TableProjet from "../TableEvenement/TableProjet";

const Projet = () => {
  return (
    <>
      <HeaderProd title="Projet" description="Un projet dans un laboratoire de recherche informatique est une initiative planifiée et structurée qui vise à répondre à une question de recherche, à résoudre un problème informatique spécifique, à développer une nouvelle technologie ou à explorer de nouvelles idées dans le domaine de l'informatique. Il est généralement mené par une équipe de chercheurs, d'ingénieurs et parfois d'étudiants diplômés, sous la supervision d'un chef de projet ou d'un chercheur principal."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <TableProjet/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Projet;
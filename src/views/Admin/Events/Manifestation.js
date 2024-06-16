import React from "react";
import HeaderProd from "components/Headers/HeaderProd";
import { Container, Col, Card } from "reactstrap";
import TableManifestation from "../TableEvenement/TableManifestation";

const Manifestation = () => {
  return (
    <>
      <HeaderProd title="Manifestation" description="Une manifestation dans un laboratoire de recherche informatique est un événement planifié et organisé dans le but de partager des connaissances, des résultats de recherche ou des avancées technologiques dans le domaine de l'informatique. Cela peut inclure des conférences, des ateliers, des séminaires, des colloques, des symposiums, des expositions, des démonstrations, des compétitions, des hackathons, etc."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <TableManifestation/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Manifestation;
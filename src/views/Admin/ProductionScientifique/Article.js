import React from "react";

import TableArticle from "../TableProduction/TableArticle";
import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";

const ArticleAdmin = () => {
  return (
    <>
      <HeaderProd title="Article Scientifique" description="Un article scientifique est un document rédigé par des chercheurs afin de présenter les résultats de leurs travaux de recherche. Il est soumis à un processus d'évaluation par des pairs avant d'être publié dans une revue scientifique."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="15">
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
                <h1>Scientific Article</h1>
              </div>
              <hr className="my-4" />
              <p>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                Murphy — writes, performs and records all of his own music.
              </p>
              <a href="#pablo" onClick={(e) => e.preventDefault()}></a> 
            </div> */}
            {/* <UserArticleForm /> */}
            <TableArticle/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default ArticleAdmin;

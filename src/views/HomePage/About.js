import Footer from "components/Footers/Footer";
import React from "react";
import { Container, Col, Card } from "reactstrap";
import Video from "./Video";


const About = () => {
  return (
    <div>
      <Video />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-white shadow">
            <div className="m-md-n-5">
              <h1 className="display-3 text-info">
                {" "}
                Présentation du Laboratoire de l'Informatique de FSG
              </h1>
              <div className="text-dark text-justify">
                <p className="lead">
                  Le Laboratoire de Recherche Hatem Bettahar (IRESCOMATH) a été
                  créé en 2020 à la Faculté des Sciences de Gabès (FSG). Il
                  constitue une évolution de l'Unité de Recherche Hatem Bettahar
                  (IRESCOMATH) fondée en 2013. Ce laboratoire se concentre sur
                  la recherche en Technologies de l'Information et de la
                  Communication (TIC) et en Mathématiques Appliquées, offrant un
                  cadre pour les jeunes chercheurs du sud de la Tunisie. Il
                  favorise les collaborations nationales et internationales,
                  contribue à la recherche scientifique et technologique, et
                  promeut l'innovation dans les domaines des TIC. Le laboratoire
                  est équipé d'installations modernes et dispose d'une équipe de
                  chercheurs qualifiés. Ses principaux domaines de recherche
                  incluent, mais ne se limitent pas à :
                </p>
                <ul className="list-group-content">
                  <li>
                    Les Technologies de l'Information et de la Communication
                    (TIC)
                  </li>
                  <li>Les Mathématiques Appliquées</li>
                  <li>La Modélisation et la Simulation</li>
                  <li>L'Analyse des Données et l'Intelligence Artificielle</li>
                </ul>
                <p className="lead">
                  En tant qu'institution de recherche de premier plan dans la
                  région, l'IRESCOMATH s'engage à continuer à promouvoir
                  l'excellence dans la recherche scientifique, à former la
                  prochaine génération de chercheurs, et à jouer un rôle actif
                  dans le développement technologique de la Tunisie.
                </p>
              </div>
              <hr className="mt-0" />
              <h1 className="display-3 text-info"> Secteurs d'application</h1>
              <div className="text-dark text-justify">
                <p className="lead">
                  Systèmes d'informations, Réseaux et cybersécurité Intelligence
                  Artificielle Mathématiques
                </p>
              </div>
              <hr className="mt-0" />
              <h1 className="display-3 text-info"> Personnels</h1>
              <div className="text-dark text-justify">
                <ul className="list-group-content">
                  <li>Enseignants-chercheurs corps A : 06</li>
                  <li>Enseignants-chercheurs corps B : 26</li>
                  <li>Doctorants : 18</li>
                  <li>Mastères : 08</li>
                  {/* <li>Cadres: Ing/Téch : 04</li> */}
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Container>
      <Footer />
    </div>
  );
};

export default About;

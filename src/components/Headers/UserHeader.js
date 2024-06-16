import React, { memo } from "react";
// import React, { memo, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";

// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { getUser } from "actions/user.actions";

// Styles pour le document PDF
const styles = {
  page: {
    fontFamily: "Times-Roman",
    // fontFamily: "Arial",
    fontSize: 11,
    padding: 40,
  },
  // Style pour les bordures
  bordered: {
    border: 1,
    borderColor: "black",
    borderStyle: "solid",
    padding: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  column: {
    width: "50%",
    borderRightWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  tableCell: {
    flex: 1,
    border: "0.4px solid black",
    padding: 4,
  },
  section: {
    marginBottom: 10,
  },
  centeredText: {
    textAlign: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 15,
  },
  variableValue: {
    color: "#4a4a4a", // Couleur pour les valeurs des variables
  },
  variableLabel: {
    color: "#000000", // Couleur pour les noms de variables
  },

  signatureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signatureBlock: {
    width: "50%", // Ajuster la largeur selon vos besoins
    marginBottom: 30,
  },
  signature: {
    textAlign: "center",
    marginTop: 10,
  },
};
const formatDate = (isoDate) => {
  if (!isoDate) {
    return "";
  }
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
// Composant du document PDF
const MyDocument = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.bordered}>
          <View style={styles.section}>
            <Text style={styles.centeredText}>FICHE INDIVIDUELLE</Text>
          </View>

          <Text>
            (<Text style={{ fontWeight: "bold" }}>Obligatoire</Text>
            <Text style={styles.variableValue}>
              {" "}
              pour tout enseignant-chercheur, doctorant et cadre technique ayant
              un grade équivalent ou homologue au grade d’assistant
              d’enseignement supérieur. Elle doit être dûment remplie
            </Text>{" "}
            <Text style={{ fontWeight: "bold" }}>
              sous peine de ne pas être prise en considération)
            </Text>
          </Text>
        </View>

        <View style={styles.bordered}>
          <Text style={styles.variableValue}>
            - Tout enseignant-chercheur faisant partie d'un LR ou UR, ne peut
            faire partie d’une autre structure de recherche.{" "}
          </Text>
          <Text style={styles.variableValue}>
            - Tout doctorant doitfournir obligatoirement une attestation
            d’inscription au titre de l’année universitaire en cours. Ils seront
            comptabilisés, entant que membre du laboratoire, uniquement les
            doctorants ayant cumulés un maximum de 5 inscriptions à la date de
            soumission de la demande du laboratoire.
          </Text>
        </View>
      </View>

      <View style={styles.bordered}>
        <View>
          <View style={[styles.tableRow]}>
            <Text>
              <Text style={styles.centeredText}>
                1- IDENTIFICATION DU CHERCHEUR
              </Text>
            </Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={{ fontWeight: "bold" }}>
                Nom et Prénom:{" "}
                <Text style={styles.variableValue}>
                  {userData.firstName} {userData.lastName}
                </Text>
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Sexe:</Text>{" "}
                <Text style={styles.variableValue}>{userData.sexe}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>
                  Date et lieu de naissance:
                </Text>{" "}
                <Text style={styles.variableValue}>
                  {formatDate(userData.dateOfBirth)} , {userData.placeOfBirth}{" "}
                </Text>
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Matricule CNRPS:</Text>{" "}
                  <Text style={styles.variableValue}>
                    {userData.CNRPSregistration}
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>N° CIN (tunisien):</Text>{" "}
                <Text style={styles.variableValue}>{userData.cin}</Text>
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>
                  N° Passeport (étranger):
                </Text>{" "}
                <Text style={styles.variableValue}>{userData.passport}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>- Grade:</Text>{" "}
            <Text style={styles.variableValue}>{userData.grade}</Text>{" "}
            {"\u00A0".repeat(10)}{" "}
            <Text style={{ fontWeight: "bold" }}>depuis le:</Text>{" "}
            <Text style={styles.variableValue}>
              {formatDate(userData.dateGrade)}
            </Text>
            {"\u00A0".repeat(10)}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>- Téléphone:</Text>{" "}
            <Text style={styles.variableValue}>{userData.phone}</Text>
            {"\u00A0".repeat(10)}{" "}
            <Text style={{ fontWeight: "bold" }}>E-mail:</Text>{" "}
            <Text style={styles.variableValue}>{userData.email}</Text>
            {"\u00A0".repeat(10)}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>
              - Dernier diplôme obtenu:
            </Text>{" "}
            <Text style={styles.variableValue}>
              {userData.LastDegreeObtained}
            </Text>
            {"\u00A0".repeat(10)}{" "}
            <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
            <Text style={styles.variableValue}>
              {formatDate(userData.LastDegreeObtainedDate)}
            </Text>{" "}
            {"\u00A0".repeat(10)}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>- Etablissement:</Text>{" "}
            <Text style={styles.variableValue}>{userData.etablissement}</Text>
            {"\u00A0".repeat(10)}
          </Text>
        </View>
      </View>

      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text style={styles.centeredText}>
            2- IDENTIFICATION DE L’UNITE DE RECHERCHE (de rattachement)
          </Text>
        </View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>- Code de structure:</Text>{" "}
          <Text style={styles.variableValue}>LR20ES11</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>- Dénomination du L.R :</Text>{" "}
          <Text style={styles.variableValue}>
            Hatem Bettahar : Informatique, Réseaux, Systèmes de Communication et
            Mathématiques-IReSCoMath
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>- Etablissement :</Text>{" "}
          <Text style={styles.variableValue}>
            Faculté des Sciences de Gabès
          </Text>{" "}
          {"\u00A0".repeat(10)}
          <Text style={{ fontWeight: "bold" }}> Université :</Text>
          <Text style={styles.variableValue}>Université de Gabès</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>- Responsable du L.R.:</Text>{" "}
          <Text style={styles.variableValue}>Haifa Touati</Text>
        </Text>
      </View>
      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text style={styles.centeredText}>3- CASE RESERVEE AU DOCTORANT</Text>
        </View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            - Intitulé du sujet de recherche :
          </Text>{" "}
          <Text style={styles.variableValue}>{userData.title}</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>- Taux d’avancement :</Text>{" "}
          <Text style={styles.variableValue}>{userData.taux}%</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            - Année universitaire de la première inscription :
          </Text>{" "}
          <Text style={styles.variableValue}>
            {formatDate(userData.yearOfFirstRegistration)}
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            - Établissement universitaire (où est effectuée l’inscription) :
          </Text>{" "}
          <Text style={styles.variableValue}>
            {userData.UniversityEstablishment}
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            - Nom et prénom du directeur de thèse :
          </Text>{" "}
          <Text style={styles.variableValue}>
            {userData.firstNameLastNameDirector}
          </Text>
        </Text>
      </View>
      {/* Signatures */}
      <View style={styles.signatureContainer}>
        <View style={styles.signatureBlock}>
          <Text style={styles.signature}>Signature du chercheur</Text>
          <Text style={styles.signature}>Date : ...... /...... /.....</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text style={styles.signature}>Signature du chef du L.R.</Text>
          <Text style={styles.signature}>Date : ...... /...... /......</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text style={styles.signature}>
            Signature du chef de l’établissement
          </Text>
          <Text style={styles.signature}>Date : ...... /...... /......</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text style={styles.signature}>
            Signature du Président de l’Université
          </Text>
          <Text style={styles.signature}>Date : ...... /...... /......</Text>
        </View>
      </View>

      {/* <View style={styles.section}> */}
      <View style={[styles.section, { marginTop: 20 }]}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>NB :</Text>{" "}
          <Text style={styles.variableValue}>
            Les quatre signatures originales (non scannées) sont obligatoires
          </Text>{" "}
          <Text style={{ fontWeight: "bold" }}>
            sous peine de ne pas être prises en considération.
          </Text>
        </Text>
      </View>
    </Page>
  </Document>
);

const PDFButton = ({ userData }) => {
  return (
    !userData.isSecretaire && (
      <PDFDownloadLink
        document={<MyDocument userData={userData} />}
        fileName="fiche_individuelle.pdf"
      >
        {({ loading }) =>
          loading
            ? "Téléchargement en cours..."
            : "Télécharger fiche chercheur"
        }
      </PDFDownloadLink>
    )
  );
};

// Composant UserHeader
const UserHeader = (props) => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../.././assets/img/theme/profile-cover.jpg") +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
        {/* <Container fluid> */}
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-1 text-white">
                {" "}
                Bienvenue {props.firstName} {props.lastName}
              </h1>
              <h2 className="lead"><PDFButton userData={userData} /></h2>
              
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(UserHeader);

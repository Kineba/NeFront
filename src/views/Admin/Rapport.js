import React, { useState } from "react";
import {
  Container,
  CardHeader,
  Card,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader";

function Rapport() {
  const [filterType, setFilterType] = useState("annee");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [showSelectYearError, setShowSelectYearError] = useState(false);

  const toggleDropdown = () => {
    setError(""); // Clear any previous errors
    setShowSelectYearError(false);
    setDropdownOpen(!dropdownOpen);
  };
  const handleSelectedYearChange = (e) => {
    setSelectedYear(e.target.value);
    setShowSelectYearError(false);
    setError("");
  };
  
  const handleSelectedStartYearChange = (e) => {
    setSelectedStartYear(e.target.value);
    setShowSelectYearError(false);
    setError("");
  };
  
  const handleSelectedEndYearChange = (e) => {
    setSelectedEndYear(e.target.value);
    setShowSelectYearError(false);
    setError("");
  };

  const handleDownload = async () => {
    let url = `${process.env.REACT_APP_API_URL}api/user/productions?`;
    
    if (filterType === "annee") {
      if (!selectedYear) {
        setError("Veuillez sélectionner une année.");
        setShowSelectYearError(true);
        return;
      }
      url += `startYear=${selectedYear}`;
    }
    if (filterType === "intervalle")  {
      if (!selectedStartYear || !selectedEndYear) {
        setError("Veuillez sélectionner une année de début et une année de fin.");
        setShowSelectYearError(true);
        return;
      }
      url += `startYear=${selectedStartYear}&endYear=${selectedEndYear}`;
    }

    setError(""); // Clear any previous errors
    setShowSelectYearError(false); // Cacher le message d'erreur s'il était affiché

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", "productions.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  const yearsList = Array.from({ length: 100 }, (_, i) => 2000 + i);

  return (
    <>
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow-lg">
            <CardHeader className="bg-transparent border-0 ">
            <h1 className="heading-section text-info mb-4 text-center">
                Telecharger automatiquement le rapport ici !
              </h1>
              <div className="text-center text-body">
                <hr className="my-4" />
                <p>
                  NB: Choisissez un intervalle de date ou une date et cliquez
                  sur telecharger !
                </p>
              </div>
            </CardHeader>
            <Form className="article-form">
              <div className="pl-lg-4">
                <FormGroup>
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret className="bg-info text-white">
                      {filterType === "annee"
                        ? "Filtrer par année"
                        : "Filtrer par intervalle d'années"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setFilterType("annee")}>
                        Filtrer par année
                      </DropdownItem>
                      <DropdownItem onClick={() => setFilterType("intervalle")}>
                        Filtrer par intervalle d'années
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                {filterType === "annee" ? (
                  <FormGroup>
                    <Label for="year">Année :</Label>
                    <Input
                      type="select"
                      className="form-control"
                      id="year"
                      value={selectedYear}
                      onChange={handleSelectedYearChange}
                    >
                      <option value="">Sélectionner une année</option>
                      {yearsList.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                ) : (
                  <>
                    <FormGroup>
                      <Label className="form-control-label" for="startYear">
                        De l'année :
                      </Label>
                      <Input
                        type="select"
                        id="startYear"
                        className="form-control"
                        value={selectedStartYear}
                        onChange={handleSelectedStartYearChange}
                      >
                        <option value="">Sélectionner une année de début</option>
                        {yearsList.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label" for="endYear">
                        À l'année :
                      </Label>
                      <Input
                        type="select"
                        id="endYear"
                        className="form-control"
                        value={selectedEndYear}
                        onChange={handleSelectedEndYearChange}
                      >
                        <option value="">Sélectionner une année de fin</option>
                        {yearsList.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </>
                )}
                
                <div className="text-center">
                  <Button
                    onClick={handleDownload}
                    color="info"
                  >
                    Télécharger
                  </Button>
                </div>
                <hr/>
                {showSelectYearError && (
                  <div className="text-danger text-center mb-3">
                    {error}
                  </div>
                )}
              </div>
            </Form>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default Rapport;

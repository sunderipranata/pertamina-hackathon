/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// import { textAlign } from "@material-ui/system";

// import avatar from "assets/img/faces/marc.jpg";
import assetService from '../../services/AssetService'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {},
      name: "",
      scheme: "",
      asset_type: "",
      category: "",
      address: "",
      land_area: "",
      building_area: "",
      certificate_type: "",
      info: "",
      start_time: "",
      end_time: "",
      start_price: "",
      classes: props.classes
    };
  }

  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmitAsset = () => {
    let mockInput = {
      scheme: this.state.scheme || "",
      asset_type: this.state.asset_type || "",
      name: this.state.name || "",
      address: this.state.address || "",
      city: "",
      category: this.state.category || "",
      land_area: parseInt(this.state.land_area) || 0,
      building_area: parseInt(this.state.building_area) || "",
      certificate_type: this.state.certificate_type || "",
      info: this.state.info || "",
      start_price: parseInt(this.state.start_price) || 0,
      start_time: 1566669482470,
      end_time: 1566669482470
    };

    this.setState({ input: mockInput }, () => this.handleSendData());
  }

  handleSendData = () => {
    let payload = this.state.input;
    assetService.insertAsset(payload, (result) => {
      if (result.success) {
        console.log("result", result);
      }
    });
  }

  render() {
    let {
      classes,
      name,
      scheme,
      asset_type,
      category,
      address,
      land_area,
      building_area,
      certificate_type,
      info,
      start_time,
      end_time,
      start_price
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Tambah Aset Baru</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nama Aset"
                      id="name"
                      name="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("name", e)}
                      value={name}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sewa/Jual"
                      id="scheme"
                      name="scheme"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("scheme", e)}
                      value={scheme}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tipe Aset (Tanah/Bangunan)"
                      id="asset_type"
                      name="asset_type"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("asset_type", e)}
                      value={asset_type}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Aset cocok untuk"
                      id="category"
                      name="category"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("category", e)}
                      value={category}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Alamat"
                      id="address"
                      name="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange={e => this.handleChange("address", e)}
                      value={address}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Ukuran Tanah"
                      id="land_area"
                      name="land_area"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("land_area", e)}
                      value={land_area}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Ukuran Bangunan"
                      id="building_area"
                      name="building_area"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("building_area", e)}
                      value={building_area}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tipe Sertifikat"
                      id="certificate_type"
                      name="certificate_type"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("certificate_type", e)}
                      value={certificate_type}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Informasi Kontak"
                      id="info"
                      name="info"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("info", e)}
                      value={info}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tanggal Lelang Dimulai"
                      id="start_time"
                      name="start_time"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("start_time", e)}
                      value={start_time}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tanggal Lelang Berakhir"
                      id="end_time"
                      name="end_time"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("end_time", e)}
                      value={end_time}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Harga Awal"
                      id="start_price"
                      name="start_price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={e => this.handleChange("start_price", e)}
                      value={start_price}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  onClick={this.handleSubmitAsset.bind(this)}
                >
                  Tambah Aset
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <div style={{ position: "sticky", top: "32px" }}>
              <Card profile>
                {/* <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar> */}
                <CardBody profile>
                  <h4 style={{ marginTop: 0 }} className={classes.cardTitle}>
                    Rekomendasi
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridGap: "16px",
                      gridTemplateColumns: "repeat(2,1fr)",
                      textAlign: "left"
                    }}
                  >
                    <p className={classes.description}>Harga</p>
                    <p className={classes.description}>Rp800.000.000</p>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridGap: "16px",
                      gridTemplateColumns: "repeat(2,1fr)",
                      textAlign: "left"
                    }}
                  >
                    <p className={classes.description}>Kategori</p>
                    <p className={classes.description}>Kafe, Restoran</p>
                  </div>
                  <Button color="primary" round style={{ marginTop: "24px" }}>
                    Gunakan Rekomendasi
                  </Button>
                </CardBody>
              </Card>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);

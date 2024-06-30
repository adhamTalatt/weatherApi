import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

//Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//Custom Css
import "./wetherComponent.css";

//axios api
import axios from "axios";

// react hooks
import { useEffect, useState } from "react";

//i18next

import { useTranslation } from "react-i18next";

//json cauntries
import { countriesJson } from "./cityes.js";

//moment
import moment from "moment";
import "moment/dist/locale/ar-sa";
moment.locale("en");
//
export default function WeatherComponent() {
  const { t, i18n } = useTranslation();

  // =====start==========sueStates=====================
  const [openCard, setOpenCard] = useState(false);

  const [countries, setCountries] = useState({
    countryName: "Cairo",
    lat: 30.033333,
    lon: 31.233334,
  });
  const [dateAndTime, setDateAndTime] = useState("");

  const [temp, setTemp] = useState({
    tempNumber: null,
    max: null,
    min: null,
    description: "",
    icon: null,
  });
  const [local, setLocal] = useState("ar");
  // =====end==========sueStates=====================

  // ================== handle change language ==================
  const handleChangelang = () => {
    if (local == "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("en");
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("ar-sa");
    }
    setDateAndTime(moment().format("MMMM Do YYYY"));
  };

  let cancelAxios = null;

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY"));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countries.lat}&lon=${countries.lon}&appid=25e991a184cb85469de18868a4b6adce`,
        {
          //for cleanup useEffect and cancel Api requst
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // ============== API response data ==================
        const tempNumberResponse = Math.round(response.data.main.temp - 272.15);
        const maxNumberResponse = Math.round(
          response.data.main.temp_max - 272.15
        );

        const minNumberResponse = Math.round(
          response.data.main.temp_min - 272.15
        );

        const descriptionResponse = response.data.weather[0].description;
        const iconResponse = response.data.weather[0].icon;

        setTemp({
          tempNumber: tempNumberResponse,
          max: maxNumberResponse,
          min: minNumberResponse,
          description: descriptionResponse,
          icon: iconResponse,
        });
      })
      .catch(function (error) {
        // handle error
      });
    //for cleanup useEffect

    return () => {
      cancelAxios();
    };
  }, [countries]);

  const handleChangeCountries = () => {
    setOpenCard(true);
  };

  //card for choose city
  const CardCountries = ({ open }) => {
    const handleClose = () => {
      setOpenCard(false);
    };

    const shodow = countriesJson.map((e) => {
      return (
        <Button
          key={e.id}
          variant="text"
          onClick={() => {
            setCountries({
              countryName: e.city,
              lat: e.lat,
              lon: e.lon,
            });
            setOpenCard(false);
          }}
        >
          {t(e.city)}
        </Button>
      );
    });
    if (open == true) {
      return (
        <>
          <Dialog
            dir={local == "ar" ? "ltr" : "rtl"}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {t("Choose any city:")}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {shodow}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}> {t("Disagree")}</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Card
        variant="outlined"
        dir={local == "ar" ? "ltr" : "rtl"}
        sx={{
          background: "#0059b2",
          color: "#fff",

          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "start",
              paddingBottom: "10px",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "40px", sm: "50px", lg: "60px" },
                fontWeight: "600",
              }}
            >
              {t(countries.countryName)}
            </Typography>
            <Typography
              variant="h5"
              sx={
                local == "ar" ? { marginLeft: "20px" } : { marginRight: "20px" }
              }
            >
              {dateAndTime}
            </Typography>
          </div>
          <Divider sx={{ borderColor: "#fff", marginBottom: "10px" }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        xs: "50px",
                        sm: "100px",
                        lg: "100px",
                      },
                      marginRight: "10px",
                    }}
                  >
                    {temp.tempNumber}
                  </Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              </div>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "17px", sm: "25px", md: "30px", lg: "30px" },
                }}
              >
                {t(temp.description)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "25px", md: "25px", lg: "25px" },
                }}
              >
                <span>
                  {t("min")} :{temp.min}
                </span>{" "}
                |{" "}
                <span>
                  {t("max")} :{temp.max}
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                className="imgIcon"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div
        dir={local == "ar" ? "ltr" : "rtl"}
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 0 10px",
        }}
      >
        <Button
          sx={{ color: "#fff" }}
          variant="text"
          onClick={handleChangelang}
        >
          {local == "ar" ? "Arabic" : "الانجليزية"}
        </Button>
        <Button
          sx={{ color: "#fff" }}
          variant="text"
          onClick={handleChangeCountries}
        >
          {t(countries.countryName)}
        </Button>
      </div>
      <CardCountries open={openCard} />
    </div>
  );
}

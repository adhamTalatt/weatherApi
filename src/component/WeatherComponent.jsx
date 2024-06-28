import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

// image
import CloudImage from "../assets/cloudy.png";

//Custom Css
import "./wetherComponent.css";

//axios api
import axios from "axios";

// react hooks
import { useEffect, useState } from "react";

export default function WeatherComponent() {
  console.log("render component");

  const [temp, setTemp] = useState();

  let cancelAxios = null;

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=25e991a184cb85469de18868a4b6adce",
        {
          //for cleanup useEffect and cancel Api requst
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const tempAPI = Math.round(response.data.main.temp - 272.15);
        setTemp(tempAPI);
        console.log(tempAPI);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    //for cleanup useEffect
    return () => {
      console.log("cancelAxios");
      cancelAxios();
    };
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Card
        variant="outlined"
        sx={{
          direction: "rtl",
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
              القاهرة
            </Typography>
            <Typography variant="h5" sx={{ marginRight: "20px" }}>
              مايو 29 2023
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
                      fontSize: { xs: "50px", sm: "50px", lg: "100px" },
                      marginRight: "10px",
                    }}
                  >
                    {temp}
                  </Typography>
                  <img
                    src={CloudImage}
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
                borken clouds
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "25px", md: "25px", lg: "25px" },
                }}
              >
                <span>الصغري :38</span> | <span>الكبري :38</span>
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
              <img src={CloudImage} className="imgIcon" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 0 10px",
        }}
      >
        <Button sx={{ color: "#fff" }} variant="text">
          الانجليزية
        </Button>
        <Button sx={{ color: "#fff" }} variant="text">
          القاهرة
        </Button>
      </div>
    </div>
  );
}

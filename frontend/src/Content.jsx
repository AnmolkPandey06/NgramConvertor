import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
const endpoint = "http://localhost:6001";

function Content() {
  const [inputValueText, setInputValueText] = useState("");
  const [inputValueN, setInputValueN] = useState("");
  const [resultcur, setResultcur] = useState("");
  const [resultprev, setResultprev] = useState("");
  const handleInputChangeText = (event) => {
    setInputValueText(event.target.value);
  };

  const handleInputChangeN = (event) => {
    const numericInput = event.target.value.replace(/[^0-9]/g, "");
    setInputValueN(numericInput);
  };

  const handleButtonClick = async () => {
    const { data } = await axios.post(`${endpoint}/ngram`, {
      inputValueText,
      inputValueN,
    });
    setResultcur(data.ans1);
    setResultprev(data.ans2);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        N Gram Convertor
      </Typography>
      <form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Enter the sentence of which you want N gram
            </Typography>
            <TextField
              label="Enter something"
              variant="outlined"
              fullWidth
              value={inputValueText}
              onChange={handleInputChangeText}
            />
            <Typography variant="h6" gutterBottom>
              Enter the value of N (Only Integers)
            </Typography>
            <TextField
              label="Enter something"
              variant="outlined"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              fullWidth
              value={inputValueN}
              onChange={handleInputChangeN}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleButtonClick}
            >
              Show Result Now
            </Button>
          </Grid>
          {resultcur && resultprev && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Result for n={inputValueN}:
              </Typography>
              {resultcur.map((item) => (
                <p style={{ display: "inline" }}>{`{${item}}`}&nbsp;</p>
              ))}

              <Typography variant="h5" gutterBottom>
                For the previous query in Ngram convertor :
              </Typography>
              {resultprev.map((item) => (
                <p style={{ display: "inline" }}>{`{${item}}`}&nbsp;</p>
              ))}
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
}

export default Content;

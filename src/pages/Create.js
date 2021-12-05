import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault(); // to prevent the page from refresh on submit button clicked
    setDetailsError(false);
    setTitleError(false);

    if (details == "") {
      setDetailsError(true);
    }
    if (title == "") {
      setTitleError(true);
    }
    if (title && details) {
      // console.log(title, details, category);
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          color="textSecondary"
        >
          Create a New Note
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            // className={classes.field}
            style={{ marginTop: 20, marginBottom: 20, display: "block" }}
            varient="outlined"
            label="Note Title"
            color="secondary"
            fullWidth
            required
            error={titleError}
          />

          <TextField
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            style={{ marginTop: 20, marginBottom: 20, display: "block" }}
            varient="outlined"
            label="Details"
            color="secondary"
            fullWidth
            required
            multiline
            rows="4"
            error={detailsError}
          />

          <FormControl
            style={{ marginTop: 20, marginBottom: 20, display: "block" }}
          >
            <FormLabel component="legend">Note Category</FormLabel>
            <RadioGroup
              color="secondary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminder"
                control={<Radio />}
                label="Reminder"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

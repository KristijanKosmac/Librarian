import { Grid, TextField } from "@material-ui/core";
import useStyles from "../pages/home/home.styles";

interface Props {
  setAuthorName: Function;
  setAuthorSurname: Function;
  setCountry: Function;
  setContinent: Function;
}

export default function AddAurhorBody(props: Props) {
  const classes = useStyles();
  return (
    <Grid container spacing={1} style={{ marginTop: "10px" }}>
      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Author name: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          size="small"
          id="outlined-basic"
          label="Aurhor name"
          variant="outlined"
          onChange={(event) => props.setAuthorName(event.target.value)}
        />
      </Grid>

      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Author surname: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          size="small"
          id="outlined-basic0"
          label="Author surname"
          variant="outlined"
          onChange={(event) => props.setAuthorSurname(event.target.value)}
        />
      </Grid>

      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Country: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          size="small"
          id="outlined-basic1"
          label="Country"
          variant="outlined"
          onChange={(event) => props.setCountry(event.target.value)}
        />
      </Grid>
      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Continent: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          size="small"
          id="outlined-basic2"
          label="Continent"
          variant="outlined"
          onChange={(event) => props.setContinent(event.target.value)}
        />
      </Grid>
    </Grid>
  );
}

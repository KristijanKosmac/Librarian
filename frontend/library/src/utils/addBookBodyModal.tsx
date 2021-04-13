import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import useStyles from "../pages/home/home.styles";
import { AuthorIntercace } from "../pages/home/home.page";

interface Props {
  selectedAuthor: AuthorIntercace;
  selectedCategory: string;
  handleChangeCategory: Function;
  handleChangeAuthor: Function;
  categories: string[];
  authors: AuthorIntercace[];
  setBookTitle: Function;
  setAvailableCopies: Function;
  title: string;
  AvailableCopies: number;
}

export default function AddBookBody(props: Props) {
  const classes = useStyles();
  return (
    <Grid container spacing={1} style={{ marginTop: "10px" }}>
      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Book title: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          value={props.title}
          required
          size="small"
          id="outlined-basic"
          label="Book title"
          variant="outlined"
          onChange={(event) => props.setBookTitle(event.target.value)}
        />
      </Grid>

      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Available copies: </label>
      </Grid>
      <Grid item xs={8}>
        <TextField
          value={props.AvailableCopies}
          required
          size="small"
          id="filled-number"
          label="Available copies"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(event) => props.setAvailableCopies(event.target.value)}
        />
      </Grid>

      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Category: </label>
      </Grid>
      <Grid item xs={8}>
        <FormControl variant="outlined" size="small" className={classes.select}>
          <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
          <Select
            displayEmpty
            required
            native
            value={props.selectedCategory}
            onChange={(event) => props.handleChangeCategory(event.target.value)}
            label="Category"
          >
            <option aria-label="None" value="" />
            {props.categories.map((category) => (
              <option>{category}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ margin: "10px" }}>Author: </label>
      </Grid>
      <Grid item xs={8}>
        <FormControl variant="outlined" size="small" className={classes.select}>
          <InputLabel htmlFor="outlined-age-native-simple">Author</InputLabel>
          <Select
            required
            native
            value={`${props.selectedAuthor.name} ${props.selectedAuthor.surName}`}
            onChange={(event) => {
              const value: string = event.target.value as string;
              const author = props.authors.find(
                (author) =>
                  value.split(" ")[0] === author.name &&
                  value.split(" ")[1] === author.surName
              );
              props.handleChangeAuthor(author);
            }}
            label="Category"
          >
            <option aria-label="None" value="" />
            {props.authors.map((author) => (
              <option
                key={author.id}
              >{`${author.name} ${author.surName}`}</option>
            ))}
            <option>{`test`}</option>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

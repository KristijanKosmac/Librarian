import React from "react";
import { toast } from "react-toastify";
import bookShopApi from "../../api/bookShopApi";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./bookCard.styles";

import CustomModal from "../../components/modal/modal.component";
import AddBookBody from "../../utils/addBookBodyModal";
import { AuthorIntercace } from "../../pages/home/home.page";

interface Props {
  id: string;
  index: number;
  bookName: string;
  bookAuthor: AuthorIntercace;
  bookCategory: string;
  bookAvailableCopies: number;
  selectedAuthor: AuthorIntercace;
  selectedCategory: string;
  availableCopies: number;
  title: string;
  categories: string[];
  authors: AuthorIntercace[];
  decreaseCopies: Function;
  handleDeleteBook: Function;
  handleChangeCategory: Function;
  handleChangeAuthor: Function;
  setBookTitle: Function;
  setAvailableCopies: Function;
  fetch: Function;
}

const BookCard = (props: Props) => {
  const classes = useStyles();

  const [openEditBookModal, setOpenEditBookModal] = React.useState(false);

  const handleOpenModal = () => {
    console.log(props.id);
    props.setBookTitle(props.bookName);
    props.setAvailableCopies(props.bookAvailableCopies);
    props.handleChangeAuthor(props.bookAuthor);
    props.handleChangeCategory(props.bookCategory);
    setOpenEditBookModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditBookModal(false);
  };

  const handleSubmit = async () => {
    console.log(
      props.id,
      props.title,
      props.selectedCategory,
      props.selectedAuthor,
      props.availableCopies
    );
    try {
      await bookShopApi.editBook(
        props.id,
        props.title,
        props.selectedCategory,
        props.selectedAuthor,
        props.availableCopies
      );
      toast.success("succesfuly edited Book");
      props.fetch();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <CustomModal
        title="Edit book"
        open={openEditBookModal}
        setOpen={setOpenEditBookModal}
        handleClose={handleCloseModal}
        buttonName="edit"
        body={
          <AddBookBody
            authors={props.authors}
            categories={props.categories}
            handleChangeCategory={props.handleChangeCategory}
            handleChangeAuthor={props.handleChangeAuthor}
            selectedCategory={props.selectedCategory}
            selectedAuthor={props.selectedAuthor}
            setAvailableCopies={props.setAvailableCopies}
            setBookTitle={props.setBookTitle}
            title={props.title}
            AvailableCopies={props.availableCopies}
          />
        }
        onClick={() => handleSubmit()}
      />

      <Grid item xs={props.index > 2 ? 6 : 4}>
        <Card className={`root ${props.index > 2 && classes.bottomCard}`}>
          <CardHeader title={props.bookName} />
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Author: {`${props.bookAuthor.name} ${props.bookAuthor.surName}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Category: {props.bookCategory}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Available copies: {props.bookAvailableCopies}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.dispalyButtons}>
            <Button size="small" color="primary" onClick={handleOpenModal}>
              Edit
            </Button>
            <Button
              size="small"
              className={classes.warning}
              onClick={() => {
                props.decreaseCopies(props.id);
                toast.success("Successfully taken book!");
              }}
            >
              Mark as taken
            </Button>
            <Button
              size="small"
              className={classes.delete}
              onClick={() => props.handleDeleteBook(props.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default BookCard;

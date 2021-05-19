// third-party libraries
import React, { ReactElement } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

// components

// css
import "../styles/Results.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types";

const ResultsCard = ({ id, title, cover }: Book): ReactElement => {
  // TODO: dynamically render table header with updated
  // books object

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Link to={`/title/${id}`}>
      <Card className={classes.root}>
        {/* <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
        <CardMedia
          className={classes.media}
          image={cover}
          title={`cover for book ${id}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title || "no title"}
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> */}
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse> */}
      </Card>
    </Link>
  );
};

export default ResultsCard;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 250,
      display: "inline-block",
      margin: 10,
    },
    media: {
      height: 250,
      // paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const renderTable = (results: Book[]) => {
  return (
    <table className="resultsTable">
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {results.map((curResult, index) => (
          // TODO: check for element type before rendering components
          // maybe a switch case:
          // case "book"
          // case "artist"
          // etc.
          <tr key={index}>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                <img
                  src={curResult.cover}
                  alt={`cover for book ${curResult.id}`}
                  className="tableCoverImage"
                />
              </Link>
            </td>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                {curResult.title}
              </Link>
            </td>
            <td>
              <Link to={`/title/${curResult.id}`} className="titleLink">
                {curResult.id}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

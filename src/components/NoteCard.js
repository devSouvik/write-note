import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Avatar, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { blue, deepOrange, green, pink, yellow } from "@mui/material/colors";
import { bgcolor } from "@mui/system";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return pink;
      }
      if (note.category == "reminders") {
        return green;
      }
      if (note.category == "todos") {
        return blue;
      }
      return yellow;
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor: randomColor(),
              }}
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => {
                handleDelete(note.id);
              }}
            >
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNote = notes.filter((note) => note.id != id);
    setNotes(newNote);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };

  return (
    <Container>
      {/* === normal grid view === */}
      {/* <Grid container spacing={3}>
        {notes.map((note) => {
          return (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Grid>
          );
        })}
      </Grid> */}

      {/* === masonry view ===  */}
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => {
          return (
            <div item key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}

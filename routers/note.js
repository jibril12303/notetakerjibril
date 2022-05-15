const fs = require("fs");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// helpers
const readNotesFile = () => {
  const readNotes = fs.readFileSync("./db/db.json").toString();
  const notes = JSON.parse(readNotes);
  return notes;
};
const WriteNotesFile = (note) => {
  fs.writeFileSync("./db/db.json", JSON.stringify(note));
};

router.get("/api/notes", (req, res) => {
  const notes = readNotesFile();
  res.status(200).send(notes);
});

router.post("/api/notes", (req, res) => {
  const notes = readNotesFile();
  const data = { ...req.body, id: uuidv4() };
  notes.push(data);
  WriteNotesFile(notes);
  res.status(201).send(data);
});

router.delete(`/api/notes/:id`, (req, res) => {
  const notes = readNotesFile();
  const deleteNote = notes.filter((note) => note.id !== req.params.id);
  WriteNotesFile(deleteNote);
  res.status(200).send();
});

module.exports = router;

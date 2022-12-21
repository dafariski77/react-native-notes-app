import axios from "axios";

export const saveNote = (title, note, author) => {
  const requestingData = {
    title: title,
    note: note,
    author: author,
  };

  axios
    .post("https://mynotesapi78.herokuapp.com/", requestingData)
    .then((response) => {
      alert("Note saved!");
    })
    .catch((error) => alert(error));
};

export const editNote = (id, title, note, author) => {
  const requestingData = {
    title: title,
    note: note,
    author: author,
  };

  axios
    .patch(`https://mynotesapi78.herokuapp.com/${id}`, requestingData)
    .then((response) => {
      alert("Note updated");
    })
    .catch((error) => alert(error));
};

export const deleteNote = (id) => {
  axios
    .delete(`https://mynotesapi78.herokuapp.com/${id}`)
    .then((response) => alert("Note deleted!"))
    .catch((error) => alert(error));
};

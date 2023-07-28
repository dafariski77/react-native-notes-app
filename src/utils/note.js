import axios from "axios";

export const saveNote = (title, note, author) => {
  const requestingData = {
    title: title,
    note: note,
    author: author,
  };

  axios
    .post(`https://witty-moth-fez.cyclic.app/notes`, requestingData)
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
    .put(`https://witty-moth-fez.cyclic.app/notes/${id}`, requestingData)
    .then((response) => {
      alert("Note updated");
    })
    .catch((error) => alert(error));
};

export const deleteNote = (id) => {
  axios
    .delete(`https://witty-moth-fez.cyclic.app/notes/${id}`)
    .then((response) => alert("Note deleted!"))
    .catch((error) => alert(error));
};

import axios from "axios";

const createActivity = (groupId, activity, events) => {
  return axios
    .post("/api/groups/" + groupId + "/activities", { activity, events })
    .then(response => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

export {createActivity}
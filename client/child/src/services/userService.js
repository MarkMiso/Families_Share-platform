import axios from "axios";

const fetchGroups = (userId) => {
  return axios
    .get(`/api/users/${userId}/groups`)
    .then(response => {
      response.data.map((group) => {
        group.isMember = true;
        return group;
      })
      
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const fetchEvents = (userId) => {
  return axios
    .get(`/api/users/${userId}/events`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

export {fetchGroups, fetchEvents};
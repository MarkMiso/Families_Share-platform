import axios from "axios";

const fetchGroupsAll = () => {
  return axios
  .get("/api/groups?searchBy=visibility&visible=true")
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error);
    return {};
  });
}

const fetchActivites = (groupId) => {
  return axios
    .get(`/api/groups/${groupId}/activities`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const fetchActivityEvents = (activityId, groupId) => {
  return axios
    .get(`/api/groups/${groupId}/activities/${activityId}/timeslots`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

export { fetchGroupsAll, fetchActivites, fetchActivityEvents }
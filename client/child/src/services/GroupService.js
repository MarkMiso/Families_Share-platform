import axios from "axios";

const fetchGroupsAll = () => {
  return axios
  .get("/api/groups?searchBy=visibility&visible=true")
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error);
    return [];
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

const fetchGroup = groupId => {
  return axios
    .get(`/api/groups/${groupId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return {
        image: { path: "" },
        group_id: "",
        name: ""
      };
    });
};

const fetchGroupSettings = groupId => {
  return axios
    .get(`/api/groups/${groupId}/settings`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return {
        open: ""
      };
    });
};

export { fetchGroupsAll, fetchActivites, fetchActivityEvents, fetchGroup, fetchGroupSettings }
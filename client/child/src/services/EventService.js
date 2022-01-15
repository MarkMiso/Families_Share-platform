import axios from "axios";

const addChild = (event, childId) => {
  const group_id = event.extendedProperties.shared.groupId;
  const activity_id = event.extendedProperties.shared.activityId;
  const timeslot_id = event.id;

  const children = JSON.parse(event.extendedProperties.shared.children);
  children.push(childId);
  event.extendedProperties.shared.children = JSON.stringify(children);

  return axios
    .patch(`/api/groups/${group_id}/activities/${activity_id}/timeslots/${timeslot_id}`, event)
    .then(Response => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    })
}

const removeChild = (event, childId) => {
  const group_id = event.extendedProperties.shared.groupId;
  const activity_id = event.extendedProperties.shared.activityId;
  const timeslot_id = event.id;

  let children = JSON.parse(event.extendedProperties.shared.children);
  children = children.filter((item) => {return item !== childId});
  event.extendedProperties.shared.children = JSON.stringify(children);

  return axios
    .patch(`/api/groups/${group_id}/activities/${activity_id}/timeslots/${timeslot_id}`, event)
    .then(Response => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    })
}

export {addChild, removeChild}
import apiService from "../../../api-utils/api-service";

const getLocalGovernments = (stateID) => {
  return apiService(`/api/v1/transcribe/state/${stateID}/lgas`, "GET");
};

const localGovernmentAPI = {
  getLocalGovernments,
};

export default localGovernmentAPI;

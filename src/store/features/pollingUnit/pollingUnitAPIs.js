import apiService from "../../../api-utils/api-service";

const getPollingUnits = (unitID) => {
  return apiService(`/api/v1/transcribe/lga/${unitID}/units`, "GET");
};

const pollingUnitAPI = {
  getPollingUnits,
};

export default pollingUnitAPI;

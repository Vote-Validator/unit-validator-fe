import apiService from "../../../api-utils/api-service";

const storeTranscribedData = (data) => {
  return apiService(`/api/v1/transcribe`, "POST", data);
};

const transcribeAPI = {
  storeTranscribedData,
};

export default transcribeAPI;

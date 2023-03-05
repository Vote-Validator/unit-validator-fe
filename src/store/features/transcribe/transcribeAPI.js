import apiService from "../../../api-utils/api-service";

const storeTranscribedData = (data) => {
  return apiService(`/api/v1/transcribe`, "POST", data);
};

const markImageAsUnclear = (id) => {
  return apiService(`/api/v1/transcribe/image/${id}/unclear`, "GET");
};

const transcribeAPI = {
  storeTranscribedData,
  markImageAsUnclear,
};

export default transcribeAPI;

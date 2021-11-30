import axios from "axios";
import axiosRetry from "axios-retry";

const client = axios.create({
  baseURL: "http://app-homevision-staging.herokuapp.com/api_project",
});

axiosRetry(client, {
  // Calback that control the condition to retry a failed request
  //In this case it retries if it is a network error or a 5xx error
  retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
});

export default client;

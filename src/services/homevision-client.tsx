import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { HousesModel } from "./../models/house-model";

export default class Client {
  private client: AxiosInstance;

  constructor() {
    this.client = this.createAxios();

    axiosRetry(this.client, {
      // Calback that control the condition to retry a failed request
      // In this case it retries if it is a network error or a 5xx error
      retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
    });
  }

  private createAxios(): AxiosInstance {
    return axios.create({
      baseURL: "http://app-homevision-staging.herokuapp.com/api_project",
    });
  }

  public async getHousesPromise(page: number, housesPerPage: number) {
    return await this.client.get<HousesModel>(
      `/houses?page=${page}&per_page=${housesPerPage}`
    );
  }
}

// const client = axios.create({
//   baseURL: "http://app-homevision-staging.herokuapp.com/api_project",
// });

// axiosRetry(client, {
//   // Calback that control the condition to retry a failed request
//   // In this case it retries if it is a network error or a 5xx error
//   retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
// });

// export default client;

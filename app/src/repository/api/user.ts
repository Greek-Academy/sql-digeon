import type { UserCreationMonths } from "@/entity/user";
import type { UserRepository } from "@/repository/interface/user";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export class UserRepositoryAPI implements UserRepository {
  // axiosを使ってダウンロード
  async fetchCreationMonths(): Promise<UserCreationMonths[]> {
    const res = await axios.get<UserCreationMonths[]>("/users/creation-months");
    return res.data;
  }
}

import axios from "axios";
import { API_URL } from "@/lib/constants";
import { UserModel } from "../models/UserModel";
import { TransactionModel } from "../models/TransactionModel";

export interface Response {
  data: UserModel[];
  pages: number;
}

export async function getUserList({
  page,
  search,
}: {
  page?: string;
  search?: string;
}): Promise<Response> {
  const response = await axios.get(`${API_URL}/user/list`, {
    params: {
      page,
      search,
    },
  });

  return response.data;
}

export const getUserTransaction = async (
  id?: string
): Promise<TransactionModel[]> => {
  const response = await axios.get(`${API_URL}/user/${id}/transactions`);
  return response.data;
};

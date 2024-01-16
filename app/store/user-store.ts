import { proxy } from "valtio";
import { UserModel } from "../models/UserModel";

interface UserProxy {
  user: UserModel | null;
  open: boolean;
}

export const state = proxy<UserProxy>({ open: false, user: null });

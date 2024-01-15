export interface UserModel {
  id: number;
  avatar: string;
  name: string;
  email: string;
  password: string | null;
  created_at: string;
  subscription: Subscription;
  role: string;
  tg_id: string;
}

interface Subscription {
  additional_tokens: number;
  created_at: string;
  id: string;
  plan: {
    currency: string;
    id: string;
    price: number;
    tokens: number;
    type: string;
  };
  plan_id: string;
  user_id: string;
  tokens: number;
}

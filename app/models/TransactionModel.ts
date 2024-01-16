export interface TransactionModel {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  meta: string | null;
  status: string;
  type: string;
  plan_id: string | null;
  user_id: string;
  referral_id: string | null;
  created_at: Date | null;
  external_id: string | null;
}

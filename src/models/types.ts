export interface PaymentRequest {
  sender: string;
  recipient: string;
  amount: number;
  currency: string;
}

export interface Payment extends PaymentRequest {
  id: string;
  date: string;
}
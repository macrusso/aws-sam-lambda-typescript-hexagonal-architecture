import { Payment, PaymentRequest } from "../models/types";
import * as paymentRepo from "../repositories/paymentRepository";
import { v4 as uuidv4 } from "uuid";

export const create = async (paymentRequest: PaymentRequest): Promise<Payment> => {
  const id = uuidv4();
  const date = new Date().toISOString();

  const paymentToStore: Payment = {
    id,
    date,
    sender: paymentRequest.sender,
    recipient: paymentRequest.recipient,
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
  };

  return await paymentRepo.create(paymentToStore);
};

export const getAll = async () => {
  return await paymentRepo.getAll();
};

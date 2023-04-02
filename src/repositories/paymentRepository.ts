import { PaymentEntity } from "../models/payments";
import { Payment } from "../models/types";

export const create = async (item: Payment): Promise<Payment> => {
  await PaymentEntity.put({
    id: item.id,
    sender: item.sender,
    recipient: item.recipient,
    amount: item.amount,
    currency: item.currency,
    date: item.date,
  });

  return item;
};

export const getAll = async (): Promise<Payment[]> => {
  const result = await PaymentEntity.scan();

  if (result.Items?.length) return [];

  return result.Items as Payment[];
};

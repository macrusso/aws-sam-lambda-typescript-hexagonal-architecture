import { PaymentEntity } from "../models/payments";
import { Payment } from "../models/types";

export const create = async (item: Payment): Promise<Payment> => {
  console.log("paymentRepo create", item);
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
  console.log("paymentRepo getAll");
  // TODO: add GSI of active payment or something like that
  // to use query rather then scan for improved performance
  const result = await PaymentEntity.scan();

  if (!result.Items?.length) return [];

  return result.Items as Payment[];
};

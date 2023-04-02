import { PaymentEntity } from "../models/payments";
import { Payment } from "../models/types";
import * as paymentRepo from "./paymentRepository";

describe("Payment Repository", () => {
  it("DB is called with required payload", async () => {
    const payment: Payment = {
      sender: "sender",
      recipient: "recipient",
      amount: 100,
      currency: "GBP",
      id: "some_id",
      date: "2023-04-02T17:45:54.772Z",
    };

    const result = await paymentRepo.create(payment);

    expect(result).toStrictEqual(payment);
  });
});

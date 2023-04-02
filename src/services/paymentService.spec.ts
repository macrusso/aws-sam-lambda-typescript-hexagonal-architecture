import { Payment, PaymentRequest } from "../models/types";
import * as paymentService from "./paymentService";
import * as paymentRepo from "../repositories/paymentRepository";

describe("Payment Service", () => {
  it("Adds id and date before storing in the db", async () => {
    const payload: PaymentRequest = {
      sender: "sender",
      recipient: "recipient",
      amount: 100,
      currency: "GBP",
    };

    const result = await paymentService.create(payload);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
  });
});

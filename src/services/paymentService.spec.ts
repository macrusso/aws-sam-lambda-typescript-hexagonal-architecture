import { Payment, PaymentRequest } from "../models/types";
import * as paymentService from "./paymentService";
import * as paymentRepo from "../repositories/paymentRepository";

describe("Payment Service", () => {
  const payload: PaymentRequest = {
    sender: "sender",
    recipient: "recipient",
    amount: 100,
    currency: "GBP",
  };

  const payment: Payment = {
    ...payload,
    id: "some_id",
    date: "2023-04-02T17:45:54.772Z",
  };

  it("Adds id and date before storing in the db", async () => {
    const createMock = jest.spyOn(paymentRepo, "create");
    createMock.mockResolvedValue(payment);

    const result = await paymentService.create(payload);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
  });

  it("Returns all payments", async () => {
    const payments: Payment[] = [
      {
        sender: "sender",
        recipient: "recipient",
        amount: 100,
        currency: "GBP",
        id: "some_id",
        date: "2023-04-02T17:45:54.772Z",
      },
    ];

    const createMock = jest.spyOn(paymentRepo, "getAll");
    createMock.mockResolvedValue(payments);

    const result = await paymentService.getAll();

    expect(result).toStrictEqual(payments);
  });
});

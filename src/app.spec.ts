import { APIGatewayProxyEvent } from "aws-lambda";
import { postPayment } from "./app";
import { Payment } from "./models/types";
import * as paymentService from "./services/paymentService";

describe("App Handlers", () => {
  it("Returns stringified results", async () => {
    const payload = {
      body: JSON.stringify({
        sender: "sender",
        recipient: "recipient",
        amount: 100,
        currency: "GBP",
      }),
      httpMethod: "POST",
    } as any as APIGatewayProxyEvent;

    const payment: Payment = {
      sender: "sender",
      recipient: "recipient",
      amount: 100,
      currency: "GBP",
      id: "some_id",
      date: "2023-04-02T17:45:54.772Z",
    };

    const createMock = jest.spyOn(paymentService, "create");
    createMock.mockResolvedValue(payment);

    const result = await postPayment(payload);

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(payment),
    });
  });
});

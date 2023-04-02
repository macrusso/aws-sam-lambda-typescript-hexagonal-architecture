import { APIGatewayProxyEvent } from "aws-lambda";
import { getPayments, postPayment } from "./app";
import { Payment } from "./models/types";
import * as paymentService from "./services/paymentService";

describe("App Handlers", () => {
  describe("Post Payments", () => {
    it("Returns stringified results on post payment", async () => {
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

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const result = await postPayment(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty payment body`,
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        body: JSON.stringify({
          sender: "sender",
          recipient: "recipient",
          amount: 100,
          currency: "GBP",
        }),
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await postPayment(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts POST method, you tried: GET method.`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify({
          sender: "sender",
          recipient: "recipient",
          amount: 100,
          currency: "GBP",
        }),
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(paymentService, "create");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await postPayment(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });

  describe("Get All Payments", () => {
    it("Returns stringified results on get payments", async () => {
      const payload = {
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

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

      const createMock = jest.spyOn(paymentService, "getAll");
      createMock.mockResolvedValue(payments);

      const result = await getPayments(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify(payments),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const result = await getPayments(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts GET method, you tried: POST method.`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(paymentService, "getAll");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await getPayments(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });
});

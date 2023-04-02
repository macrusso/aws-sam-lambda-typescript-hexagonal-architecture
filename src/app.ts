import { APIGatewayProxyEvent } from "aws-lambda";
import { PaymentRequest } from "./models/types";
import * as paymentService from "./services/paymentService";

export const postPayment = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body || "{}") as PaymentRequest;
  const result = await paymentService.create(body);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

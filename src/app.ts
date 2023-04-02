import { APIGatewayProxyEvent } from "aws-lambda";
import { PaymentRequest } from "./models/types";
import * as paymentService from "./services/paymentService";

interface Response {
  statusCode: number;
  body: string;
}

export const postPayment = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    const body = JSON.parse(event.body || "{}") as PaymentRequest;
    const result = await paymentService.create(body);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

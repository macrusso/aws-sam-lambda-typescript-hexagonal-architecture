import { APIGatewayProxyEvent } from "aws-lambda";
import { PaymentRequest } from "./models/types";
import * as paymentService from "./services/paymentService";

interface Response {
  statusCode: number;
  body: string;
}

export const postPayment = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(`Only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body || "{}") as PaymentRequest;

    if (Object.keys(body).length === 0) {
      throw new Error(`Empty payment body`);
    }

    const result = await paymentService.create(body);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    if (error.statusCode) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    } else {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
};

export const getPayments = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(`Only accepts GET method, you tried: ${event.httpMethod} method.`);
    }

    const result = await paymentService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    if (error.statusCode) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    } else {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
};

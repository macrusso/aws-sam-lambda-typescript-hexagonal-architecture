import { Table, Entity } from "dynamodb-toolbox";
import DynamoDB from "aws-sdk/clients/dynamodb";

const DocumentClient = new DynamoDB.DocumentClient({
  convertEmptyValues: false,
  region: "eu-west-1",
});

const PaymentsTable = new Table({
  name: "payments",
  partitionKey: "id",
  DocumentClient,
});

export const PaymentEntity = new Entity({
  name: "Payment",
  attributes: {
    id: { partitionKey: true },
    sender: { type: "string" },
    recipient: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
    date: { type: "string" },
  },
  table: PaymentsTable,
} as const);

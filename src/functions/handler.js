"use strict";

export async function hello(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
      message: "Go Serverless v1.0! Your function executed successfully!",
      },
      null,
      2
    ),
  };
}

import { ZodError } from "zod";

export const responseSuccess = (data: any) => {
  return Response.json(
    {
      code: "0000",
      message: "Success",
      data: data,
    },
    { status: 200 }
  );
};

export const responseError = (
  code: string,
  message: any,
  status: number = 200
) => {
  console.error(
    `response http status ${status} with error: ${code} - ${message}`
  );

  if (message instanceof ZodError) {
    console.error(message.errors);
    return Response.json(
      {
        code: code,
        message: message.errors,
      },
      {
        status: status,
      }
    );
  }

  return Response.json(
    {
      code: code,
      message: message,
    },
    {
      status: status,
    }
  );
};

/*
    Payment Callback API is used to receive the payment status from the payment service
    You can implement your logic here to handle the payment status
*/

export async function POST(request: Request) {
  const req = await request.json();
  console.info("POST /api/payment/callback called with request", req);
}

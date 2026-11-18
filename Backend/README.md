# Midtrans Sandbox

1. Copy `.env.example` to `.env.local` if you do not already have a backend environment file.
2. Set `MIDTRANS_SERVER_KEY` to the Sandbox server key from the Midtrans dashboard. This mobile redirect flow does not need to expose either key to the app; `MIDTRANS_CLIENT_KEY` is reserved for a future client-side Snap.js integration.
3. Keep `MIDTRANS_IS_PRODUCTION=false` while testing, then restart the backend so Next.js loads the environment variables.
4. Configure the Midtrans **Payment Notification URL** to `https://<public-backend-host>/api/payments/midtrans/notification`. For local development, expose the backend with an HTTPS tunnel and use that tunnel URL. Midtrans cannot send notifications to `localhost` or a private LAN address. The order status screen also checks pending transactions directly with Midtrans, so a webhook is not the only way to synchronize a payment.
5. In the mobile app, create an order and continue to the Midtrans Snap checkout page. The order remains pending until Midtrans confirms payment; tickets are issued only after payment is confirmed.
6. For Sandbox QRIS, complete the test with the [Midtrans QRIS Simulator](https://simulator.sandbox.midtrans.com/v2/qris/index). Sandbox QR codes are not payable through a real bank or e-wallet app.

The mobile app must never contain the server key. The Snap checkout URL is created by the backend.

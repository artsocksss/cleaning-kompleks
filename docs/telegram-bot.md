# Telegram Bot + Mini App

## Environment variables

- `TELEGRAM_BOT_TOKEN` — token from @BotFather. Never commit it.
- `TELEGRAM_ADMIN_CHAT_ID` — chat ID that should receive bot notifications when notification delivery is added.
- `TELEGRAM_WEBAPP_URL` — public HTTPS URL of the Cleaning Kompleks landing page, for example `https://cleaning-kompleks.vercel.app`.

## Webhook

After deployment, configure the Telegram webhook to:

`https://YOUR-DOMAIN/api/telegram/webhook`

The bot responds to `/start` with an inline Mini App button. Telegram Mini Apps require an HTTPS URL in production.

## Bot setup

1. Open @BotFather in Telegram.
2. Create a bot with `/newbot` and copy the token into Vercel Environment Variables.
3. Set the Mini App URL with BotFather's menu-button / web-app configuration.
4. Deploy the site.
5. Set the webhook to the endpoint above.

The token must exist only in Vercel server-side environment variables.

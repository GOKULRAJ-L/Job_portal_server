import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://4cf8428207a338f334542d23e7ee7a77@o4509359304540160.ingest.us.sentry.io/4509359307292672",
  sendDefaultPii: true,
});
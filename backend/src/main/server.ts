import app from "./app";
import { env } from "../infrastructure/config/env";

app.listen(env.port, () => {
  console.log(`Server running on ${env.port}`);
});
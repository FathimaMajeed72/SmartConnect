import { APP_NAME, APP_TAGLINE } from "@/core/constants/app";

export default function Logo() {
  return (
    <div className="select-none">
      <h1 className="text-xl font-bold text-primary">
        {APP_NAME}
      </h1>
      <p className="text-xs text-muted-foreground">
        {APP_TAGLINE}
      </p>
    </div>
  );
}
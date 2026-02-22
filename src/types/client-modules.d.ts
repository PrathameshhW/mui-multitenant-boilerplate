declare module "@client/*" {
  import type { ComponentType } from "react";

  const ClientModule: ComponentType<any>;
  export default ClientModule;
}

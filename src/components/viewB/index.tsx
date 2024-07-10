import { AppDIProvider } from "../viewA/di-container/AppDependencyContext";
import { CUSTOM_DI_CONTAINER } from "./di-container/custom-container";
import Lists from "../viewA/list";

const ViewB = () => {
  return (
    <AppDIProvider container={CUSTOM_DI_CONTAINER}>
      <h2>This is a Custom Container Example</h2>
      <Lists />
    </AppDIProvider>
  );
};

export default ViewB;

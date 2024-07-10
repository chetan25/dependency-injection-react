import { AppDIProvider } from "./di-container/AppDependencyContext";
import { DEFAULT_DI_CONTAINER } from "./di-container/default-container";
import Lists from "./list";

const ViewA = () => {
  return (
    <AppDIProvider container={DEFAULT_DI_CONTAINER}>
      <h2>This is a default Container Example</h2>
      <Lists />
    </AppDIProvider>
  );
};

export default ViewA;

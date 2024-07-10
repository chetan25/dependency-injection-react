import { createContext, ReactNode, useContext } from "react";
import { Registry } from "./default-container";

export type DIType = {
  registry: Registry;
  resolve: () => Registry;
};

export const AppDIContext = createContext<DIType | null>(null);

const useDIContext: () => never | Registry = () => {
  const container = useContext(AppDIContext);
  if (!container) {
    throw new Error(
      "DI container not found. This hook can only be used in a branch of the DI container"
    );
  }
  return container.resolve();
};

export const useDIContainer = (): Registry => {
  const registry = useDIContext();
  return registry as Registry;
};

export const AppDIProvider = ({
  children,
  container,
}: {
  children: ReactNode;
  container: DIType;
}) => {
  return (
    <AppDIContext.Provider value={container}>{children}</AppDIContext.Provider>
  );
};

---
Title: React Dependency Injection
Excerpt: A simple vite based React app, demonstrating how to use Dependency Injection in frontend
Tech: "React, Vite, Typescript"
---

# React Dependency Injection

The definition of Dependency Injection in software programming is:

> Dependency injection is a programming technique in which an object or function receives other objects or functions that it requires, as opposed to creating them internally.

- Example of DI in Java is shown below

```java
// Direct Coupling of dependency and MyApplication APP
public class MyApplication {

  // coupling
	private EmailService email = new EmailService();

	public void processMessages(String msg, String rec){}
}

// Simple way of implementing DI
public class MyApplication {

	private EmailService email = null;

  // Now the Dependency is Injected in the constructor
	public MyApplication(EmailService svc){
		this.email=svc;
	}

  public void processMessages(String msg, String rec){}
}
```

- In the land of javascript and React we can think of `Dependency as any static imports` we do in that file.

```js
// This is an example of Coupled Dependecny
import getData from "..";
```

- These imports ties the Component to the static imported functionality, data or UI element and re using the same UI design for different data/functionality becomes harded, we would end up copying the whole file and updating the imports as needed.

## Some Alternatives

- A simple alternative of de coupling these dependecies would be to `inject them via Props` in React, and we have been using this for a long time to pass in data to our React components.

```js

// import getData from ".."; Delete this

const MySuperCOmponent = ({getData, ...}) => {}
```

- This works but it has some drawbacks:

  1. It bloats the component, as we might be passing a lots of props.
  2. We just shifted the coupling to the parent component and using a same dependency is another component leads to dublicating the effort.
  3. Depedency management becomes a problem.

- So what could be a better solution, its `Dependecny Injection via Context`

## Dependency Injection Via Context

- In React we are already using Context to share state, in a un coupled way with components.
- We can easily extend this basic concept for dependencies.
- Let's see how we will go about it

  1. First we need to decide what dependecies are hard coupling, in short all data, functionality related imports should be taken out. A visual component should not care about the data or logic, it should just be aware of what to call to get data or perfrom an action.
  2. Now we need to create a Context for our DI. This will host all our dependecies and make them available.

  ```js
  const AppDIContext = createContext();
  ```

  3. We will define the default values for our Registry Container.

  ```js
  import { getDefaultListData } from "../hooks/getListData";
  import { useLogger } from "../hooks/useLogger";

  const DEFAULT_DI_CONTAINER = {
    registry: {
      getListData: getDefaultListData,
      useLogger,
    },
    resolve() {
      return this.registry;
    },
  };
  ```

  4. Now we setup our Provider that will house all components that have access to the DI context. The `container` here is the DI container will all the values that we want to Inject.

  ```js
  const AppDIProvider = ({ children, container }) => {
    return (
      <AppDIContext.Provider value={container}>
        {children}
      </AppDIContext.Provider>
    );
  };
  ```

  5. To make the consumption simple, we have created a hook to consume the Context.

  ```js
  const useDIContainer = () => {
    const container = useContext(AppDIContext);
    if (!container) {
      throw new Error(
        "DI container not found. This hook can only be used in a branch of the DI container"
      );
    }
    return container.resolve();
  };
  ```

  Since the return value of this hook is an Object with all the Dependecy's as key value pair, we can destruct it and consume what we need.

  ```js
  import { useDIContainer } from "../di-container/AppDependencyContext";

  const Lists = () => {
  	const { getListData, useLogger } = useDIContainer();
  	useLogger();
  	const data = getListData();

  	return ();
  };

  ```

  6. And now we just need to wrap the component tree where we need the DI benefits

  ```js
  // ViewA
  <AppDIProvider container={DEFAULT_DI_CONTAINER}>
    <h2>This is a default Container Example</h2>
    <Lists />
  </AppDIProvider>
  ```

- This is very usefull when we want to extend from an exiting code base or want it to behave differently at runtime, only thing we need to do is update the container value.
- Let's suppose we want to build a UI similar to our ViewA app but with slight differences in our new app ViewB.
- Only thing we need to do is create a new registry container that overrides the dependecny we need and extend the ones already there.

```js
import { getCustomListData } from "../hooks/getListData";
import { DIType } from "from ViewA";
import { DEFAULT_DI_CONTAINER } from "from ViewA";

const CUSTOM_DI_CONTAINER = {
  registry: {
    // this makes sure we get all the default functionality and override or add new ones
    ...DEFAULT_DI_CONTAINER.registry,
    getListData: getCustomListData,
  },
  resolve() {
    return this.registry;
  },
};
```

- Now we create our ViewB re using component from ViewA app along with our new container.

```js
import { AppDIProvider } from "from ViewA";
import Lists from "from ViewA";

import { CUSTOM_DI_CONTAINER } from "./di-container/custom-container";

const ViewB = () => {
  return (
    <AppDIProvider container={CUSTOM_DI_CONTAINER}>
      <h2>This is a Custom Container Example</h2>
      <Lists />
    </AppDIProvider>
  );
};

export default ViewB;
```

## Local Development

- This repo is boot strapped with Vite, running the following commands to get going:

  > npm install
  > npm run dev

- The repo has following:
  - An App file `app.tsx` that just mimics a remote housing two host `ViewA` and `ViewB`.
  - The views here mimic two different Apps, build independently.
  - ViewB is basically extending ViewA to customize some data and functionality but render a similar UI.
  - In real world ViewB will install ViewA as a npm dependecny.
  - ViewB is using almost everything from ViewA, except that it creates it own container with the override value for the getData function.

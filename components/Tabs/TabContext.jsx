// TabContext.js
import { createContext, useReducer, useContext } from "react";

const TabStateContext = createContext();
const TabDispatchContext = createContext();

const initialState = {
  aboutMeTab: "opened",
  technologiesTab: "opened",
};

function tabReducer(state, action) {
  switch (action.type) {
    case "OPEN_TAB":
      return { ...state, [action.tab]: "open" };
    case "CLOSE_TAB":
      return { ...state, [action.tab]: "closed" };
    case "MINIMIZE_TAB":
      return { ...state, [action.tab]: "minimized" };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function TabProvider({ children }) {
  const [state, dispatch] = useReducer(tabReducer, initialState);
  return (
    <TabStateContext.Provider value={state}>
      <TabDispatchContext.Provider value={dispatch}>
        {children}
      </TabDispatchContext.Provider>
    </TabStateContext.Provider>
  );
}

export function useTabState() {
  const context = useContext(TabStateContext);
  if (context === undefined) {
    throw new Error("useTabState must be used within a TabProvider");
  }
  return context;
}

export function useTabDispatch() {
  const context = useContext(TabDispatchContext);
  if (context === undefined) {
    throw new Error("useTabDispatch must be used within a TabProvider");
  }
  return context;
}

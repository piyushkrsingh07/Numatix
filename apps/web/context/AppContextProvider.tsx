import combineContext from "./combineContext";
import { SocketContextProvider } from "./SocketContext";
import { SymbolContextProvider } from "./SymbolProvider";
import { ThemeContextProvider } from "./ThemeProvider";


export const AppContextProvider=combineContext(
  SocketContextProvider,
  ThemeContextProvider,
  SymbolContextProvider
)
import { AuthContextProvider } from "./AuthContext";
import combineContext from "./combineContext";
import { PriceContextProvider } from "./LimitPriceContext";
import { SocketContextProvider } from "./SocketContext";
import { SymbolContextProvider } from "./SymbolProvider";
import { ThemeContextProvider } from "./ThemeProvider";


export const AppContextProvider=combineContext(
    AuthContextProvider,
  SocketContextProvider,
  ThemeContextProvider,
  SymbolContextProvider,

  PriceContextProvider
)
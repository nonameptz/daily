import { createContext } from "react";

// tslint:disable-next-line:no-empty
const ThemeContext = createContext<[string, (theme: string) => void]>(["dog", () => {}]);

export default ThemeContext;
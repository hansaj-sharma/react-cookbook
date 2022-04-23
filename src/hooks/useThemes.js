import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContetext";

export const useTheme = () => {
    const context = useContext(ThemeContext)
    // this is just an extra bit of logic 
    if (context === undefined) {
        throw new Error('useTheme must be used inside a theme provider')
    }

    return context
}
import "../styles/globals.css";
import "highlight.js/styles/github-dark.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

// Function to update CSS variables based on theme
function updateThemeVariables(backgroundColor: string, textColor: string) {
    document.documentElement.style.setProperty('--theme-bg', backgroundColor);
    document.documentElement.style.setProperty('--theme-text', textColor);
}

export default function App({ Component, pageProps }: AppProps) {
    // Set default theme on initial load
    useEffect(() => {
        // Default dracula theme colors
        updateThemeVariables("#282a36", "#f8f8f2");
    }, []);

    return <Component {...pageProps} />;
} 
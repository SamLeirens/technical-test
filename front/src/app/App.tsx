import React, { useEffect } from 'react';
import './App.css';
import { EventOverview } from "./event/EventOverview.component";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTranslation } from "react-i18next";
import "../config/i18n/i18n.config";

const queryClient = new QueryClient()

function App() {

    const { i18n } = useTranslation();
    useEffect(() => {
        i18n.changeLanguage("en")
    }, [i18n]);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <EventOverview/>
            </QueryClientProvider>
        </>
    );
}

export default App;

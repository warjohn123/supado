import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Sidebar } from "./components/sidebar/sidebar.component";
import { ClientLayout } from "./layouts/client";

export function AppRoutes() {

    return (
        <Router>
            <ClientLayout></ClientLayout>
        </Router>
    )
}
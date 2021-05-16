import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Navbar } from "../components/navbar/navbar.component";
import { Sidebar } from "../components/sidebar/sidebar.component";
import { TodosPage } from "../pages/todos/todos.page";

export function ClientLayout() {

    return (
        <>
            <Sidebar></Sidebar>
            <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
                <Navbar />
                {/* <HeaderStats /> */}
                <div className="px-4 md:px-10 mx-auto w-full">
                    <Switch>
                        <Route path="/admin/todos" exact component={TodosPage} />
                        <Redirect from="/admin" to="/admin/todos" />
                    </Switch>
                    {/* <FooterAdmin /> */}
                </div>
            </div>
        </>

    )
}
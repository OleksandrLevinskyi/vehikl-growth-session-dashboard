import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom"

describe("Growth Sessions Dashboard App", () => {
    test("renders the heading", () => {
        render(<App/>);
        const headingElement = screen.getByText(/GS Analytics Dashboard/);
        expect(headingElement).toBeInTheDocument();
    });

    test("renders the tabs", () => {
        render(<App/>);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Node Graph")).toBeInTheDocument();
        expect(screen.getByText("Heat Map")).toBeInTheDocument();
    });

    test("renders Dashboard when \"Dashboard\" tab is selected", async () => {
        render(<App/>);

        const link = screen.getByText("Dashboard");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/dashboard")

        expect(screen.getByTestId("custom-date-picker")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-iframe")).toBeInTheDocument();
    });

    test("renders Node graph when \"Node Graph\" tab is selected", async () => {
        render(<App/>);

        const link = screen.getByText("Node Graph");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/node-graph")

        expect(screen.getByText("Filter By Specific Node")).toBeInTheDocument();
        expect(screen.getByText("Filter By Multiple Nodes")).toBeInTheDocument();
        expect(screen.getByTestId("node-graph")).toBeInTheDocument();
    });

    test("renders heat map when \"Heat Map\" tab is selected", async () => {
        render(<App/>);

        const link = screen.getByText("Heat Map");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/heat-map")

        expect(screen.getByTestId("heat-map")).toBeInTheDocument();
    });

    test("renders Dashboard with \"/dashboard\" url", async () => {
        window.history.pushState({}, "Dashboard", "/dashboard")

        render(<App/>)

        expect(screen.getByTestId("custom-date-picker")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-iframe")).toBeInTheDocument();
    })

    test("renders Node Graph with \"/node-graph\" url", async () => {
        window.history.pushState({}, "Node Graph", "/node-graph")

        render(<App/>)

        expect(screen.getByText("Filter By Specific Node")).toBeInTheDocument();
        expect(screen.getByText("Filter By Multiple Nodes")).toBeInTheDocument();
        expect(screen.getByTestId("node-graph")).toBeInTheDocument();
    });

    test("renders Heat Map with \"/heat-map\" url", async () => {
        window.history.pushState({}, "Heat Map", "/heat-map")

        render(<App/>)

        expect(screen.getByTestId("heat-map")).toBeInTheDocument();
    })
});

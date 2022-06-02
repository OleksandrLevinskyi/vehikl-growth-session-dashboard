import React from "react";
import LoggedInUI from "./LoggedInUI";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"

describe("Growth Sessions Dashboard App", () => {
    test("renders the heading", () => {
        render(<LoggedInUI/>);

        const headingElement = screen.getByText(/GS Analytics Dashboard/);

        expect(headingElement).toBeInTheDocument();
    });

    test("renders the tabs", () => {
        render(<LoggedInUI/>);

        expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
        expect(screen.getByText("NODE GRAPH")).toBeInTheDocument();
        expect(screen.getByText("HEAT MAP")).toBeInTheDocument();
    });

    test("renders Dashboard when \"Dashboard\" tab is clicked", async () => {
        render(<LoggedInUI/>);

        const link = screen.getByText("DASHBOARD");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/dashboard");
        expect(screen.getByTestId("custom-date-picker")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-iframe")).toBeInTheDocument();
    });

    test("renders Node graph when \"Node Graph\" tab is clicked", async () => {
        render(<LoggedInUI/>);

        const link = screen.getByText("NODE GRAPH");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/node-graph");
        expect(screen.getByText("FILTER BY SPECIFIC NODE")).toBeInTheDocument();
        expect(screen.getByText("FILTER BY MULTIPLE NODES")).toBeInTheDocument();
        expect(screen.getByTestId("node-graph")).toBeInTheDocument();
    });

    test("renders heat map when \"Heat Map\" tab is clicked", async () => {
        render(<LoggedInUI/>);

        const link = screen.getByText("HEAT MAP");
        userEvent.click(link);

        expect(window.location.pathname).toEqual("/heat-map");
        expect(screen.getByTestId("heat-map")).toBeInTheDocument();
    });

    test("renders Dashboard with \"/dashboard\" url", async () => {
        window.history.pushState({}, "Dashboard", "/dashboard");

        render(<LoggedInUI/>);

        expect(screen.getByTestId("custom-date-picker")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-iframe")).toBeInTheDocument();
    })

    test("renders Node Graph with \"/node-graph\" url", async () => {
        window.history.pushState({}, "Node Graph", "/node-graph");

        render(<LoggedInUI/>);

        expect(screen.getByText("FILTER BY SPECIFIC NODE")).toBeInTheDocument();
        expect(screen.getByText("FILTER BY MULTIPLE NODES")).toBeInTheDocument();
        expect(screen.getByTestId("node-graph")).toBeInTheDocument();
    });

    test("renders Heat Map with \"/heat-map\" url", async () => {
        window.history.pushState({}, "Heat Map", "/heat-map")

        render(<LoggedInUI/>)

        expect(screen.getByTestId("heat-map")).toBeInTheDocument();
    })
});

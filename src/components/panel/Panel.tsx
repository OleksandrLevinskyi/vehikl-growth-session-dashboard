import React from "react";
import "./Panel.css";

interface IPanelProps {
    from: string,
    to: string,
    panelId: string
}

const Panel: React.FC<IPanelProps> = ({from, to, panelId}) => {
    const src = `${process.env.REACT_APP_GRAFANA_URL}/d-solo/IvJGVgTnk/new-dashboard?orgId=1&from=${from}&to=${to}&panelId=${panelId}`

    return (
        <iframe src={src} frameBorder="0"/>
    );
}

export default Panel;

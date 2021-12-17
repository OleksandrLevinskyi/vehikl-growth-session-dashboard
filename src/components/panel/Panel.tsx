import React from 'react';
import './Panel.css';

type PanelProps = {
    from: string,
    to: string,
    panelId: string
}

export const Panel: React.FC<PanelProps> = ({from, to, panelId}) => {
    let src = `http://localhost:3005/d-solo/IvJGVgTnk/new-dashboard?orgId=1&from=${from}&to=${to}&panelId=${panelId}`

    return (
        <iframe src={src} frameBorder="0"/>
    );
}

export default Panel;

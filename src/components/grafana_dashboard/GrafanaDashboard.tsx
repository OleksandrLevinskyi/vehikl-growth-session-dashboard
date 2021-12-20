import React from 'react';
import './GrafanaDashboard.css';

function GrafanaDashboard() {
    return (
        <>
            <iframe src="http://localhost:3005/d/IvJGVgTnk/new-dashboard?orgId=1&kiosk&theme=light" frameBorder="0"/>
        </>
    );
}

export default GrafanaDashboard;

import React, {useState} from 'react';
import './GrafanaDashboard.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState(new Date('2020-05-21'));
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end)

        console.log(start.getTime())
    };

    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
            <iframe
                src={`http://localhost:3005/d/ndxFSP07k/stats?orgId=1&var-from=${startDate.toISOString().split('T')[0]}&var-to=${(endDate ? endDate : startDate).toISOString().split('T')[0]}&from=${startDate.getTime()}&to=${endDate ? endDate.getTime() : 'now'}&theme=light`}
                frameBorder="0"/>
        </>
    );
}

export default GrafanaDashboard;

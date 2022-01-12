import React, {useState} from 'react';
import './GrafanaDashboard.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DateTime} from 'luxon'


const DATE_FORMAT = 'yyyy-MM-dd'

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState<DateTime>(DateTime.local(2020, 5, 21));
    const [endDate, setEndDate] = useState<DateTime | null>();

    const onChange = (dates: Array<Date | null>) => {
        const [start, end] = dates;
        setStartDate(DateTime.fromJSDate(start!));
        setEndDate(end ? DateTime.fromJSDate(end) : null);
    };

    const endDateQP = (date: DateTime | null = DateTime.local()) => {
        return `${(date ? date : DateTime.local()).toFormat(DATE_FORMAT)}`
    }
    return (
        <>
            <DatePicker
                selected={startDate.toJSDate()}
                onChange={onChange}
                startDate={startDate.toJSDate()}
                endDate={endDate ? endDate.toJSDate() : null}
                selectsRange
                inline
            />
            <iframe
                src={`http://localhost:3005/d/ndxFSP07k/stats?orgId=1&var-from=${startDate.toFormat(DATE_FORMAT)}&var-to=${endDateQP(endDate)}&from=${startDate.toMillis()}&to=${endDate ? endDate.toMillis() : 'now'}&theme=light`}
                frameBorder="0"/>
        </>
    );
}



export default GrafanaDashboard;

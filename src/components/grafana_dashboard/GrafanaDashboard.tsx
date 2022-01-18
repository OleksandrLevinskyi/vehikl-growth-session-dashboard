import React, {useState} from 'react';
import './GrafanaDashboard.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DateTime} from 'luxon';
import {CustomDatePicker} from '../custom_date_picker/CustomDatePicker';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay
} from "@chakra-ui/react";


const DATE_FORMAT = 'yyyy-MM-dd'

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState<DateTime>(DateTime.local(2020, 5, 21));
    const [endDate, setEndDate] = useState<DateTime | null>();
    const [filtersOpen, setFiltersOpen] = useState(false);

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
            <Button onClick={()=>setFiltersOpen(!filtersOpen)}>Open Filters</Button>

            <CustomDatePicker/>

            <iframe
                src={`http://localhost:3005/d/ndxFSP07k/stats?orgId=1&var-from=${startDate.toFormat(DATE_FORMAT)}&var-to=${endDateQP(endDate)}&from=${startDate.toMillis()}&to=${endDate ? endDate.toMillis() : 'now'}&theme=light`}
                frameBorder="0"/>
        </>
    );
}


export default GrafanaDashboard;

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
import moment from "moment";


const DATE_FORMAT = 'yyyy-MM-dd'
export const MIN_DATE = moment().year(2020).month(4).date(21);
export const MAX_DATE = moment().add(1, 'month')

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState<any>(moment().year(2020).month(4).date(21));
    const [endDate, setEndDate] = useState<DateTime | null>();

    const endDateQP = (date: DateTime | null = DateTime.local()) => {
        return `${(date ? date : DateTime.local()).toFormat(DATE_FORMAT)}`
    }
    return (
        <>
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>

            {/*<iframe*/}
            {/*    src={`http://localhost:3005/d/ndxFSP07k/stats?orgId=1&var-from=${startDate.toFormat(DATE_FORMAT)}&var-to=${endDateQP(endDate)}&from=${startDate.toMillis()}&to=${endDate ? endDate.toMillis() : 'now'}&theme=light`}*/}
            {/*    frameBorder="0"/>*/}
        </>
    );
}


export default GrafanaDashboard;

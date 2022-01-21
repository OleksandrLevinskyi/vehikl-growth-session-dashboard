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


export const DATE_FORMAT = 'YYYY-MM-DD'
export const MIN_DATE = moment().year(2020).month(4).date(21).hours(0).minutes(0).seconds(0);
export const MAX_DATE = moment().add(1, 'month')

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState(MIN_DATE);
    const [endDate, setEndDate] = useState(MAX_DATE);

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

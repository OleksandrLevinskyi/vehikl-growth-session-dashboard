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
import moment, {Moment} from "moment";


const DASHBOARD_URL = 'http://localhost:3005/d/ndxFSP07k/stats?orgId=1';
export const DATE_FORMAT = 'YYYY-MM-DD'
export const MIN_DATE = moment().year(2020).month(4).date(21).hours(0).minutes(0).seconds(0);
export const MAX_DATE = moment().hours(23).minutes(59).seconds(59);

function GrafanaDashboard() {
    const [startDate, setStartDate] = useState(MIN_DATE);
    const [endDate, setEndDate] = useState(MAX_DATE);

    function getDashboardLink() {
        if (!startDate || !endDate) return;

        let varFrom = formatDate(startDate),
            varTo = formatDate(endDate),
            from = dateToUnixTimeStamp(startDate),
            to = dateToUnixTimeStamp(endDate);
        return `${DASHBOARD_URL}&var-from=${varFrom}&var-to=${varTo}&from=${from}&to=${to}&theme=light`;
    }

    const dateToUnixTimeStamp = (date: Moment) => date.unix() * 1000;

    const formatDate = (date: Moment) => date.format(DATE_FORMAT)

    return (
        <>
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate}
                              setEndDate={setEndDate}/>

            <iframe src={getDashboardLink()}/>
        </>
    );
}


export default GrafanaDashboard;

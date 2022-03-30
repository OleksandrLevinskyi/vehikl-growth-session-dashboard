import React, {useEffect, useState} from 'react';
import './GrafanaDashboard.css';
import 'react-dates/lib/css/_datepicker.css';
import {CustomDatePicker} from '../custom_date_picker/CustomDatePicker';
import moment, {Moment} from "moment";
import {Link as RouteLink} from "react-router-dom";
import {Center, Flex, Text} from "@chakra-ui/react";

const DASHBOARD_URL = 'http://localhost:3005/d/ndxFSP07k/stats?orgId=1';
export const DATE_FORMAT = 'YYYY-MM-DD'
export const MIN_DATE = moment().year(2020).month(4).date(21).hours(0).minutes(0).seconds(0);
export const MAX_DATE = moment().hours(23).minutes(59).seconds(59);

export const dateToUnixTimeStamp = (date: Moment) => date.unix() * 1000;
export const unixTimeStampToDate = (date: number) => moment.unix(date / 1000);
export const formatDate = (date: Moment) => date.format(DATE_FORMAT)

function GrafanaDashboard({colorMode}: any) {
    const [startDate, setStartDate] = useState(MIN_DATE);
    const [endDate, setEndDate] = useState(MAX_DATE);
    const [dashboardLink, setDashboardLink] = useState<string | null>();

    useEffect(() => {
        getDashboardLink();
    }, [colorMode])

    function getDashboardLink() {
        if (!startDate || !endDate) {
            setDashboardLink(null)
            return;
        }

        let varFrom = formatDate(startDate),
            varTo = formatDate(endDate),
            from = dateToUnixTimeStamp(startDate),
            to = dateToUnixTimeStamp(endDate);
        setDashboardLink(`${DASHBOARD_URL}&var-from=${varFrom}&var-to=${varTo}&from=${from}&to=${to}&theme=${colorMode}&kiosk`);
    }

    useEffect(() => {
        getDashboardLink();
    }, [endDate, startDate])

    return (
        <>
                <span data-testid="custom-date-picker">
                    <Flex p={2} justify='center' fontSize='xl'>
                            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate}
                                              setEndDate={setEndDate}/>
                    </Flex>
                </span>
            {dashboardLink ? <iframe src={dashboardLink} data-testid="dashboard-iframe"/> :
                <p>Please select a valid date range</p>}
        </>
    );
}

export default GrafanaDashboard;

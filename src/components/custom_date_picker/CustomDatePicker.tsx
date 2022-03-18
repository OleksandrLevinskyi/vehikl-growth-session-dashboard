import React, {useState} from "react";
import 'react-dates/initialize';
import {DateRangePicker, FocusedInputShape} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {MAX_DATE, MIN_DATE} from "../grafana_dashboard/GrafanaDashboard";
import { useNavigate } from "react-router-dom";
import {Moment} from "moment";

type CustomDatePickerProps = { startDate: any, setStartDate: any, endDate: any, setEndDate: any }

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({startDate, setStartDate, endDate, setEndDate}) => {

    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const history = useNavigate();

    const props = {
        numberOfMonths: 1,
        minDate: MIN_DATE,
        displayFormat: 'YYYY-MM-DD',
        isOutsideRange: (day: any) => {
            const unixTimestamp = day.unix()
            return !(unixTimestamp >= MIN_DATE.unix() && unixTimestamp <= MAX_DATE.unix());
        }
    }

    const dateToUnixTimeStamp = (date: Moment) => date.unix() * 1000;
    return (<>
        <DateRangePicker
            {...props}
            startDate={startDate}
            startDateId={START_DATE}
            endDate={endDate}
            endDateId={END_DATE}
            onDatesChange={({startDate, endDate}) => {
                setStartDate(startDate)
                setEndDate(endDate)

                //change url to be startdate-end
                history(`/dashboard/${dateToUnixTimeStamp(startDate as any)}-${dateToUnixTimeStamp(endDate as any)}`)
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput ?? null)}
        />
    </>)


}
import React, {useState, useEffect} from "react";
import 'react-dates/initialize';
import {DateRangePicker, FocusedInputShape} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {MAX_DATE, MIN_DATE, unixTimeStampToDate} from "../grafana_dashboard/GrafanaDashboard";
import {useSearchParams, useNavigate} from "react-router-dom";
import {Moment} from "moment";

interface ICustomDatePickerProps {
    startDate: any,
    setStartDate: any,
    endDate: any,
    setEndDate: any
}

const CustomDatePicker: React.FC<ICustomDatePickerProps> = ({startDate, setStartDate, endDate, setEndDate}) => {

    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const history = useNavigate();

    let [searchParams] = useSearchParams();

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

    useEffect(() => {
        let date = searchParams.get('date');

        if (!date) {
            history(`/dashboard?date=${dateToUnixTimeStamp(MIN_DATE)}-${dateToUnixTimeStamp(MAX_DATE)}`)
        } else {
            const [queryStartDate, queryEndDate] = date.split('-');

            setStartDate(unixTimeStampToDate(Number(queryStartDate)));
            setEndDate(unixTimeStampToDate(Number(queryEndDate)));
        }
    }, [])

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

                if (startDate && endDate) {
                    history(`/dashboard?date=${dateToUnixTimeStamp(startDate as any)}-${dateToUnixTimeStamp(endDate as any)}`)
                }
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput ?? null)}
        />
    </>)
}

export default CustomDatePicker;
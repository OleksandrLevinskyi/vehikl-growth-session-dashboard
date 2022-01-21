import React, {useState} from "react";
import 'react-dates/initialize';
import {DateRangePicker, SingleDatePicker, DayPickerRangeController, FocusedInputShape} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {MAX_DATE, MIN_DATE} from "../grafana_dashboard/GrafanaDashboard";

type CustomDatePickerProps = { startDate: any, setStartDate: any, endDate: any, setEndDate: any }

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({startDate, setStartDate, endDate, setEndDate}) => {

    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const props = {
        numberOfMonths: 1,
        minDate: MIN_DATE,
        displayFormat: 'YYYY-MM-DD',
        isOutsideRange: (day: any) => {
            const unixTimestamp = day.unix()
            return !(unixTimestamp >= MIN_DATE.unix() && unixTimestamp <= MAX_DATE.unix());
        }
    }

    return (<>
        <DateRangePicker
            {...props}
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId={START_DATE} // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId={END_DATE} // PropTypes.string.isRequired,
            onDatesChange={({startDate, endDate}) => {
                setStartDate(startDate)
                setEndDate(endDate)
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedInput(focusedInput ?? null)} // PropTypes.func.isRequired,
        />
    </>)


}
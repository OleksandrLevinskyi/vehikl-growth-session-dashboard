import React, {useState} from "react";
import 'react-dates/initialize';
import {DateRangePicker, SingleDatePicker, DayPickerRangeController, FocusedInputShape} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from "moment";


export const CustomDatePicker: React.FC = () => {

    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const props = {
        numberOfMonths:1
    }

    return (<>
        <DateRangePicker
            {...props}
            startDate={moment().year(2021).month(9).date(1)} // momentPropTypes.momentObj or null,
            startDateId={START_DATE} // PropTypes.string.isRequired,
            endDate={moment().year(2021).month(11).date(31)} // momentPropTypes.momentObj or null,
            endDateId={END_DATE} // PropTypes.string.isRequired,
            onDatesChange={() => {
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedInput(focusedInput ?? null)} // PropTypes.func.isRequired,
        />
    </>)


}
import { useState } from "react";
import { usePreferences } from "../../context/preferences";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

export const DatePickerPage = () => {
const { preferences, setPreferences } = usePreferences();
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());

const formatDate = (dateObj) => {
    
    console.log(dateObj)
    const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = months[dateObj.toLocaleString('en-US', { month: 'short' })];
    const year = dateObj.getFullYear();

    return `${year}-${month}-${day}`;
};

const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(endDate)
};

const handleDateSelect = (start, end) => {
    if (!preferences.startD.includes(start) || !preferences.endD.includes(end)) {
        setPreferences({
            ...preferences,
            startD: [...preferences.startD, start],
            endD: [...preferences.endD, end]
        });
    }
    console.log(preferences)
};

const navigate = useNavigate();
    
const handleNextpage = () => {
    let start = formatDate(startDate)
    let end = formatDate(endDate)
    handleDateSelect(start, end)
    console.log(preferences)
    navigate('/Weather');
}

return (
    <div className="date-container">
        <div className="date-picker-container">
        <h4>Select a Date</h4>
            <DatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
                selectsRange
                inline
            />
        <button className="date-button" onClick={handleNextpage}>Next step</button>
        </div>
    </div>
);
}

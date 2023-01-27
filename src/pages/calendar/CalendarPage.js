import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calednarpage.scss'

const localizer = momentLocalizer(moment)

const CalendarPage = () => {
    const events = [
        {
            start: new Date(),
            end: new Date(moment().add(1, 'days')),
            title: 'Event 1'
        },
        {
            start: new Date(moment().add(3, 'days')),
            end: new Date(moment().add(3, 'days').add(1, 'hours')),
            title: 'Event 2'
        },
        {
            start: new Date(moment().add(5, 'days')),
            end: new Date(moment().add(5, 'days').add(2, 'hours')),
            title: 'Event 3'
        }
    ];

    
    return (
        <div>
            <Calendar
              views={["month", "week", "day"]}
                events={events}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500,width: '95%' }}

                onSelectEvent={event => alert(event.title)}
            />
        </div>
    )
}

export default CalendarPage
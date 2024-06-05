import {useEffect, useState} from 'react';
import {Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar} from '../';
import {getMessagesES, localizer} from '../../helpers';
import {useAuthStore, useCalendarStore, useUiStore} from '../../hooks';

export const CalendarPage = () => {

    const {user} = useAuthStore();
    const {openDateModal} = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        };

        return {
            style
        };
    };

    const onDoubleClick = (e) => {
        openDateModal();
    };

    const onSelect = (e) => {
        console.log({onSelect: e});
        setActiveEvent(e);
    };

    const onViewChanged = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{height: 'calc(100vh - 80px)'}}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}

                //TODO button to change locale
                culture="es"
                messages={getMessagesES()}
            />

            <CalendarModal/>

            <FabAddNew/>
            <FabDelete/>
        </>
    );
};
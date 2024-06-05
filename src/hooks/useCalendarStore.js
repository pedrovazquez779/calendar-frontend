import {useDispatch, useSelector} from 'react-redux';
import {onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent} from '../store';
import {calendarApi} from '../api';
import {convertDateEvents} from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {
        events,
        activeEvent,
    } = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }

            const {data} = await calendarApi.post('/events', {
                ...calendarEvent,
                start: calendarEvent.start.getTime(),
                end: calendarEvent.end.getTime(),
            });
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));
        } catch (e) {
            console.log(e);
            Swal.fire('Error saving', e.response.data.msg, 'error');
        }
    };

    const startLoadingEvents = async () => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertDateEvents(data.events);
            dispatch(onLoadEvents(events));

        } catch (e) {
            console.log(e);
        }
    };

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (e) {
            console.log(e);
            Swal.fire('Error deleting', e.response.data.msg, 'error');
        }
    };

    return {
        // * Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // return true if there is an active event, and false if now

        // * Methods
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    };
};
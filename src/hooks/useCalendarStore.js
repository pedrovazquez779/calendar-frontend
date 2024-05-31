import {useDispatch, useSelector} from 'react-redux';
import {onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent} from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {
        events,
        activeEvent,
    } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        // TODO send to backend

        // OK
        if (calendarEvent._id) {
            // ? Update
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            //? Create - temporary adding id
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
        }

    };

    const startDeletingEvent = () => {
        // TODO send to backend

        dispatch(onDeleteEvent());
    };

    return {
        // * Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // return true if there is an active event, and false if now

        // * Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    };
};
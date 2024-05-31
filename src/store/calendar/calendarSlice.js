import {createSlice} from '@reduxjs/toolkit';
import {addHours} from 'date-fns';

// TODO this will be removed
const tempEvent = {
    _id: new Date().getTime(),
    title: 'My birthday',
    notes: 'send invites bla bla',
    start: new Date(),
    end: addHours(new Date, 2),
    bgColor: '#FAFAFA',
    user: {
        _id: '123',
        name: 'Fernando'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {
                return event._id === payload._id ? payload : event;
            });

            state.activeEvent = null;
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const {onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent} = calendarSlice.actions;
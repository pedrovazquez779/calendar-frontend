import {useCalendarStore, useUiStore} from '../../hooks';
import {addHours} from 'date-fns';

export const FabAddNew = () => {
    const {openDateModal} = useUiStore();
    const {setActiveEvent} = useCalendarStore();

    const onClickNew = () => {
        openDateModal();
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date, 2),
            bgColor: '#FAFAFA',
            user: {
                _id: '123',
                name: 'Fernando'
            }
        });
    };

    return (
        <button
            className="btn btn-primary fab"
            onClick={onClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    );
};
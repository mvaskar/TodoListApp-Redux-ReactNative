import { GET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, RESET_MESSAGES } from './actions';

const initialState = {
    tasks: []
};

function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return { tasks: action.payload.tasks };
        case ADD_TASK:
            return { ...state };
        case EDIT_TASK:
            return { ...state };
        case DELETE_TASK:
            return {
                ...state, tasks: state.tasks.filter(
                    task => task.id !== action.payload.id,
                )
            };
        default:
            return state;
    }
}

export default tasksReducer;

import { addTask, deleteTask, selectAllTasks, updateTask } from "./../database/database";

export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const getTasks = () => {
    return async dispatch => {
        selectAllTasks().then((tasks) => {
            dispatch({
                type: GET_TASKS,
                payload: { tasks: tasks },
            });
        });
    };
};

export const addTaskAction = (task, dueDate) => {
    return async dispatch => {
        if (task === null || task === "" || dueDate === null || dueDate === "") {
            return false;
        }

        addTask(task, dueDate).then(() => {
            dispatch({
                type: ADD_TASK,
                payload: { task: task, dueDate: dueDate },
            });
            selectAllTasks().then((tasks) => {
                dispatch({
                    type: GET_TASKS,
                    payload: { tasks: tasks },
                });
            });
        }).catch(error => {
            dispatch({
                type: ADD_TASK,
                payload: null,
            });
        });
    };
};

export const editTaskAction = (id, task, dueDate) => {
    return async dispatch => {
        if (id === null || id === "" || task === null || task === "" || dueDate === null || dueDate === "") {
            return false;
        }

        updateTask(id, task, dueDate).then(() => {
            dispatch({
                type: EDIT_TASK,
                payload: { id: id, task: task, dueDate: dueDate },
            });
            selectAllTasks().then((tasks) => {
                dispatch({
                    type: GET_TASKS,
                    payload: { tasks: tasks },
                });
            });
        }).catch(error => {
            dispatch({
                type: EDIT_TASK,
                payload: null,
            });
        });
    };
};

export const deleteTaskAction = (id) => {
    return async dispatch => {
        if (id === null || id === "") {
            return false;
        }

        deleteTask(id).then(() => {
            dispatch({
                type: DELETE_TASK,
                payload: { id: id },
            });
            // selectAllTasks().then((tasks) => {
            //     dispatch({
            //         type: GET_TASKS,
            //         payload: tasks,
            //     });
            // });
        }).catch(error => {
            dispatch({
                type: DELETE_TASK,
                payload: null,
            });
        });
    };
};
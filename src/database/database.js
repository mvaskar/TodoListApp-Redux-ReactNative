import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("todolist.db");

// create table
export const createTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "create table if not exists todolist (id integer primary key not null, task text, due_date date);"
                );
            },
            () => {
                reject();
            },
            () => {
                resolve();
            }
        );
    });
};

// select all tasks
export const selectAllTasks = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from todolist`,
                [],
                (_, { rows: { _array } }) => {
                    resolve(_array);
                    console.log(_array)
                },
                () => {
                    reject();
                }
            );
        });
    });
};

// add task
export const addTask = (task, dueDate) => {
    return new Promise((resolve, reject) => {
        if (task === null || task === "" || dueDate === null || dueDate === "") {
            return false;
        }

        db.transaction(
            (tx) => {
                // reject()
                tx.executeSql("insert into todolist (task, due_date) values (?, ?)", [task, dueDate]);
            },
            () => {
                reject();
            },
            () => {
                resolve();
            }
        );
    });
};

// update task
export const updateTask = (id, task, dueDate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(`update todolist set task = ?, due_date = ? where id = ?;`, [task, dueDate, id]);
                // reject();
            },
            () => {
                reject();
            },
            () => {
                resolve();
            }
        );
    });
};

// delete task
export const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(`delete from todolist where id = ?;`, [id], (_, { rows }) => {
                    resolve()
                });
            },
            () => {
                reject();
            },
            () => {
                resolve();
            }
        );
    });
};
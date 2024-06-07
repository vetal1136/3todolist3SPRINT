import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}
export const Task = memo(({task, removeTask, changeTaskStatus, changeTaskTitle, todolistId}: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId)}
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }

    return <div  className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})


import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>



type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const initialState:TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = { id: v1(), title: action.title, isDone: false };
            return {
                ...state, [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone:action.isDone} : t)
            }
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title:action.newTitle} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
           delete copyState[action.id]
            return copyState
            // можно тоже самое через деструктуризацию
           //  const {[action.id]: [], ...rest} = state
           //  return state
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return { type: 'CHANGE-TITLE', taskId, newTitle, todolistId} as const
}
import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TaskType} from "../Todolist";
import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {v1} from "uuid";
import {addTaskAC} from "../state/tasks-reducer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/TaskWithRedux',
    component: TaskWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;

type Story = StoryObj<typeof TaskWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


const Task = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    const dispatch = useDispatch()

    if (!task) {
        task = {id: v1(), title: "JS", isDone: false}
        dispatch(addTaskAC('DEFAULT TASK', 'todolistId1'))
    }


    return <TaskWithRedux
        task={task}
        todolistId={'todolistId1'}
    />
}

export const TaskWithReduxStory: Story = {
    render: () => <Task/>
};
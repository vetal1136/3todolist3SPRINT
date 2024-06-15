import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import { action } from '@storybook/addon-actions';

import {Button} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    args: {
      task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: false},
      todolistId: 'tyftfufuf',
      removeTask: fn(),
      changeTaskTitle: fn(),
      changeTaskStatus: fn()
    }
};

export default meta;

type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewei2343', title: 'HTML', isDone: true}
    },
}

const TaskToggle = () => {
  const [task, setTask] = useState({id: '12wsdewfijdei2343', title: 'CSS', isDone: false})

  function changeTaskStatus () {
    setTask({...task, isDone: !task.isDone})
  }

  function changeTaskTitle (taskId: string, newTitle: string) {
    setTask({...task, title: newTitle})
  }

  return <Task task={task}
               removeTask={action('Task delete')}
               todolistId={'ertertrte'}
               changeTaskTitle={changeTaskTitle}
               changeTaskStatus={changeTaskStatus}/>
}

export const TaskToggleStory: Story = {
  render: () => <TaskToggle/>
};
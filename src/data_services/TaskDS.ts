import ITask from "../data_interfaces/ITask";
import ITaskList from "../data_interfaces/ITaskList";

const create = (taskListId: string, taskToCreate: ITask): Promise<ITask[]> => {
  const promise = new Promise<ITask[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      const existingTaskList = taskLists.find((tl) => tl.id === taskListId)
      if (existingTaskList) {
        const newTasks = [...existingTaskList.tasks, taskToCreate]
        newTasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        existingTaskList.tasks = newTasks
        localStorage.setItem("tasklists", JSON.stringify(taskLists))
        resolve(newTasks)
      } else {
        resolve([])
      }
    } else {
      resolve([])
    }
  })
  return promise
}

const getAll = (taskListId: string): Promise<ITask[]> => {
  const promise = new Promise<ITask[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      const existingTaskList = taskLists.find((tl) => tl.id === taskListId)
      if (existingTaskList) {
        const tasks = existingTaskList.tasks
        tasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        resolve(tasks)
      } else {
        resolve([])
      }
    } else {
      resolve([])
    }
  })
  return promise
}

const remove = (taskListId: string, taskToRemove: ITask): Promise<ITask[]> => {
  const promise = new Promise<ITask[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      const existingTaskList = taskLists.find((tl) => tl.id === taskListId)
      if (existingTaskList) {
        const otherTasks = existingTaskList.tasks.filter((t) => t.id !== taskToRemove.id)
        otherTasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        existingTaskList.tasks = otherTasks
        localStorage.setItem("tasklists", JSON.stringify(taskLists))
        resolve(otherTasks)
      } else {
        resolve([])
      }
    } else {
      resolve([])
    }
  })
  return promise
}

const update = (taskListId: string, taskToUpdate: ITask): Promise<ITask[]> => {
  const promise = new Promise<ITask[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      const existingTaskList = taskLists.find((tl) => tl.id === taskListId)
      if (existingTaskList) {
        const otherTasks = existingTaskList.tasks.filter((t) => t.id !== taskToUpdate.id)
        const newTasks = [...otherTasks, taskToUpdate]
        newTasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        existingTaskList.tasks = newTasks
        localStorage.setItem("tasklists", JSON.stringify(taskLists))
        resolve(newTasks)
      } else {
        resolve([])
      }
    } else {
      resolve([])
    }
  })
  return promise
}

const TaskDS = {
  create,
  getAll,
  remove,
  update,
}

export default TaskDS
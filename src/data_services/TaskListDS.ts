import ITaskList from "../data_interfaces/ITaskList"

const create = (taskListToCreate: ITaskList): Promise<ITaskList[]> => {
  const promise = new Promise<ITaskList[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    let taskLists: ITaskList[] = [];
    if (taskListsJson) {
      taskLists = [...JSON.parse(taskListsJson), taskListToCreate]
    } else {
      taskLists = [taskListToCreate]
    }
    taskLists.sort((a, b) => (a.name.toLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1))
    localStorage.setItem("tasklists", JSON.stringify(taskLists))
    resolve(taskLists)
  })
  return promise
}

const getAll = (): Promise<ITaskList[]> => {
  const promise = new Promise<ITaskList[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      taskLists.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
      resolve(taskLists)
    } else {
      resolve([])
    }
  })
  return promise
}

const remove = (taskListToRemove: ITaskList): Promise<ITaskList[]> => {
  const promise = new Promise<ITaskList[]>((resolve) => {
    const taskListsJson = localStorage.getItem("tasklists")
    if (taskListsJson) {
      const taskLists: ITaskList[] = JSON.parse(taskListsJson)
      const newTaskLists = taskLists.filter((tl) => tl.id !== taskListToRemove.id)
      localStorage.setItem("tasklists", JSON.stringify(newTaskLists))
      resolve(newTaskLists)
    } else {
      resolve([])
    }
  })
  return promise
}

const TaskListDS = {
  create,
  getAll,
  remove,
}

export default TaskListDS

import ITask from "./ITask"

export default interface ITaskList {
  id: string
  name: string
  tasks: ITask[]
}

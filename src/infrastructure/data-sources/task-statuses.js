import { TASK_STATUS } from "@/infrastructure/constants/task-status"

export const TASK_STATUSES = [
    {
        id: 1,
        status: TASK_STATUS.notCompleted,
        title: "Активные",
    },
    {
        id: 2,
        status: TASK_STATUS.completed,
        title: "Выполненные",
    },
    {
        id: 3,
        status: "All",
        title: "Все",
    }
]
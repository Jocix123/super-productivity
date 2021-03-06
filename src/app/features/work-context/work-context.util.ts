import { TaskWithSubTasks } from '../tasks/task.model';

export const mapEstimateRemainingFromTasks = (tasks: TaskWithSubTasks[]): number => tasks && tasks.length && tasks.reduce((acc: number, task: TaskWithSubTasks): number => {
  let isTrackVal;
  let estimateRemaining;
  if (task.subTasks && task.subTasks.length > 0) {
    estimateRemaining = task.subTasks.reduce((subAcc, subTask) => {
      const estimateRemainingSub = (+subTask.timeEstimate) - (+subTask.timeSpent);
      const isTrackValSub = ((estimateRemainingSub > 0) && !subTask.isDone);
      return subAcc + ((isTrackValSub) ? estimateRemainingSub : 0);
    }, 0);
  } else {
    estimateRemaining = (+task.timeEstimate) - (+task.timeSpent);
  }
  isTrackVal = ((estimateRemaining > 0) && !task.isDone);
  return acc + ((isTrackVal) ? estimateRemaining : 0);
}, 0);

export const hasTasksToWorkOn = (tasks: TaskWithSubTasks[]): boolean => {
  const _tasksToWorkOn = tasks.filter((t) => {
    return !t.isDone && !t.repeatCfgId &&
      ((!t.subTasks || t.subTasks.length === 0) || t.subTasks.filter((st) => !st.isDone).length > 0);
  });
  return (_tasksToWorkOn && _tasksToWorkOn.length > 0);
};

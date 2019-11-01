class TaskQueue {
  constructor() {
    /**
     * @type {Function[]}
     */
    this.queue = [];

    /**
     * @type {boolean}
     */
    this.inProgress = false;
  }

  /**
   * Gets the number of tasks contained in the `queue`
   * @return {number}
   */
  count() {
    return this.queue.length;
  }

  /**
   * Returns the task at the beginning of the `queue` without removing it.
   * @return {Function}
   */
  peek() {
    return this.queue[0];
  }

  /**
   * Adds a task to the end of the `queue`, and returns a promise based on the given task.
   * @param {Function} task
   * @return {Promise}
   */
  enqueue(task) {
    return new Promise((resolve, reject) => {
      /**
       * If the given task is a function push it in the `queue`, else throw error.
       */
      if (typeof task === 'function') {
        this.queue.push({ resolve, reject, task });
      } else {
        throw new Error('Given task is not a function');
      }

      /**
       * If nothing is in progress, meaning that there is no get task process is running,
       * we execute the first task in the `queue`.
       */
      if (!this.inProgress) {
        this.executeFirstTaskInQueue();
      }
    })
  }

  /**
   * Removes and returns the task at the beginning of the `queue`.
   * @return {Function}
   */
  dequeue() {
    return this.queue.splice(0, 1)[0];
  }

  /**
   * @return {void}
   */
  executeFirstTaskInQueue() {
    /**
     * Check if there are tasks in the `queue`, otherwise it will try to execute
     * an undefined.
     * If there are no tasks in the `queue` set `inProgress` to false.
     */
    if (this.count()) {
      /**
       * Set `inProgress` to true as after this tasks are running.
       */
      this.inProgress = true;

      /**
       * This is the task in the beginning of the queue.
       * @type {Function}
       */
      const task = this.dequeue();

      /**
       * If this task is not a function throw an error, but if it is a function execute it.
       * After the task is done and resolved execute the next in the queue.
       */
      if (task && typeof task.task === 'function') {
        task.task()
          .then(data => {
            task.resolve(data);
            this.executeFirstTaskInQueue();
          })
          .catch(err => {
            task.reject(err);
            this.executeFirstTaskInQueue();
          })
      } else {
        throw new Error('Dequeued task is not a function');
      }
    } else {
      this.inProgress = false;
    }
  }
}

export default TaskQueue;

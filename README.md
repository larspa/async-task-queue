# async-task-queue

> A simple way to queue asynchronous tasks

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i -S @larspa/task-queue
```

## Usage

```js
import TaskQueue from '@larspa/task-queue';

const taskQueue = new TaskQueue();

const task1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t1 success");
      resolve('test 1');
    }, 100);
  });

const task2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t2 success");
      resolve('test 2');
    }, 1000);
  });

const task3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t3 success");
      resolve('test 3');
    }, 500);
  });

taskQueue.enqueue(task1).then(console.log);
taskQueue.enqueue(task2).then(console.log);
taskQueue.enqueue(task3).then(console.log);

// output after 1000ms: t1 success
// output after 1000ms: test 1
// output after 1100ms: t2 success
// output after 1100ms: test 2
// output after 1600ms: t3 success
// output after 1600ms: test 3
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/@larspa/task-queue.svg
[npm-url]: https://npmjs.org/package/@larspa/task-queue

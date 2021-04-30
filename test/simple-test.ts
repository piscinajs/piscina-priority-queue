import Piscina from 'piscina';
import PiscinaPriorityQueue from '..';
import { test } from 'tap';
import { resolve } from 'path';

test('PiscinaPriorityQueue works', async ({ equal }) => {
  const queue = new PiscinaPriorityQueue();
  equal(queue.size, 0);
  const task = PiscinaPriorityQueue.makeTask({}, 1);
  queue.push(task);
  equal(queue.size, 1);
  queue.remove(null);
  queue.remove(({} as any));
  equal(queue.size, 1);
  queue.remove(task);
  equal(queue.size, 0);
});

test('PiscinaPriorityQueue works with Piscina', async () => {
  const queue = new PiscinaPriorityQueue();
  const pool = new Piscina({
    filename: resolve(__dirname, 'fixtures/eval.js'),
    taskQueue: queue,
    maxThreads: 1,
    minThreads: 1
  });

  await Promise.all([
    pool.runTask(PiscinaPriorityQueue.makeTask({}, 1)),
    pool.runTask(PiscinaPriorityQueue.makeTask({}, 2)),
    pool.runTask(PiscinaPriorityQueue.makeTask({})),
    pool.runTask(PiscinaPriorityQueue.makeTask({}, null)),
    pool.runTask({})
  ]);
});

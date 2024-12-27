# piscina-priority-queue - A Priority Queue for Piscina

![CI](https://github.com/jasnell/piscina/workflows/CI/badge.svg)

## Example

```js
const Piscina = require('piscina');
const PiscinaPriorityQueue = require('piscina-priority-queue');
const { resolve } = require('path');

const pool = new Piscina({
  filename: resolve(__dirname, 'worker.js'),
  taskQueue: new PiscinaPriorityQueue()
});

const priority_1_task = PiscinaPriorityQueue.makeTask({ a: 1 }, 1);
const priority_2_task = PiscinaPriorityQueue.makeTask({ a: 1 }, 2);

(async () => {
  await Promise.all([
    pool.runTask(priority_1_task),
    pool.runTask(priority_2_task)
  ]);
})();
```

## The Team

* James M Snell <jasnell@gmail.com>
* Anna Henningsen <anna@addaleax.net>
* Matteo Collina <matteo.collina@gmail.com>

## Acknowledgements

Piscina development is sponsored by [NearForm Research][].

[NearForm Research]: https://www.nearform.com/research/

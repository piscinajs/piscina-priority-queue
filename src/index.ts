import Piscina from 'piscina';
import spq from 'shuffled-priority-queue';

type TaskQueue = Piscina extends {
  options: {
    taskQueue: infer T
  }
} ? T : never;

type Task = TaskQueue extends {
  shift() : infer T | null
} ? T : never;

const kEntry = Symbol('PiscinaPriorityQueue.Entry');

class PiscinaPriorityQueue implements TaskQueue {
  queue = spq();

  get size () : number { return this.queue.length; }

  push (value : Task) {
    const queueOptions = (value as any)[Piscina.queueOptionsSymbol];
    const priority = queueOptions ? (queueOptions.priority || 0) : 0;
    (value as any)[kEntry] = this.queue.add({ priority, value });
  }

  remove (value : Task) {
    if (value == null) {
      return;
    }
    const entry = (value as any)[kEntry];
    if (entry) {
      this.queue.remove(entry);
    }
    (value as any)[kEntry] = undefined;
  }

  shift () : Task | null {
    return this.queue.shift().value;
  }

  static makeTask (task : object, priority? : number) : Task {
    return ({
      ...task,
      [Piscina.queueOptionsSymbol]: { priority }
    } as object) as Task;
  }
}

export = PiscinaPriorityQueue;

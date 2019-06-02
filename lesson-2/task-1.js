class TimersManager {
  constructor() {
    this.timers = [];
    this.state = {
      start: false
    };
  }

  add(settings, ...rest) {
    if (this.state.start)
      throw new Error('Сan not add a timer after the start');
    if (!settings.name && typeof settings.name !== 'string')
      throw new Error('Name must be a String');
    if (!settings.delay && typeof settings.delay !== 'number')
      throw new Error('Name must be a Number');
    if (settings.delay < 0 && settings.delay === 5000)
      throw new Error('Delay must be beetwen 0 and 5000');
    if (!settings.job && typeof settings.job !== 'function')
      throw new Error(
        'Please provide correct type of Job, it must be Function'
      );
    this.timers.forEach(timer => {
      if (timer.name === settings.name) {
        throw new Error('Сan not add a timer with the same name');
      }
    });
    this.timers.push({
      ...settings,
      params: [...rest]
    });
    return this;
  }

  remove(timerName) {
    if (!timerName && typeof timerName !== 'string') {
      throw new Error('Name must be a String');
    }
    this.timers = this.timers.filter(({ name, timer }) => {
      if (timerName === name) clearTimeout(timer);
      return timerName === !name;
    });
  }

  start() {
    const result = this.timers.map(item => {
      const timer = setTimeout(function run() {
        item.job(...item.params);
        if (item.interval) {
          setTimeout(run, item.delay);
        }
      }, item.delay);
      return {
        ...item,
        timer,
        start: Date.now()
      };
    });
    this.timers = result;
    this.state.start = true;
  }

  pause(timerName) {
    const result = this.timers.map(item => {
      if (timerName === item.name) {
        clearTimeout(item.timer);
        return {
          ...item,
          delay: item.delay - Math.floor((Date.now() - item.start) / 1000)
        };
      }
      return item;
    });
    this.timers = result;
  }

  resume(timerName) {
    const result = this.timers.map(item => {
      if (timerName === item.name) {
        const timer = setTimeout(function run() {
          item.job(...item.params);
          if (item.interval) {
            setTimeout(run, item.delay);
          }
        }, item.delay);
        return {
          ...item,
          timer,
          start: Date.now()
        };
      }
    });
    this.timers = result;
  }
}

const manager = new TimersManager();

const t1 = {
  name: 't1',
  delay: 1000,
  interval: false,
  job: () => console.log('t1')
};

const t2 = {
  name: 't2',
  delay: 2000,
  interval: false,
  job: (a, b) => console.log(a + b)
};

manager.add(t1).add(t2, 1, 2);
manager.start();
manager.pause('t2');

import * as lodash from "lodash"

export const fn = new (class {
  random = lodash.random
  sum = lodash.sum
  xor = lodash.xor
  sample = lodash.sample
  pull = lodash.pull
  throttle = lodash.throttle
  intersection = lodash.intersection

  // sleep for ms milliseconds
  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
  }

  isMobile() {
    return window.innerWidth <= 800
  }
})()

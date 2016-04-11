/**
 * @fileOverview
 *
 * here is the stub for logger, useful for isomorphic files
 */

/* eslint-disable no-console */

export default {
  /**
   * @param {string} level - one of error, warn, info or verbose
   * @param messages
   */
  log(level, ...messages) {
    this[level].apply(this, messages);
  },

  error: console.error.bind(console),
  warn: console.warn.bind(console),
  info: console.info.bind(console),
  verbose: console.log.bind(console),
};

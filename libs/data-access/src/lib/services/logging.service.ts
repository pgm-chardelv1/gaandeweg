import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
  d = new Date();

  /**
   * Logs a message to the console.
   * @param {string} app - the name of the app that is logging the message.
   * @param {string} message - the message to log.
   * @returns None
   */
  log(app: string, message: string) {
    console.log(`${this.d}: ${app}: ${message}`);
  }

  /**
   * Prints an error message to the console.
   * @param {string} app - the name of the app that is printing the error.
   * @param {string} message - the error message itself.
   * @returns None
   */
  error(app: string, message: string) {
    console.error(`${this.d}: ${app}: ${message}`);
  }

  /**
   * Prints a warning to the console.
   * @param {string} app - the name of the app that is printing the warning.
   * @param {string} message - the message to print.
   * @returns None
   */
  warn(app: string, message: string) {
    console.warn(`${this.d}: ${app}: ${message}`);
  }
}

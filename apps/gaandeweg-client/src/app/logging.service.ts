export class LoggingService {
  logStatus(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
  log(data: string) {
    console.log(data);
  }
}

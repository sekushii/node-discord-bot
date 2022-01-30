import CustomError from './custom-error';

class UnsupportedEventError extends CustomError {
  constructor(eventId: string) {
    super(`Unsupported event: ${eventId}`);
  }
}

export default UnsupportedEventError;

import { AuthGuard } from '@nestjs/passport';

/**
 * A guard that checks if the user is logged in using the local strategy.
 * @param {string} strategy - The name of the strategy to use.
 * @returns None
 */
export class LocalAuthGuard extends AuthGuard('local') {}

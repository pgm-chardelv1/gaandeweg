import { AuthGuard } from '@nestjs/passport';

/**
 * A custom authentication guard that uses the JWT strategy.
 * @extends AuthGuard('jwt')
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}

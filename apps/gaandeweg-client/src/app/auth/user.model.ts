/**
 * A class that represents a user.
 * @param {string} _token - the token that is used to authenticate the user.
 * @param {Date} _tokenExpirationDate - the date that the token expires.
 */
export class User {
  /**
   * A class that represents a token for authentication.
   * @param {string} _token - The token itself.
   * @param {Date} _tokenExpirationDate - The date the token expires.
   * @param {string} id - The id of the user.
   */
  constructor(
    private _token: string,
    private _tokenExpirationDate: Date,
    public id: string
  ) {}

  /**
   * Get the token for the current session.
   * @returns {string | null} The token for the current session.
   */
  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

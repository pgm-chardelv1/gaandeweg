/**
 * A class that represents a user.
 * @param {string} _token - the token that is used to authenticate the user.
 * @param {Date} _tokenExpirationDate - the date that the token expires.
 */
export class User {
  constructor(
    private _token: string,
    private _tokenExpirationDate: Date,
    public id: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

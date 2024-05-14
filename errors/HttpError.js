/**
 *
 */
export default class HttpError extends Error {
  /**
   *
   * @param {number} status Status error code
   * @param {message} message Error message
   */
  constructor({ status, message }) {
    super(message)
    this.status = status
  }
}

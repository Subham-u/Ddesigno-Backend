export const API_STATES = {
  // Success responses
  OK: 200, // Request succeeded
  CREATED: 201, // Resource created successfully
  ACCEPTED: 202, // Request accepted but not yet completed
  NO_CONTENT: 204, // Request succeeded but no content to return

  // Client error responses
  BAD_REQUEST: 400, // Invalid request syntax
  UNAUTHORIZED: 401, // Authentication required
  FORBIDDEN: 403, // Client lacks access rights
  NOT_FOUND: 404, // Requested resource not found
  CONFLICT: 409, // Request conflicts with current state
  VALIDATION_ERROR: 422, // Validation failed
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded

  // Server error responses
  INTERNAL_SERVER_ERROR: 500, // Generic server error
  NOT_IMPLEMENTED: 501, // Functionality not supported
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server temporarily unavailable
  GATEWAY_TIMEOUT: 504, // Upstream server timeout
};

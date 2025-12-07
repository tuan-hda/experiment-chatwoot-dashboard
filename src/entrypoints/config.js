/**
 * Configuration for the standalone dashboard
 * Sets up the global chatwootConfig and errorLoggingConfig
 */

// Configure Chatwoot API endpoint
window.chatwootConfig = {
  apiHost: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

// Configure error logging (optional)
if (import.meta.env.VITE_ERROR_LOGGING_CONFIG) {
  window.errorLoggingConfig = import.meta.env.VITE_ERROR_LOGGING_CONFIG;
}

// Make config available globally
export const chatwootConfig = window.chatwootConfig;
export const errorLoggingConfig = window.errorLoggingConfig;

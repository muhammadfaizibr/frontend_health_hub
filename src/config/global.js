// Platform Configuration
export const platformName = "HealthConnect";
export const platformDescription = "Connecting patients with healthcare providers for better health outcomes";

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 10000; // 10 seconds

// App Configuration
export const APP_CONFIG = {
  name: platformName,
  description: platformDescription,
  version: '1.0.0',
  author: 'HealthConnect Team',
  supportEmail: 'support@healthconnect.com',
  supportPhone: '+1 (555) 123-4567'
};

// Feature Flags
export const FEATURES = {
  ENABLE_REGISTRATION: true,
  ENABLE_TELEHEALTH: true,
  ENABLE_TRANSLATOR: true,
  ENABLE_ORGANIZATION: true,
  ENABLE_REVIEWS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_PAYMENTS: false, // Coming soon
  ENABLE_ANALYTICS: true
};

// UI Configuration
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION_DURATION: 300
};

// Theme Configuration
export const THEME_CONFIG = {
  PRIMARY_COLOR: '#3B82F6',
  SECONDARY_COLOR: '#64748B',
  SUCCESS_COLOR: '#10B981',
  ERROR_COLOR: '#EF4444',
  WARNING_COLOR: '#F59E0B',
  INFO_COLOR: '#06B6D4'
};

// Validation Configuration
export const VALIDATION_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 1000,
  PHONE_MAX_LENGTH: 15
};

// Date and Time Configuration
export const DATE_TIME_CONFIG = {
  DATE_FORMAT: 'MM/DD/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'MM/DD/YYYY HH:mm',
  TIMEZONE: 'America/New_York'
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100
};

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_RESULTS: 50,
  SEARCH_DEBOUNCE: 300
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },
  POSITIONS: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left'
  },
  DEFAULT_DURATION: 5000
};
// User Types
export const USER_TYPES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ORGANIZATION: 'organization',
  TRANSLATOR: 'translator'
};

// User Type Labels
export const USER_TYPE_LABELS = {
  [USER_TYPES.PATIENT]: 'Patient',
  [USER_TYPES.DOCTOR]: 'Doctor',
  [USER_TYPES.ORGANIZATION]: 'Organization',
  [USER_TYPES.TRANSLATOR]: 'Translator'
};

// User Type Icons
export const USER_TYPE_ICONS = {
  [USER_TYPES.PATIENT]: 'person',
  [USER_TYPES.DOCTOR]: 'medication',
  [USER_TYPES.ORGANIZATION]: 'corporate_fare',
  [USER_TYPES.TRANSLATOR]: 'translate'
};

// Appointment Types
export const APPOINTMENT_TYPES = {
  IN_PERSON: 'in-person',
  TELEHEALTH: 'telehealth'
};

// Appointment Durations
export const APPOINTMENT_DURATIONS = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' }
];

// Languages
export const LANGUAGES = [
  { value: 'not-required', label: 'Not Required' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' }
];

// Medical Specialties
export const MEDICAL_SPECIALTIES = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Oncology',
  'Gynecology',
  'Orthopedics',
  'Emergency Medicine',
  'Internal Medicine',
  'Family Medicine'
];

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 500,
    patients: 45,
    features: [
      'Basic health checkups',
      'Lab test coverage',
      'Monthly reports',
      'Email support'
    ]
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 1000,
    patients: 100,
    features: [
      'All Starter features',
      'Specialist consultations',
      'Advanced diagnostics',
      'Priority support',
      'Custom reporting'
    ]
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'custom',
    patients: 'unlimited',
    features: [
      'All Professional features',
      'Unlimited patient capacity',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'API access'
    ]
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update'
  },
  DOCTORS: {
    LIST: '/api/doctors',
    DETAILS: '/api/doctors/[id]',
    SEARCH: '/api/doctors/search'
  },
  APPOINTMENTS: {
    LIST: '/api/appointments',
    CREATE: '/api/appointments',
    UPDATE: '/api/appointments/[id]',
    CANCEL: '/api/appointments/[id]/cancel'
  }
};

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_NAME: 'Name can only contain letters and spaces',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`,
  NAME_TOO_LONG: `Name must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  LOGIN_FAILED: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  APPOINTMENT_BOOKED: 'Appointment booked successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully'
};

# HealthConnect - Healthcare Platform

A modern, scalable Next.js healthcare platform that connects patients with healthcare providers, supporting multiple user types including patients, doctors, organizations, and translators.

## 🚀 Features

### Core Functionality
- **Multi-User Support**: Patients, Doctors, Organizations, and Translators
- **Authentication System**: Secure login/registration with role-based access
- **Doctor Search & Booking**: Find and book appointments with healthcare providers
- **Appointment Management**: Schedule, reschedule, and cancel appointments
- **Profile Management**: Comprehensive user profiles with medical information
- **Responsive Design**: Mobile-first, accessible design

### User Types
- **Patients**: Book appointments, manage medical records, find doctors
- **Doctors**: Manage schedule, view patients, handle consultations
- **Organizations**: Manage subscriptions, track patient capacity
- **Translators**: Handle translation assignments, manage schedule

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard routes
│   ├── login/            # Authentication pages
│   ├── register/         # Registration pages
│   ├── layout.js         # Root layout with providers
│   └── page.js           # Landing page
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, LoadingSpinner)
│   ├── forms/           # Form components (Input, Select, Textarea)
│   └── layout/          # Layout components (Header, Footer)
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useLocalStorage.js # Local storage hook
│   └── useDebounce.js   # Debounce hook
├── lib/                 # Utility functions
│   └── utils.js         # Helper functions
├── constants/           # Application constants
│   └── index.js         # User types, validation rules, etc.
├── types/               # TypeScript-like type definitions
│   └── index.js         # Data structure definitions
└── config/              # Configuration files
    └── global.js        # Global app configuration
```

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Google Material Symbols
- **State Management**: React Context + Custom Hooks
- **Form Handling**: Controlled components with validation
- **Routing**: Next.js App Router with dynamic routes

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Slate (#64748B)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)
- **Info**: Cyan (#06B6D4)

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Scale**: Responsive typography with consistent sizing
- **Weights**: Light (400), Medium (500), Semibold (600), Bold (700)

### Components
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Forms**: Consistent styling with validation states
- **Cards**: Elevated containers with hover effects
- **Navigation**: Responsive sidebar and header navigation

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd frontend_health_hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page with features and CTA
- `/login` - User authentication
- `/register` - User registration

### Protected Routes (Dashboard)
- `/dashboard` - Main dashboard (role-specific content)
- `/dashboard/appointments` - Appointment management
- `/dashboard/find-doctor` - Doctor search and discovery
- `/dashboard/find-doctor/[id]` - Doctor profile page
- `/dashboard/find-doctor/[id]/book-appointment` - Appointment booking
- `/dashboard/profile` - User profile management

## 🔐 Authentication

### User Types
1. **Patient**: Can book appointments, view medical records
2. **Doctor**: Can manage schedule, view patients
3. **Organization**: Can manage subscriptions, track capacity
4. **Translator**: Can handle translation assignments

### Authentication Flow
- JWT-based authentication with localStorage
- Protected routes with automatic redirects
- Role-based dashboard content
- Profile management with validation

## 🎯 Key Features

### Doctor Search & Booking
- Advanced search with filters (specialty, location)
- Real-time availability checking
- Appointment scheduling with time slots
- Support for both in-person and telehealth

### Appointment Management
- Upcoming and past appointment views
- Reschedule and cancel functionality
- Appointment details with notes
- Status tracking (confirmed, completed, cancelled)

### Profile Management
- Personal information editing
- Medical history (for patients)
- Professional information (for doctors)
- Document upload and verification

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup
Ensure the following environment variables are set:
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_APP_URL` - Frontend application URL

## 📊 Performance

### Optimizations
- Static generation for landing page
- Dynamic imports for heavy components
- Image optimization with Next.js Image component
- CSS optimization with custom properties
- Bundle size optimization

### Metrics
- First Load JS: ~122-124 kB per page
- Build time: ~5-8 seconds
- Lighthouse scores: 90+ across all metrics

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Dashboard navigation
- [ ] Doctor search and filtering
- [ ] Appointment booking flow
- [ ] Profile management
- [ ] Responsive design on mobile/tablet
- [ ] Form validation
- [ ] Error handling

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications
- Video calling integration
- Payment processing
- Advanced analytics
- Mobile app (React Native)
- Multi-language support
- Advanced search filters
- Prescription management

### Technical Improvements
- TypeScript migration
- Unit and integration tests
- E2E testing with Playwright
- Performance monitoring
- Error tracking (Sentry)
- API integration
- Database integration

## 📝 Contributing

### Code Style
- Use functional components with hooks
- Follow Next.js best practices
- Consistent naming conventions
- Proper error handling
- Responsive design principles

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Email: support@healthconnect.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**HealthConnect** - Connecting patients with healthcare providers for better health outcomes.
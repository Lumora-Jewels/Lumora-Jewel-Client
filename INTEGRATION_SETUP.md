# Lumora Jewel Client - Service Integration Setup

This document outlines the integration of all microservices with the Lumora Jewel Client.

## Services Integrated

1. **Authentication Service** - User login, registration, and profile management
2. **Product Service** - Product catalog and management
3. **Category Service** - Product categories and organization
4. **Cart Service** - Shopping cart functionality
5. **Order Service** - Order management and tracking
6. **Payment Service** - Payment processing
7. **Notification Service** - User notifications
8. **User Service** - User profile management

## Environment Setup

Create a `.env` file in the client root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Development
VITE_NODE_ENV=development
```

## API Gateway Configuration

The client communicates with services through the API Gateway. Ensure the following environment variables are set in your API Gateway:

```env
USER_SERVICE_URL=http://localhost:3001
AUTH_SERVICE_URL=http://localhost:3002
PRODUCT_SERVICE_URL=http://localhost:3003
CATEGORY_SERVICE_URL=http://localhost:3004
CART_SERVICE_URL=http://localhost:3005
ORDER_SERVICE_URL=http://localhost:3006
PAYMENT_SERVICE_URL=http://localhost:3007
NOTIFICATION_SERVICE_URL=http://localhost:3008
```

## Features Implemented

### Authentication
- User registration and login
- JWT token management
- Protected routes
- User profile display
- Logout functionality

### Product Management
- Product listing with real-time data
- Category-based filtering
- Search functionality
- Product variants (color, size, material)
- Stock management
- Price display with discounts

### Shopping Cart
- Add/remove items
- Quantity management
- Variant selection
- Real-time cart updates
- Cart persistence
- Cart item count in navbar

### User Interface
- Responsive design
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Form validation

## API Endpoints Used

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin)
- `PUT /categories/:id` - Update category (admin)
- `DELETE /categories/:id` - Delete category (admin)

### Cart
- `GET /cart/:userId` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:cartId/item/:itemId` - Update cart item
- `DELETE /cart/:cartId/item/:itemId` - Remove cart item
- `DELETE /cart/clear/:userId` - Clear cart

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get orders
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order status
- `DELETE /orders/:id` - Delete order

### Payments
- `POST /payments` - Create payment
- `PUT /payments/status` - Update payment status
- `GET /payments` - Get payments
- `GET /payments/:id` - Get payment by ID

### Notifications
- `POST /notifications` - Create notification
- `GET /notifications/user/:userId` - Get user notifications
- `PUT /notifications/read/:id` - Mark as read
- `DELETE /notifications/:id` - Delete notification

### Users
- `POST /users` - Create user
- `GET /users` - Get users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Ensure all microservices are running on their respective ports

4. Ensure the API Gateway is running on port 3000

## Error Handling

The application includes comprehensive error handling:
- Network errors
- Authentication errors
- Validation errors
- Service unavailable errors
- Fallback to sample data when services are unavailable

## Security Features

- JWT token authentication
- Protected API routes
- Input validation
- XSS protection
- CSRF protection through API Gateway

## Performance Optimizations

- Lazy loading of components
- Image optimization
- API response caching
- Debounced search
- Pagination for large datasets

## Testing

The application is ready for testing with:
- Unit tests for components
- Integration tests for API calls
- E2E tests for user workflows
- Error scenario testing





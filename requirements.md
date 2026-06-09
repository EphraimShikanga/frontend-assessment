# Frontend Developer Practical Assessment

**Duration:** 60–90 Minutes

**Technology Requirements:**
* React
* TypeScript
* Next.js (Preferred)
* Tailwind CSS (Optional)
* TanStack Query (Preferred)

---

## Objective
Build a small authenticated product dashboard using the provided APIs.

The objective is to demonstrate:
* React fundamentals
* TypeScript usage
* API integration
* Authentication handling
* State management
* Error handling
* UI organization
* Code quality

---

## APIs

### Authentication API
**Endpoint:**
`https://dummyjson.com/auth/login`

**Credentials:**
```json
{ "username": "emilys", "password": "emilypass" }


Products API
Endpoint:
https://dummyjson.com/products

Functional Requirements
Part 1: Login Screen
Create a login page containing:

Username field

Password field

Login button

Requirements:

Validate required fields.

Show loading state during login.

Show error message if login fails.

Store authentication information after successful login.

Redirect to dashboard after login.

Part 2: Protected Dashboard
The dashboard should only be accessible after successful login.

Requirements:

Redirect unauthenticated users back to Login.

Display logged-in user's name if available.

Include a Logout button.

Part 3: Products Listing
Fetch products from:
https://dummyjson.com/products

Display:

Product title

Product image

Price

Category

Rating

Requirements:

Loading state

Error state

Empty state

Part 4: Search Functionality
Add a search field.

Requirements:

Filter products by title.

Search should update results immediately.

Search should be case insensitive.

Optional Enhancements
These are not mandatory but may strengthen your submission:

Pagination

Product Details Modal

TanStack Query integration

Redux integration

Responsive design

Dark mode

Skeleton loaders

Submission Requirements
Please submit:

Source code repository
README with setup instructions
Brief Explanation of your implementation approach
# How to Run the Application

## Prerequisites
- Node.js installed
- MongoDB running (locally or cloud)

## Starting the Backend Server

### Step 1: Set up environment variables
Create a `.env` file in the `backend` folder with:
```
MONGO_URI=mongodb://localhost:27017/menu-ordering-system
PORT=5000
```

### Step 2: Install backend dependencies
```bash
cd backend
npm install
```

### Step 3: Start the backend server
```bash
npm start
```

The backend should start on `http://localhost:5000`

## Starting the Frontend

### Step 1: Install frontend dependencies
```bash
cd "online menu"
npm install
```

### Step 2: Start the development server
```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## Testing the Checkout Flow

1. Open the frontend in your browser
2. Add items to the cart
3. Go to checkout
4. Fill in the customer details
5. Click "Place Order"
6. You should see the invoice

## Troubleshooting

### "Failed to place order" error
- Make sure the backend server is running on port 5000
- Check that MongoDB is running
- Check the browser console (F12) for detailed error messages

### Backend won't start
- Ensure MongoDB is running
- Check that port 5000 is not in use
- Check the backend console for error messages

### Blank checkout page
- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors
- Ensure jsPDF is installed: `npm install jspdf`

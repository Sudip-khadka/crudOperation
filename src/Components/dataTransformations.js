import { v4 as uuidv4 } from 'uuid';
// Helper function to convert string to boolean
const stringToBoolean = (value) => {
  return value.toLowerCase() === 'yes';
};

// Transformation rules for each category
const transformations = {
  userdata: (row) => ({
    id: uuidv4(),
    name: row['Name'],
    phone: row['Phone'],
    email: row['Email'],
    dob: row['Date Of Birth'],
    address: {
      city: row['City'],
      district: row['District'],
      province: row['Province'],
      country: row['Country']
    }})
  // Add more categories if needed
};

export default transformations;

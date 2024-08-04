import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, InputLabel, Select, FormControl, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Alert from './Alert';

const UpdateUserData = ({ open, onClose ,data}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      address: {
        country: 'Nepal'
      }
    }
  });
  const [countries, setCountries] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureBase64, setProfilePictureBase64] = useState(null);
  const [showAlert,setShowAlert]=useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryOptions = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryOptions);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  useEffect(() => {
    if (data) {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          Object.keys(data[key]).forEach(subKey => {
            setValue(`${key}.${subKey}`, data[key][subKey]);
          });
        } else {
          setValue(key, data[key]);
        }
      });
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    const existingData = JSON.parse(localStorage.getItem('userData')) || [];
    const userIndex = existingData.findIndex(user => user.id === data.id);

    const updatedUser = {
      ...formData,
      id: data.id, // Keep the existing user id
      profilePicture: profilePictureBase64
    };

    if (userIndex > -1) {
      existingData[userIndex] = updatedUser;
    } else {
      existingData.push(updatedUser);
    }

    localStorage.setItem('userData', JSON.stringify(existingData));
    setShowAlert(true);
    setTimeout(()=>{
        setShowAlert(false)
        onClose();
    },3000)
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureBase64(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    } else {
      alert('Only PNG files are allowed');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className='text-center text-2xl font-bold'>Update Your <span className='text-blue-500'>Data</span></DialogTitle>
      <DialogContent>
      {showAlert && <div className='p-[30px] w-full flex justify-center'><Alert message="UserData Updated Sucessfully"/></div>}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            type="tel"
            {...register('phone', { 
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]{7,}$/,
                message: 'Phone number must be at least 7 digits and contain only numbers'
              }
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="DOB"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dob', { required: 'Date of Birth is required' })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            {...register('address.city', { required: 'City is required' })}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
          />
          <TextField
            label="District"
            fullWidth
            margin="normal"
            {...register('address.district', { required: 'District is required' })}
            error={!!errors.address?.district}
            helperText={errors.address?.district?.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Province</InputLabel>
            <Select
              label="Province"
              {...register('address.province', { required: 'Province is required' })}
              value={watch('address.province')}
              onChange={(e) => setValue('address.province', e.target.value)}
              error={!!errors.address?.province}
            >
              {[...Array(7).keys()].map(num => (
                <MenuItem key={num} value={`Province ${num + 1}`}>Province {num + 1}</MenuItem>
              ))}
            </Select>
            {errors.address?.province && <FormHelperText error>{errors.address.province.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              {...register('address.country', { required: 'Country is required' })}
              value={watch('address.country')}
              onChange={(e) => setValue('address.country', e.target.value)}
              label="Country"
              error={!!errors.address?.country}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            {errors.address?.country && <FormHelperText error>{errors.address.country.message}</FormHelperText>}
          </FormControl>
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept=".png"
              onChange={handleFileChange}
            />
          </Button>
          {profilePictureBase64 && (
            <img src={profilePictureBase64} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserData;

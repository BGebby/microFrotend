import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { Person } from '../Models/person';
import { api } from '../services/service.person';


type PersonFormData = Omit<Person, 'id' | 'created_at'>;

interface PersonFormProps {
  onSuccess: () => void;
}

export function PersonForm({ onSuccess }: PersonFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PersonFormData>();

  const onSubmit = async (data: PersonFormData) => {
    try {
      await api.createPerson(data);
      toast.success('Person registered successfully!');
      reset();
      onSuccess();
    } catch (error) {
      toast.error('Failed to register person');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register('first_name', { required: 'First name is required', minLength: 2 })}
          className="mt-1 center h-8 px-6 w-60 rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.first_name && (
          <p className="mt-1 center text-sm text-red-600">{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register('last_name', { required: 'Last name is required', minLength: 2 })}
          className="mt-1 center h-8 px-6 w-60  rounded-md bg-gray-50	 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.last_name && (
          <p className="mt-1 center text-sm text-red-600">{errors.last_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          className="mt-1 center h-8 px-6 w-60  rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 center text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { 
            required: 'Age is required',
            min: { value: 0, message: 'Age must be at least 0' },
            max: { value: 120, message: 'Age must be less than 120' }
          })}
          className="mt-1 center h-8 px-6 w-60  rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.age && (
          <p className="mt-1 center text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', { 
            required: 'Phone is required',
            pattern: { value: /^\+?[\d\s-]+$/, message: 'Invalid phone number format' }
          })}
          className="mt-1 center h-8 px-6 w-60  rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.phone && (
          <p className="mt-1 center text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="center h-8 px-6 w-60 center justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register Person
      </button>
    </form>
  );
}
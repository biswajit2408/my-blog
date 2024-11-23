// src/hooks/useFormHook.js

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useFormHook = (schema, onSubmit) => {
  const {
    control,
    handleSubmit, // This function will handle form submission
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Return handleSubmit (the one that triggers onSubmit) and other necessary properties
  return {
    control,
    handleSubmit,  // We will use this directly in the component
    setValue,
    errors,
    isSubmitting,
  };
};

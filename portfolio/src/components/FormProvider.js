// src/components/FormProvider.js

import React from 'react';
import { FormProvider as RHFormProvider } from 'react-hook-form';

const FormProvider = ({ methods, onSubmit, children }) => {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </RHFormProvider>
  );
};

export default FormProvider;

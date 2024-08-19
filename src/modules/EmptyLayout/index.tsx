import React from 'react';
import { Outlet } from 'react-router-dom';

export const EmptyLayout = () => {
  return (
    <div className="w-full h-screen py-12 px-4 md:pt-24 md:pb-12 md:px-8 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AdaptorRes } from 'src/core/adaptors';
import { VerificationIndividualRes } from 'src/core/api';

export const RedirectToVerification = () => {
  const { data } = useLoaderData() as AdaptorRes<VerificationIndividualRes>;
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.id) {
      navigate(`/connect/verification/${data.id}`);
    }
  }, [data, navigate]);

  return null;
};

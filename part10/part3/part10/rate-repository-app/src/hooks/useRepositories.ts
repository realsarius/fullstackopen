import React, { useState, useEffect } from 'react';
import { RepositoryListResponse } from '../types';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const useRepositories = () => {
    const { data, loading, error } = useQuery<RepositoryListResponse>(GET_REPOSITORIES);

    // useEffect(() => {
    //     console.log('Loading:', loading);
    //     console.log('Error:', error);
    //     console.log('Data:', data);
    // }, [loading, error, data]);

    return {
        repositories: data?.repositories || null,
        loading,
        error,
    };
};

export default useRepositories;
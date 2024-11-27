import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';

const useUserFaceData = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic=useAxiosPublic()
    const { isLoading, refetch,data: faceData=[] } = useQuery({
        queryKey: ['details'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getUserFaceData/${user.email}`)
            // console.log(res.data)
            return res.data;
          },

    })
    return [isLoading,faceData,refetch]
};

export default useUserFaceData;
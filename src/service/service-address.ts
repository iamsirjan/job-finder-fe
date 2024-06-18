import { useQuery } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';

interface IAddressResponse {
  name: string;
  id: string;
}

const getDistrictList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAddressResponse[]>>(
    api.location.district,
  );
  return data.data;
};

export const useGetDistrictList = () => {
  return useQuery('districts', () => getDistrictList(), {
    keepPreviousData: true,
  });
};

const getMunicipalityList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAddressResponse[]>>(
    api.location.municipality,
  );
  return data.data;
};

export const useGetMunicipalityList = () => {
  return useQuery('municipality', () => getMunicipalityList(), {
    keepPreviousData: true,
  });
};

const getProvinceList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAddressResponse[]>>(
    api.location.province,
  );
  return data.data;
};

export const useGetProvinceList = () => {
  return useQuery('province', () => getProvinceList(), {
    keepPreviousData: true,
  });
};

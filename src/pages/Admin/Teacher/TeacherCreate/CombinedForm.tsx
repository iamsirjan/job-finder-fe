import { Flex, Input, Select, VStack, Divider } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useGetDistrictListById,
  useGetMunicipalityListById,
  useGetProvinceList,
} from 'service/service-address';
import { IRegisterUserRequest } from 'service/service-register-common';

import FormField from 'components/form/FormField';
import {
  AvailableTime,
  AvailableTypeEnum,
  GENDER,
} from 'pages/Register/TeacherRegistration/firstStep/constant';
import { OrganizationTypes } from 'pages/Register/OrganizationRegistration/firstStep/constant';
import { IFirstStep } from 'pages/Register/TeacherRegistration/firstStep/interface';

interface ICombinedForm {
  user: IRegisterUserRequest;
  teacher: IFirstStep;
}

const CombinedForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<ICombinedForm>();

  useEffect(() => {
    if (watch('teacher.available_time') === AvailableTypeEnum.FULLTIME) {
      setValue('teacher.no_of_periods', 6);
    } else {
      setValue('teacher.no_of_periods', 0);
    }
  }, [watch('teacher.available_time')]);

  const province = useGetProvinceList();

  const districtByID = useGetDistrictListById({
    id: watch('teacher.province'),
  });

  const municipalityByID = useGetMunicipalityListById({
    id: watch('teacher.district'),
  });

  return (
    <VStack gap={2} w="60%" py={5}>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField label="Email" error={errors.user?.email?.message}>
          <Input {...register('user.email')} size="md" />
        </FormField>
        <FormField label="Phone Number" error={errors.user?.phone?.message}>
          <Input {...register('user.phone')} size="md" type="number" />
        </FormField>
      </Flex>
      <FormField label="Address" error={errors.user?.address?.message}>
        <Input {...register('user.address')} size="md" />
      </FormField>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField label="Password" error={errors.user?.password?.message}>
          <Input {...register('user.password')} size="md" type="password" />
        </FormField>
        <FormField
          label="Confirm Password"
          error={errors.user?.confirm_password?.message}
        >
          <Input
            {...register('user.confirm_password')}
            size="md"
            type="password"
          />
        </FormField>
      </Flex>
      <Divider my={2} />
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField
          label="First Name"
          error={errors.teacher?.first_name?.message}
        >
          <Input {...register('teacher.first_name')} size="md" />
        </FormField>
        <FormField
          label="Middle Name"
          error={errors.teacher?.middle_name?.message}
        >
          <Input {...register('teacher.middle_name')} size="md" />
        </FormField>
      </Flex>
      <FormField label="Last Name" error={errors.teacher?.last_name?.message}>
        <Input {...register('teacher.last_name')} size="md" />
      </FormField>
      <FormField error={errors.teacher?.gender?.message} label="Select Gender">
        <Select {...register('teacher.gender')} placeholder="Select Option">
          {GENDER.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField error={errors.teacher?.biography?.message} label="Biography">
        <Input {...register('teacher.biography')} type="text" />
      </FormField>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField
          label="Date of birth"
          error={errors.teacher?.date_of_birth?.message}
        >
          <Input
            {...register('teacher.date_of_birth')}
            type="date"
            placeholder="Date of Birth"
          />
        </FormField>
        <FormField
          label="Experience"
          error={errors.teacher?.experience_in_years?.message}
        >
          <Input {...register('teacher.experience_in_years')} size="md" />
        </FormField>
      </Flex>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField label="Province" error={errors.teacher?.province?.message}>
          <Select
            {...register('teacher.province')}
            placeholder="Select Province"
          >
            {province.data?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="District" error={errors.teacher?.district?.message}>
          <Select
            {...register('teacher.district')}
            placeholder="Select District"
          >
            {districtByID.data?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          label="Municipality"
          error={errors.teacher?.municipality?.message}
        >
          <Select
            {...register('teacher.municipality')}
            placeholder="Select Municipality"
          >
            {municipalityByID.data?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </Select>
        </FormField>
      </Flex>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField
          label="Intrested Organization"
          error={errors.teacher?.interested_organization?.message}
        >
          <Select
            {...register('teacher.interested_organization')}
            placeholder="Select Organization"
          >
            {OrganizationTypes.map((data) => (
              <option key={data.label} value={data.value}>
                {data.label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          label="Available Time"
          error={errors.teacher?.available_time?.message}
        >
          <Select
            {...register('teacher.available_time')}
            placeholder="Select Available Time"
          >
            {AvailableTime.map((data) => (
              <option key={data.value} value={data.value}>
                {data.label}
              </option>
            ))}
          </Select>
        </FormField>
      </Flex>
      <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
        <FormField
          label="No of Periods"
          error={errors.teacher?.no_of_periods?.message}
        >
          <Input
            {...register('teacher.no_of_periods')}
            size="md"
            type="number"
            placeholder="no of periods"
          />
        </FormField>
        <FormField
          label="Salary Per Period"
          error={errors.teacher?.salary_per_period?.message}
        >
          <Input
            {...register('teacher.salary_per_period')}
            placeholder="Salary Per Period"
            size="md"
          />
        </FormField>
      </Flex>
      {watch('teacher.available_time') === '2' && (
        <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%" gap={2}>
          <FormField
            label="Period From Time"
            error={errors.teacher?.period_from_time?.message}
          >
            <Input {...register('teacher.period_from_time')} type="time" />
          </FormField>
          <FormField
            label="Period To Time"
            error={errors.teacher?.period_to_time?.message}
          >
            <Input {...register('teacher.period_to_time')} type="time" />
          </FormField>
        </Flex>
      )}
    </VStack>
  );
};

export default CombinedForm;

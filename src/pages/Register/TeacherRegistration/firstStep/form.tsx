import { Flex, Input, Select, Switch, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { AvailableTime, AvailableTypeEnum, GENDER } from './constant';
import { OrganizationTypes } from 'pages/Register/OrganizationRegistration/firstStep/constant';
import { IFirstStep } from './interface';
import { useEffect } from 'react';
import {
  useGetDistrictList,
  useGetMunicipalityList,
  useGetProvinceList,
} from 'service/service-address';

const Form = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<IFirstStep>();

  useEffect(() => {
    if (watch('available_time') === AvailableTypeEnum.FULLTIME) {
      setValue('no_of_periods', 6);
    } else {
      setValue('no_of_periods', 0);
    }
  }, [watch('available_time')]);

  const district = useGetDistrictList();

  const municipality = useGetMunicipalityList();

  const province = useGetProvinceList();

  return (
    <VStack gap={5}>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="First Name" error={errors.first_name?.message}>
          <Input {...register('first_name')} name="first_name" size={'md'} />
        </FormField>
        <FormField label="Middle Name" error={errors.middle_name?.message}>
          <Input {...register('middle_name')} name="middle_name" size={'md'} />
        </FormField>
      </Flex>
      <FormField label="Last Name" error={errors.last_name?.message}>
        <Input {...register('last_name')} name="last_name" size={'md'} />
      </FormField>
      <FormField label="Gender" error={errors.gender?.message}>
        <Select {...register('gender')} placeholder="Select option">
          {GENDER?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="Date of birth" error={errors.date_of_birth?.message}>
          <Input
            {...register('date_of_birth')}
            name="date_of_birth"
            type="date"
          />
        </FormField>
        <FormField
          label="Experience"
          error={errors.experience_in_years?.message}
        >
          <Input
            {...register('experience_in_years')}
            name="experience_in_years"
            size={'md'}
          />
        </FormField>
      </Flex>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="Province" error={errors.province?.message}>
          <Select {...register('province')} placeholder="Select option">
            {province.data?.map((data) => (
              <option value={data.id}>{data.name}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="District" error={errors.district?.message}>
          <Select {...register('district')} placeholder="Select option">
            {district.data?.map((data) => (
              <option value={data.id}>{data.name}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Municipality" error={errors.municipality?.message}>
          <Select {...register('municipality')} placeholder="Select option">
            {municipality.data?.map((data) => (
              <option value={data.id}>{data.name}</option>
            ))}
          </Select>
        </FormField>
      </Flex>

      <FormField
        label="Interested Organization"
        error={errors.interested_organization?.message}
      >
        <Select
          {...register('interested_organization')}
          placeholder="Select option"
        >
          {OrganizationTypes?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Available Time" error={errors.available_time?.message}>
        <Select {...register('available_time')} placeholder="Select option">
          {AvailableTime?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="No of Periods" error={errors.no_of_periods?.message}>
          <Input
            {...register('no_of_periods')}
            name="no_of_periods"
            disabled={watch('available_time') === AvailableTypeEnum.FULLTIME}
            size={'md'}
          />
        </FormField>

        <FormField
          label="Salary Per Period"
          error={errors.salary_per_period?.message}
        >
          <Input
            {...register('salary_per_period')}
            name="salary_per_period"
            size={'md'}
          />
        </FormField>
      </Flex>

      {watch('available_time') === AvailableTypeEnum.PARTTIME && (
        <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
          <FormField
            label="Period Start Time"
            error={errors.period_from_time?.message}
          >
            <Input
              {...register('period_from_time')}
              name="period_from_time"
              size={'md'}
              type="time"
            />
          </FormField>

          <FormField
            label="period To Time"
            error={errors.period_to_time?.message}
          >
            <Input
              type="time"
              {...register('period_to_time')}
              name="period_to_time"
              size={'md'}
            />
          </FormField>
        </Flex>
      )}
      <Flex justifyContent={'space-between'} w={'100%'}>
        <FormField label="Are you available?">
          <Switch size="sm" {...register('is_available')} />
        </FormField>
        <FormField label="Are you available for tution?">
          <Switch size="sm" {...register('is_available_for_tution')} />
        </FormField>
      </Flex>
      <Flex justifyContent={'space-between'} w={'100%'}>
        <FormField label="Lodging?">
          <Switch size="sm" {...register('lodging')} />
        </FormField>
        <FormField label="Fooding?">
          <Switch size="sm" {...register('fooding')} />
        </FormField>
      </Flex>
    </VStack>
  );
};

export default Form;

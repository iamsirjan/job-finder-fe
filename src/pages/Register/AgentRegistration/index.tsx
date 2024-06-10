import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import Wrapper from 'wrapper';
import FirstStep from './firstStep';
import SecondStep from './secondStep';

import { useRegistrationStore } from 'state/registration.state';
import { useEffect } from 'react';
import { THEME_COLORS } from 'theme/color';
import { useGetUserDetails } from 'service/service-user';

const AgentStep = () => {
  const step = useRegistrationStore((state) => state);

  const userDetails = useGetUserDetails();
  useEffect(() => {
    if (userDetails) step.setStep(userDetails.data?.step_of_register ?? 0);
  }, [userDetails.data]);

  const renderStep = () => {
    switch (step.step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;

      default:
        return <FirstStep />; // Default to the first step
    }
  };
  return (
    <Wrapper showNavbar={false}>
      <Flex justifyContent={'center'} alignItems={'center'} w="100%">
        <Flex flexDirection={'column'}>
          <Slider w={'100%'} min={0} max={2} value={step.step}>
            <SliderTrack height={'6px'} borderRadius="6px">
              <SliderFilledTrack
                borderRadius={'6px'}
                background={THEME_COLORS.primary[1000]}
              />
            </SliderTrack>
          </Slider>
          <Text fontWeight={'800'} fontSize={'16px'} mt={8}>
            Complete Profile
          </Text>
          <Text fontSize={'13px'}>
            Few more steps before we are ready to get started
          </Text>
          <Box mt={'50px'}>{renderStep()}</Box>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default AgentStep;

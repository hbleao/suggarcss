import { Flex, Skeleton, Spacing } from '@/components';

export const LoaderAddressList = () => (
  <Skeleton.Root>
    <Skeleton.Block width='16rem' height='2.4rem' />
    <Spacing top="1.6rem" />
    <Flex gap="0.8rem" align='center'>
      <Skeleton.Block width='2.4rem' height='2.4rem' borderRadius='30px' />
      <Skeleton.Block width='30.2rem' height='2.4rem' />
    </Flex>
    <Spacing top="1.6rem" />
    <Flex gap="0.8rem" align='center'>
      <Skeleton.Block width='2.4rem' height='2.4rem' borderRadius='30px' />
      <Skeleton.Block width='27.5rem' height='2.4rem' />
    </Flex>
    <Spacing top="1.6rem" />
    <Flex gap="0.8rem" align='center'>
      <Skeleton.Block width='2.4rem' height='2.4rem' borderRadius='30px' />
      <Skeleton.Block width='29rem' height='2.4rem' />
    </Flex>
    <Spacing top="1.6rem" />
    <Flex gap="0.8rem" align='center'>
      <Skeleton.Block width='2.4rem' height='2.4rem' borderRadius='30px' />
      <Skeleton.Block width='23rem' height='2.4rem' />
    </Flex>
  </Skeleton.Root>
)

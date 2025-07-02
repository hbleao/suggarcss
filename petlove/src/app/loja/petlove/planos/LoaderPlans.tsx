import { Skeleton, Spacing } from "@/components";

export const LoaderPlans = () => (
  <div style={{
    width: '315px',
    height: '500px',
    border: '1px solid #C8C8C8',
    borderRadius: '4px',
    padding: '16px'
  }}>
    <Skeleton.Root>
      <Skeleton.Block width="13rem" height="2.4rem" />
      <Spacing bottom="1.6rem" />
      <Skeleton.Block width="27.5rem" height="2.4rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="20rem" height="2.4rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="10rem" height="2.4rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="10rem" height="2.4rem" />
      <Spacing bottom="1.6rem" />
      <Skeleton.Block width="32rem" height="4.8rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="32rem" height="3.2rem" />
      <Spacing bottom="1.6rem" />
      <Skeleton.Block width="8rem" height="1.6rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="20rem" height="1.6rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="15rem" height="1.6rem" />
      <Spacing bottom="0.8rem" />
      <Skeleton.Block width="22rem" height="1.6rem" />
      <Spacing bottom="7rem" />
      <Skeleton.Block width="12rem" height="1.6rem" />
    </Skeleton.Root>
  </div>

)

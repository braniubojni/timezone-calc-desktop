import { Card } from './Card';
import { Wrapper } from './styles';

export const Cards = () => {
  return (
    <Wrapper>
      <Card timezone="Asia/Yerevan" />
      <Card timezone="Europe/Moscow" />
      <Card timezone="Europe/Warsaw" />
    </Wrapper>
  );
};

import { Cell, Selectable } from '@telegram-apps/telegram-ui'
import { FC } from 'react'

type QuizCardProps = any

export const QuizCard: FC<QuizCardProps> = ({
  value,
  description,
  text
}) => {

  const onChange = (value: string) => {
    // const locale = value as Locale;
    // setLocale(locale);
  };

  return (
    <div>Cards Goes Here</div>
  );
};




import { Cell, Selectable } from '@telegram-apps/telegram-ui'
import { FC } from 'react'

type QuizOptionProps = {
  value: string | number;
  description: string;
  text: string;
  onChange: any;
}

export const QuizOption: FC<QuizOptionProps> = ({
  value,
  description,
  text,
  onChange
}) => {

  // const onChange = (value: string) => {
  //   // const locale = value as Locale;
  //   // setLocale(locale);
  // };

  return (
    <Cell onClick={onChange} Component="label" before={<Selectable name="group" value={value} />} description={description} >
      {text}
    </Cell>
  );
};




import Radio, { IRadio } from './Radio';
import { FieldValues } from 'react-hook-form';

// TODO: use formControl instead of index to export file
function FormControl(props: IFormControlProps) {
  const { control, ...rest } = props;
  switch (control) {
    case 'radio':
      return <Radio {...(rest as IRadio<FieldValues>)} />;

    default:
      return null;
  }
}

export default FormControl;
interface IFormControlProps {
  control: string;
}

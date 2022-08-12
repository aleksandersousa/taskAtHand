import { useState } from 'react';
import { Container, Input, Label, TextArea } from './styles';
import { TextFieldProps } from './typing';

const TextField: React.FC<TextFieldProps> = ({
  label,
  height,
  paddingTop,
  marginBottom,
  focus,
  customRef,
  type,
  textArea = false,
  disableLabel = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');

  const handleTextChange = (text: string) => {
    setValue(text);

    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    window.localStorage.setItem(label as string, text);
    window.dispatchEvent(new Event('storage'));
  };

  window.addEventListener('storage', () => {
    setValue(window.localStorage.getItem(label as string) || '');
  });

  return (
    <Container
      height={height}
      paddingTop={paddingTop}
      marginBottom={marginBottom}
      disableLabel={disableLabel}
    >
      {!textArea ? (
        <Input
          ref={
            customRef as
              | ((instance: HTMLInputElement | null) => void)
              | React.RefObject<HTMLInputElement>
              | null
              | undefined
          }
          autoFocus={focus}
          type={type}
          defaultValue={value}
          onChange={e => handleTextChange(e.target.value)}
        />
      ) : (
        <TextArea
          defaultValue={value}
          ref={
            customRef as
              | ((instance: HTMLTextAreaElement | null) => void)
              | React.RefObject<HTMLTextAreaElement>
              | null
              | undefined
          }
          onChange={e => handleTextChange(e.target.value)}
        />
      )}
      <Label className={isActive ? 'active' : ''} disableLabel={disableLabel}>
        {label}
      </Label>
    </Container>
  );
};

export default TextField;

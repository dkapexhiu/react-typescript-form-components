import React, { FC, useCallback, useEffect } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import FormInput from '../FormInput/FormInput';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import Label from '../Label/Label';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import Checkbox from '../CheckBox/CheckBox';
import Select from '../Select/Select';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  marketing: boolean;
  marketing2: boolean;
  weeklytips: boolean;
  newfeatures: boolean;
  singleselectbox?: string;
  multipleselectbox?: string;
  checkbox: boolean;
  marketingRole: string[];
};

const MARKETING_ROLE_OPTIONS = [
  {
    label: 'test',
    value: 'test',
  },
  {
    label: 'test 2',
    value: 'test 2',
  },
  {
    label: 'test 3',
    value: 'test 3',
  },
  {
    label: 'test 4',
    value: 'test 4',
  },
];

export default function Form() {
  const { register, handleSubmit, errors, setValue } = useForm<FormData>();
  const [marketingRoleValue, setMarketingRoleValue] = React.useState<Array<string>>([]);

  useEffect(() => {
    register({ name: 'marketingRole' });
  }, [register]);

  /*const onSubmit = handleSubmit(
    ({ firstName, lastName, weeklytips, phone, email, newfeatures, checkbox, marketingRole }) => {
      console.log(firstName, lastName, weeklytips, phone, email, newfeatures, checkbox, marketingRole);
      document.getElementById('resBtn')?.click();
    },
  );*/

  const onSubmit = handleSubmit(
    (values) => {
      console.log(values);
      document.getElementById('resBtn')?.click();
    },
  );

  const clearState = () => {
    setMarketingRoleValue([]);
    document.getElementById('resBtn')?.click();
  };

  return (
    <form onSubmit={onSubmit}>
      <TwoColumnGrid>
        <FormInput
          fillWidth
          label="FirstName *"
          name="firstName"
          ref={register({})}
          error={errors.firstName && 'First name is required.'}
        />
        <FormInput
          fillWidth
          label="Lastname *"
          name="lastName"
          ref={register({})}
          error={errors.lastName && 'Last name is required.'}
        />
        <FormInput fillWidth label="Phone Number" name="phone" ref={register({})} />
        <FormInput
          fillWidth
          label="E-Mail *"
          name="email"
          type="email"
          ref={register({})}
          error={errors.email && 'E-Mail is required.'}
        />
        <Label title="Marketing 1">
          <Toggle
            name="weeklytips"
            label="Send me weekly tips to help me improve the engagement on my store"
            defaultValue
            ref={register({})}
          />
        </Label>
        <Label title="Marketing 2">
          <Toggle
            name="newfeatures"
            label="I want to be the first to hear about new features"
            defaultValue
            ref={register({})}
          />
        </Label>
        <Label title="Marketing Role">
          <Select
            options={[...MARKETING_ROLE_OPTIONS]}
            placeholder="Select a marketing role"
            value={marketingRoleValue}
            onChange={selectedOptions => {
              setMarketingRoleValue(selectedOptions);
              setValue('marketingRole', selectedOptions);
            }}
            isMultiSelect
          />
        </Label>
        <Label title="Accept">
          <Checkbox name="checkbox" label="Accept" defaultValue ref={register({})} />
        </Label>
        <Button size="big" type="submit">
          Submit
        </Button>
        <Button id="resBtn" size="big" type="reset" onClick={clearState}>
          Reset
        </Button>
      </TwoColumnGrid>
    </form>
  );
}

const rootElement = document.getElementById('root');
render(<Form />, rootElement);

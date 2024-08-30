import React from 'react';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CreateUpdateVerificationProps } from './index.type';

export const CreateUpdateVerification: React.FC<CreateUpdateVerificationProps> = ({ verification }) => {
  const renderRowTitle = (title, subtitle) => {
    return (
      <div className={css['section__label']}>
        <div className={css['section__title']}>{title}</div>
        <div className={css['section__subtitle']}>{subtitle}</div>
      </div>
    );
  };

  return (
    <div className={css['container']}>
      <div className={css['header']}>
        <div className={css['header__title']}>Create a verification request</div>
        <div className={css['header__action']}>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary" customStyle={css['btn']}>
            <Icon name="eye" fontSize={20} color={variables.color_grey_700} />
            Preview
          </Button>
          <Button variant="contained" color="primary">
            Create
          </Button>
        </div>
      </div>
      <div className={css['section']}>
        <div className={css['section__row']}>
          {renderRowTitle('Name', 'This will be used for reference only by yourself and the credential holder.')}
          <Input
            id="name"
            label=""
            name="name"
            //register={register}
            placeholder="Add a name"
            containerClassName="w-full md:w-[32rem]"
            // errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
        </div>
        <div className={css['section__row']}>
          {renderRowTitle(
            'Description',
            'Describe the purpose of the credential request for both the requester and the credential holder.',
          )}
          <Input
            id="description"
            label=""
            name="description"
            //register={register}
            placeholder="Enter a description..."
            // errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
            multiline
            customHeight="180px"
            maxRows={7}
            containerClassName="w-full"
          />
        </div>
        <div className={css['section__row']}>
          {renderRowTitle(
            'Credential requests',
            'A verification can return as either valid or invalid.Define what constitutes a valid verification. Fields must match the credential schema exactly.',
          )}
          <SearchDropdown
            id="schema"
            name="schema"
            // value={category}
            label="Schema is equal to"
            placeholder="Enter or select a schema"
            // options={catagoriesList}
            isSearchable
            // onChange={onSelectCategory}
            // errors={errors['category']?.value?.message ? [errors['category']?.value?.message.toString()] : undefined}
            containerClassName="w-full md:w-[20rem]"
          />
        </div>
        <div className={css['section__row']}>
          <div className={css['header__action']}>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
            <Button variant="outlined" color="primary" customStyle={css['btn']}>
              <Icon name="eye" fontSize={20} color={variables.color_grey_700} />
              Preview
            </Button>
            <Button variant="contained" color="primary">
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Input from 'src/modules/General/components/Input';
import EmptyPageLayout from 'src/modules/SignIn/containers/EmptyPageLayout';

import { useNewPassword } from './useNewPassword';

export const NewPassword = () => {
    const { handleBack, register, errors, handleSubmit, handleReset, translate } = useNewPassword();
    return (
        <EmptyPageLayout
            headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="lock-01" />}
            title={translate('forget-pass-title')}
            subtitle={translate('forget-pass-subtitle')}
            backLinkLabel={translate('ver-back')}
            backLinkAction={handleBack}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                    <Input
                        id="password"
                        type="password"
                        label={translate('forget-pass-input-lbl')}
                        name="password"
                        register={register}
                        placeholder={translate('forget-pass-input-placeholder')}
                        hints={[{ hint: translate('forget-pass-input-hint'), hide: false }]}
                        errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
                    />
                    <Input
                        id="password-confirm"
                        label={translate('forget-pass-confirm')}
                        name="confirmPassword"
                        type="password"
                        register={register}
                        placeholder={translate('forget-pass-confirm-placeholder')}
                        errors={
                            errors['confirmPassword']?.message
                                ? [errors['confirmPassword']?.message.toString()]
                                : undefined
                        }
                    />
                </div>
                <Button variant="contained" color="primary" onClick={handleSubmit(handleReset)}>
                    {translate('forget-pass-reset-btn')}
                </Button>
            </div>
        </EmptyPageLayout>
    );
};

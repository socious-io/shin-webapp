import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import EmptyPageLayout from 'src/modules/SignIn/containers/EmptyPageLayout';

export const Reset = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <EmptyPageLayout
            headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="check-circle" />}
            title={t('reset-title')}
            subtitle={t('reset-subtitle')}
        >
            <Button variant="contained" color="primary" onClick={() => navigate('/sign-in/email')}>
                {t('reset-btn-label')}
            </Button>
        </EmptyPageLayout>
    );
};

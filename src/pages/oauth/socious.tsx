import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { getUserProfileAdaptor, SociousAuthRes, sociousOauthAdaptor } from 'src/core/adaptors';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import store from 'src/store';
import { setUserProfile } from 'src/store/reducers/user.reducer';

export const SociousOauth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get('access_token');
  const sociousLoginURL = `https://${config.env === 'development' ? 'dev.' : ''}socious.io/api/v3/sso/login?redirect_url=${config.appBaseURL}/oauth/socious`;

  const onLoginSucceed = async (loginResp: SociousAuthRes) => {
    const { registered, ...rest } = loginResp;
    await setAuthParams(rest, true);
    const { data: userProfile } = await getUserProfileAdaptor();
    store.dispatch(setUserProfile(userProfile));
    if (registered) {
      localStorage.setItem('password', 'PASSWORD_NOT_SET');
      navigate(`/sign-up/detail?email=${userProfile?.email}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const signInWithSocious = async () => {
      if (!access_token) {
        window.location.href = sociousLoginURL;
        return;
      } else {
        const { data, error } = await sociousOauthAdaptor(access_token);
        if (error) navigate('/sign-in');
        data && onLoginSucceed(data);
      }
    };
    signInWithSocious();
  }, [access_token]);

  return <></>;
};

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { AuthRes, getAuthUrlAdaptor, sociousOauthAdaptor } from 'src/core/adaptors';
import { setAuthParams, switchAccount } from 'src/core/api/auth/auth.service';

export const SociousID = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const identityId = searchParams.get('identity_id');

  const fetchAuthURL = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + '/oauth/socious');
    if (error) return;
    else if (data) return data.url;
  };

  async function onLoginSucceed(loginRes: AuthRes) {
    await setAuthParams(loginRes, true);
    if (typeof identityId === 'string') switchAccount(identityId);
    const lastPath = Cookies.get('lastPath');
    if (lastPath) navigate(lastPath);
    else navigate('/');
    return loginRes;
  }

  useEffect(() => {
    const handleSociousOauth = async (authCode: string) => {
      const { error, data } = await sociousOauthAdaptor(authCode);
      if (error) navigate('/intro');
      else if (data) onLoginSucceed(data);
    };

    const redirectToAuthURL = async () => {
      const authURL = await fetchAuthURL();
      if (authURL) {
        window.location.href = authURL;
      }
    };

    if (!code) {
      redirectToAuthURL();
      return;
    }

    handleSociousOauth(code);
  }, [code]);

  return null;
};

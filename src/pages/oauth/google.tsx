import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
/* import { googleOauthAdaptor } from 'src/core/adaptors/signIn';
import { getIdentityAdaptor } from 'src/core/adaptors/site'; */
import { AuthRes, GoogleAuthRes } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';

export const GoogleOauth2 = () => {
  const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleOauthClientId}&redirect_uri=${window.location.href}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function onLoginSucceed(loginResp: GoogleAuthRes) {
    await setAuthParams(loginResp as AuthRes, true);
    // store.dispatch(setIdentity(await getIdentityAdaptor()));
    // const registered = (loginResp.registered ??= false);
    // TODO: define redirect path
    navigate('/');
    return loginResp;
  }

  const code = searchParams.get('code');

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (!code) {
        window.location.href = googleLoginURL;
        return;
      } else {
        const res = await googleOauthAdaptor(code);
        if (res.error) navigate('/sign-in');
        else onLoginSucceed(res);
      }
    };
    signInWithGoogle();
  }, [code]);

  return <></>;
};

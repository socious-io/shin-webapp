import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUserProfileAdaptor, GoogleAuthRes, googleOauthAdaptor } from 'src/core/adaptors';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import store from 'src/store';
import { setUserProfile } from 'src/store/reducers/user.reducer';

export const GoogleOauth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${window.location.href}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

  const onLoginSucceed = async (loginResp: GoogleAuthRes) => {
    const { registered = false, ...rest } = loginResp;
    await setAuthParams(rest, true);
    store.dispatch(setUserProfile(await getUserProfileAdaptor()));
    //TODO: if not registered, what happened
    if (registered) navigate('/');
  };

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (!code) {
        window.location.href = googleLoginURL;
        return;
      } else {
        const { data, error } = await googleOauthAdaptor(code);
        if (error) navigate('/sign-in');
        data && onLoginSucceed(data);
      }
    };
    signInWithGoogle();
  }, [code]);

  return <></>;
};

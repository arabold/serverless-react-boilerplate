import Amplify from 'aws-amplify'
import { ConfigConsumer } from '../components/ConfigProvider';

export function configureAmplify(config) {
  Amplify.configure({
    Auth: {
      region: config.cognito.REGION,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.USER_POOL_CLIENT_ID,
    },
  });
};

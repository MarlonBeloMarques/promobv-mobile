import React from 'react';
import { Block } from '../../elements';
import { DotIndicator } from "react-native-indicators";
import { theme } from '../../constants';

const RedirectSocialScreen = () => {
  return (
    <Block middle center>      
      <DotIndicator color={theme.colors.gray3} size={10} />
    </Block>
  );
}

export default RedirectSocialScreen;
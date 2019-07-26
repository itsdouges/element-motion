import * as React from 'react';
import * as Common from '@element-motion/dev';
import * as Styled from './styled';
import ReshapingContainer from '../../../RevealReshapingContainer';

const avatar = require('./images/avatar.jpg');

const NotificationPill = () => (
  <Styled.AlignCenter>
    <Common.Toggler interval onIntervalSet={val => val + 1}>
      {toggler => (
        <ReshapingContainer
          triggerKey={toggler.shown}
          display="inline-block"
          boxShadow="rgba(255, 255, 255, 0.25) 0px 3px 6px"
          padding="4px 6px"
          borderRadius="20px"
          maxWidth="250px"
          background="#fff"
        >
          {motion => (
            <Styled.MessageNotification {...motion} onClick={() => toggler.set(toggler.shown + 1)}>
              <Styled.Avatar src={avatar} />
              <Styled.NotificationText>{Styled.messages(toggler.shown)}</Styled.NotificationText>
            </Styled.MessageNotification>
          )}
        </ReshapingContainer>
      )}
    </Common.Toggler>
  </Styled.AlignCenter>
);

export default NotificationPill;

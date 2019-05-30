import styled from 'styled-components';

const avatarSize = '18px';

export const MessageNotification = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

export const AlignCenter = styled.div`
  text-align: center;
`;

export const NotificationText = styled.span`
  width: calc(100% - ${avatarSize});
  padding-right: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: ${avatarSize};
  width: ${avatarSize};
  flex-shrink: 0;
  margin-right: 6px;
  object-fit: cover;
  background-color: #ccc;
`;

export const messages = (index: number = 0) => {
  const msgs = [
    'seriously help me i cant get past genchrio',
    'sekiro is so hard meh',
    'hello???',
    'how do i cheese it????',
  ];
  return msgs[index % msgs.length];
};

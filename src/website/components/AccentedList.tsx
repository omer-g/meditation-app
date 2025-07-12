import React from 'react';
import { List, ThemeIcon, useMantineTheme, ListProps, ThemeIconProps } from '@mantine/core';

interface AccentListProps extends ListProps {
  bulletSize?: number;
  bulletColor?: ThemeIconProps['color'];
}

export const AccentList: React.FC<AccentListProps> = ({
  children,
  bulletSize = 7,
  bulletColor,
  ...props
}) => {
  const theme = useMantineTheme();
  return (
    <List
      icon={
        <ThemeIcon
          color={bulletColor ?? theme.primaryColor}
          size={bulletSize}
          radius="xl"
          style={{ marginBottom: 2.1, marginRight: 8 }}
        />
      }
      {...props}
    >
      {children}
    </List>
  );
};

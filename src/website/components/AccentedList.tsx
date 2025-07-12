import React from 'react';
import { List, ThemeIcon, useMantineTheme, ListProps, ThemeIconProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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
  const isMobile = useMediaQuery('(max-width: 36em)');

  if (isMobile) {
    return (
      <List {...props}>
        {children}
      </List>
    )
  }

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

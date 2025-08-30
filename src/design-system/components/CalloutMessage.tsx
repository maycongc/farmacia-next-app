import { Callout } from '@radix-ui/themes';
import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from 'lucide-react';
import React from 'react';

type Types = 'alert' | 'error' | 'info' | 'success';

type TypeProps = {
  [k in Types]: {
    color?: 'amber' | 'tomato' | 'blue' | 'grass';
    icon: React.JSX.Element;
  };
};

const typeMap: TypeProps = {
  alert: {
    color: 'amber',
    icon: <AlertTriangleIcon />,
  },

  error: {
    color: 'tomato',
    icon: <CircleXIcon />,
  },

  info: {
    color: 'blue',
    icon: <InfoIcon />,
  },

  success: {
    color: 'grass',
    icon: <CircleCheckIcon />,
  },
};

type sizeTextProps = Partial<
  | Record<
      'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
      '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
    >
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
>;

type CalloutProps = React.ComponentPropsWithoutRef<typeof Callout.Root>;

type CalloutMessageProps = CalloutProps & {
  type: Types;
  sizeText?: sizeTextProps;
};

export const CalloutMessage = React.forwardRef<
  HTMLDivElement,
  CalloutMessageProps
>(function CalloutMessage(
  { type, children, sizeText, ...props },
  forwardedRef,
) {
  return (
    <Callout.Root color={typeMap[type].color} ref={forwardedRef} {...props}>
      <Callout.Icon>{typeMap[type].icon}</Callout.Icon>

      <Callout.Text size={sizeText ? sizeText : { initial: '2' }}>
        {children}
      </Callout.Text>
    </Callout.Root>
  );
});

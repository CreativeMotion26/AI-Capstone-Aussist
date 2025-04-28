import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Card = ({ className, children, onPress, style, ...props }: CardProps) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  
  return (
    <Wrapper
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden",
        className
      )}
      style={style}
      {...(onPress && { onPress })}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardHeader = ({ className, children, style, ...props }: CardHeaderProps) => (
  <View
    className={cn("p-4 pb-2", className)}
    style={style}
    {...props}
  >
    {children}
  </View>
);

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const CardTitle = ({ className, children, style, ...props }: CardTitleProps) => (
  <Text
    className={cn("text-lg font-semibold", className)}
    style={style}
    {...props}
  >
    {children}
  </Text>
);

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const CardDescription = ({ className, children, style, ...props }: CardDescriptionProps) => (
  <Text
    className={cn("text-sm text-gray-500", className)}
    style={style}
    {...props}
  >
    {children}
  </Text>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardContent = ({ className, children, style, ...props }: CardContentProps) => (
  <View
    className={cn("p-4 pt-0", className)}
    style={style}
    {...props}
  >
    {children}
  </View>
);

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardFooter = ({ className, children, style, ...props }: CardFooterProps) => (
  <View
    className={cn("p-4 pt-2 flex-row items-center justify-end border-t border-gray-100", className)}
    style={style}
    {...props}
  >
    {children}
  </View>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 
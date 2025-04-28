import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-red-500",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "text-center font-medium",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-white",
        outline: "text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground",
        link: "text-primary",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        icon: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = ({
  className,
  textClassName,
  variant = "default",
  size = "default",
  children,
  disabled,
  loading,
  onPress,
  icon,
  iconPosition = 'left',
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, size, className }),
        disabled && "opacity-50",
        className
      )}
      style={style}
      disabled={disabled || loading}
      onPress={onPress}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="white"
          className="mr-2"
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <View className="mr-2">{icon}</View>
      )}
      
      <Text className={cn(
        buttonTextVariants({ variant, size }),
        textClassName
      )}>
        {children}
      </Text>
      
      {icon && iconPosition === 'right' && (
        <View className="ml-2">{icon}</View>
      )}
    </TouchableOpacity>
  );
};

export { Button, buttonVariants }; 
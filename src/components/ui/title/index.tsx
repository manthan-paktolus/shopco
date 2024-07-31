import { ElementType, PropsWithChildren, forwardRef } from "react";
type BaseProps = {
  className?: string;
};

type PolymorphicComponentProps<E extends ElementType, P = {}> = P &
  PropsWithChildren<BaseProps> & {
    as?: E;
  };

type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

const Title = forwardRef<
  PolymorphicRef<ElementType>,
  PolymorphicComponentProps<ElementType>
>(({ as: Component = "h1", className, children, ...rest }, ref) => {
  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});

Title.displayName = "Title";

export { Title };

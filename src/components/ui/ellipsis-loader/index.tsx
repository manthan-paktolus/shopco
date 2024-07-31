import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.scss";

const EllipsisLoader = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={clsx(styles.loader, className)} {...props} />
));
EllipsisLoader.displayName = "EllipsisLoader";

export default EllipsisLoader;

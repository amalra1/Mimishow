import Icon from '@/components/ornaments/Icon/Icon';
import type { ButtonContentProps } from '@/types/components/ui';
import { buttonPartStyles } from './buttonClassName';

export default function ButtonContent({ children, icon }: ButtonContentProps) {
  return (
    <>
      <span className={buttonPartStyles.label}>{children}</span>
      {icon && <Icon name={icon} className={buttonPartStyles.icon} />}
    </>
  );
}

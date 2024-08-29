import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Space } from 'antd';
import { ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '../navigation';
import {  GlobeAltIcon} from "@heroicons/react/24/outline";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

const LocaleSwitcherSelect: React.FC<Props> = ({
  children,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
        router.replace(
            { pathname  },
            { locale: nextLocale }
        );
    });
};

const menuItems: MenuProps['items'] = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
        return null;
    }
    const { value, locale } = child.props;
    return (
        <Menu.Item key={index} onClick={() => onSelectChange(value)}>
            {value} 
        </Menu.Item>
    );
}) as MenuProps['items'];

  return (
    <Dropdown
        overlay={<Menu>{menuItems as ReactNode[]}</Menu>}
        trigger={['click']}
        placement="bottomCenter"
        disabled={isPending}
        
    >
        <a onClick={(e) => e.preventDefault()} className='flex'>
            <Space>
                {/* <DownOutlined /> */}
                <GlobeAltIcon className="h-6 w-6 cursor-pointer globe-icon"/>
            </Space>
        </a>
    </Dropdown>
  );
};

export default LocaleSwitcherSelect;

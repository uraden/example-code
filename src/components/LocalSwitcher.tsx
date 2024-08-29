// "use client";

// import { useRouter } from "next/navigation";
// import { useTransition } from "react";
// import type { MenuProps } from "antd";
// import { Dropdown, Space } from "antd";

// import {
//   GlobeAltIcon} from "@heroicons/react/24/outline";

// export default function LocalSwitcher() {
//   const items: MenuProps["items"] = [
//     {
//       label: "🇺🇸 English",
//       key: "en",
//     },
//     {
//       label: "🇷🇺 Русский",
//       key: "ru",
//     },
//     {
//       label: "🇺🇿 O`zbek",
//       key: "uz",
//     },
//   ];

//   const router = useRouter();

//   console.log(router);
//   const [isPending, startTransition] = useTransition();

//   const onClick: MenuProps['onClick'] = ({ key }) => {
//     const nextLocale = key;
   
//     startTransition(() => {
//       router.replace(`/${nextLocale}`);
//     });
//   };
  
//   return (
//     <>
//       <span>

//       <Dropdown
//         menu={{
//           items,
//           onClick,
//         }}
//         trigger={["click"]}
        
//       > 
//           <Space>     
//             <GlobeAltIcon className="h-6 w-6 cursor-pointer globe-icon"/>
//           </Space>
        
//       </Dropdown>
//       </span>
//     </>
//   );
// }


import {useLocale, useTranslations} from 'next-intl';
import {locales} from '../config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';


export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      
      
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {/* {t(cur)} */}
        </option>
      ))}


    </LocaleSwitcherSelect>
  );
}
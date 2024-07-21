import React from 'react';
import type { SVGProps } from 'react';
import { Icon } from '@iconify/react';

// -------------------------------
import DashiconsDashboard from '@iconify-icons/dashicons/dashboard';
import AdmimHome from '@iconify-icons/dashicons/admin-home';
import BussinessMan from '@iconify-icons/dashicons/businessman';
import ArrowUp from '@iconify-icons/dashicons/arrow-up';
import ArrowDown from '@iconify-icons/dashicons/arrow-down';
import Filter from '@iconify-icons/dashicons/filter';
import Cross from '@iconify-icons/dashicons/no';
// -------------------------------

// -------------------------------
import type {IconTypes} from '@type/type'
// -------------------------------

// -------------------------------
const Iconify: React.FC<{ type: IconTypes } & SVGProps<SVGSVGElement>> = ({ type, ...props }) => {
  let useIcon = AdmimHome; // Default icon

  switch (type) {
    case 'home':
      useIcon = AdmimHome;
      break;
    case 'dashboard':
      useIcon = DashiconsDashboard;
      break;
    case 'businessman':
      useIcon = BussinessMan;
      break;     
    case 'arrowdown':
      useIcon = ArrowDown;
      break;     
    case 'arrowup':
      useIcon = ArrowUp;
      break;    
    case 'filter':
      useIcon = Filter  
      break;   
    case 'cross':
      useIcon = Cross  
      break;                        
  }

  return (
    <Icon icon={useIcon} width={props.width || 20} height={props.height || 20} />
  );
};
// -------------------------------
export default Iconify;
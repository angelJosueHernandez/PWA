import React, { useState } from 'react';
import './DefaultSidebar.css';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import QuienesSomos from './QuienesSomos';
import Principios from './Principios';
import MisioVision from './MisioVision';

export function DefaultSidebar() {
  const [selectedOption, setSelectedOption] = useState('QuienesSomos');

  const renderContent = () => {
    switch (selectedOption) {
      case 'QuienesSomos':
        return <QuienesSomos />;
      case 'Principios':
        return <Principios />;
      case 'MisionVision':
        return <MisioVision />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Card className="sticky top-0 z-10 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Menú de Sección
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => setSelectedOption('QuienesSomos')}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            ¿Quiénes somos?
          </ListItem>
          <ListItem onClick={() => setSelectedOption('Principios')}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            7 Principios Fundamentales
          </ListItem>
          <ListItem onClick={() => setSelectedOption('MisionVision')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Misión y Visión
          </ListItem>
        </List>
      </Card>
      <div className="flex-grow p-4 bg-white">{renderContent()}</div>
    </div>
  );
}

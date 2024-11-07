import React, { useState } from 'react';
import './DefaultSidebar.css';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Card className="top-0 z-10 h-[45vh] md:h-[calc(100vh-32rem)] w-full md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Menú de Sección
          </Typography>
        </div>
        <List className="flex-grow space-y-2">
          <ListItem
            onClick={() => setSelectedOption('QuienesSomos')}
            className="hover:bg-gray-200 p-4 cursor-pointer w-full flex-shrink-0"
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-6 w-6" />
            </ListItemPrefix>
            ¿Quiénes somos?
          </ListItem>
          <ListItem
            onClick={() => setSelectedOption('Principios')}
            className="hover:bg-gray-200 p-4 cursor-pointer w-full flex-shrink-0"
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-6 w-6" />
            </ListItemPrefix>
            7 Principios Fundamentales
          </ListItem>
          <ListItem
            onClick={() => setSelectedOption('MisionVision')}
            className="hover:bg-gray-200 p-4 cursor-pointer w-full flex-shrink-0"
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-6 w-6" />
            </ListItemPrefix>
            Misión y Visión
          </ListItem>
        </List>
      </Card>
      <div className="flex-grow p-4 bg-white">{renderContent()}</div>
    </div>
  );
}

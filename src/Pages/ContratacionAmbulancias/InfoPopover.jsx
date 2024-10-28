import React from 'react';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';

export function InfoPopover({ content }) {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 cursor-pointer ml-2"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      </PopoverHandler>
      <PopoverContent
        {...triggers}
        className="z-50 max-w-xs p-2 text-xs border border-red-100  shadow-red-500/70 shadow-lg bg-red-100"
      >
        <div className="font-normal text-xs text-black">{content}</div>
      </PopoverContent>
    </Popover>
  );
}

import { Typography } from "@material-tailwind/react";

export function DefaultSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 animate-pulse">
      {/* Placeholder for the main title */}
      <Typography
        as="div"
        variant="h1"
        className="h-8 w-3/4 rounded-full bg-gray-300 mb-6"
      >
        &nbsp;
      </Typography>

      {/* Placeholders for descriptions */}
      <div className="space-y-4">
        <Typography
          as="div"
          variant="paragraph"
          className="h-4 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="h-4 w-4/5 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="h-4 w-3/4 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="h-4 w-2/3 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>

      {/* Placeholder for list items */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Placeholder for buttons and additional info */}
      <div className="space-y-4">
        <div className="h-8 w-32 rounded-full bg-gray-300"></div>
        <div className="h-8 w-48 rounded-full bg-gray-300"></div>
        <div className="h-8 w-48 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}

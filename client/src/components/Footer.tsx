export const Footer = () => (
  <footer className="w-full bg-white dark:bg-gray-800 shadow-lg py-4 mt-auto">
    <div className="container mx-auto text-center">
      <p className="text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </div>
  </footer>
);
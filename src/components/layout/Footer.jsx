'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-muted">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-sm">
            Copyright &copy; {currentYear} Jun | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
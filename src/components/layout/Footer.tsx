'use client';

import { useEffect, useState } from 'react';
import { Logo } from '../navbar/logo';
import { Coffee, MessageCircleQuestion } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Copyright &copy; {currentYear} Jun | All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://forms.gle/TfA1kbPJmsorU9wv6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircleQuestion className="h-4 w-4" />
              問題回報
            </a>
            <a 
              href="https://buymeacoffee.com/niyd70rkzs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Coffee className="h-4 w-4" />
              贊助支持
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

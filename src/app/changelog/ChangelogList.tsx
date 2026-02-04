"use client";

import React, { useState } from 'react';
import { changelogData } from '@/data/changelogData';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChangelogList() {
  const [visibleCount, setVisibleCount] = useState(10);
  const totalCount = changelogData.length;

  const showMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const visibleData = changelogData.slice(0, visibleCount);

  return (
    <div>
      {visibleData.map((entry, index) => (
        <div key={index} className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 dark:border-gray-700 pb-4">
          {/* Timeline Dot */}
          <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 ring-4 ring-white dark:ring-gray-900" />
          
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3 gap-y-1">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 font-mono min-w-[100px]">
              {entry.date}
            </span>
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {entry.title}
            </h2>
          </div>

          {entry.items && entry.items.length > 0 && (
            <ul className="space-y-2 mt-3 ml-0 sm:ml-[112px]">
              {entry.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-2 text-sm items-start">
                  <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {visibleCount < totalCount && (
        <div className="flex justify-center mt-8 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800">
          <Button 
            variant="ghost" 
            onClick={showMore}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            顯示更多紀錄
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

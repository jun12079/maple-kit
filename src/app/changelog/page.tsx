import React from 'react';
import { Metadata } from 'next';
import ChangelogList from './ChangelogList';

export const metadata: Metadata = {
  title: '更新日誌 | MapleKit',
  description: 'MapleKit 的更新歷史紀錄，包含新功能、問題修復與優化項目。',
};

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              更新日誌
            </h1>
          </div>

          <ChangelogList />
        </div>
      </div>
    </div>
  );
}

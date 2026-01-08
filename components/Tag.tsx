
import React from 'react';
import { ActionTag } from '../types';

interface TagProps {
  tag: ActionTag;
}

const tagColors: Record<ActionTag, string> = {
  'Scope 1': 'bg-red-100 text-red-800',
  'Scope 2': 'bg-orange-100 text-orange-800',
  'Scope 3': 'bg-yellow-100 text-yellow-800',
  'Impact': 'bg-blue-100 text-blue-800',
  'Financière': 'bg-green-100 text-green-800',
};

export const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag]}`}>
      {tag}
    </span>
  );
};

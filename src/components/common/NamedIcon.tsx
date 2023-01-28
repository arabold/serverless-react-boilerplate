import React from 'react';
import * as Outlines from '@heroicons/react/24/outline';

export type IconName = keyof typeof Outlines;
export interface NamedIconProps {
    icon: IconName;
    color?: string;
    size?: string;
    addClasses?: string;
    title?: string;
}

export default function NamedIcon({icon, color, size, title, addClasses}: NamedIconProps) {
    const Icon = Outlines[icon];
    const classes = [
        color ?? 'text-black',
        size ?? 'h-6 w-6',
        addClasses ?? '',
    ].map((s) => s.trim()).join(' ');

    return title ? ( <Icon className={classes} title={title}/> )
        : (<Icon className={classes}/> );
}
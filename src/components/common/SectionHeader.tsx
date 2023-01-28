import React from 'react';

import NamedIcon, { IconName } from './NamedIcon';

export interface SectionDescription {
    id: string;
    icon: IconName;
    title: string;
    color: string;
}

export function SectionBadge({ icon, title, color }: SectionDescription) {
    return (
        <div className="flex flex-row flex-none sx-2 content-center items-center flex-wrap">
            <NamedIcon icon={icon} color={color} title={title} size="w-[60px] h-[60px]" addClasses="animate-pulse"/>
            <span className="text-3xl align-middle">{title}</span>
        </div>
    );
}

export function SectionHeader({ icon, title, color, id }: SectionDescription) {
    return (
        <header className=" bg-black text-white p-4 width-full">
            <div className="grid grid-cols-1 justify-center content-center justify-items-center items-center p-4">
                <SectionBadge icon={icon} title={title} color={color} id={id}/>
            </div>
        </header>
    );
}
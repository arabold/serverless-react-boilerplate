import React, { ReactNode } from 'react';
import { InformationCircleIcon, LanguageIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { SectionDescription } from '../common/SectionHeader';

import logo from '../../logo.svg';
import NamedIcon from '../common/NamedIcon';

function getBg(section: string, active: string): string {
    return section === active ? "bg-slate-900" : "bg-black";
}
export interface SideNavProps {
    sections: SectionDescription[];
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideNav({ sections, active, setActive }: SideNavProps) {
    return (
        <nav className="flex h-screen w-min items-center justify-items-center flex-col bg-black justify-self-start">
            {sections.map((s) => (
                <div
                    className={`group px-8 py-4 ${getBg(s.id, active)}`}
                    onClick={() => setActive(s.id)}
                    >
                    <NamedIcon
                        icon={s.icon}
                        color={s.color}
                        title={s.title}
                        size="h-8 w-8"
                        addClasses={`transform transition-transform group-hover:rotate-6 group-hover:${s.color}`}/>
                </div>
            ))}
        </nav>
    );
}
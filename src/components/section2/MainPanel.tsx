import React, { useState } from 'react';
import { SectionDescription } from '../common/SectionHeader';

export const Description: SectionDescription = {
    id: 'section2',
    icon: 'Cog6ToothIcon',
    title: 'Section 2',
    color: 'text-cyan-300',
}

export default function MainPanel() {
    return (
        <div className="text-center text-lg">Section 2 Coming Soon!</div>
    );
}
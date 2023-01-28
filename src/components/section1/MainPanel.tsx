import React, { useState } from 'react';
import { SectionDescription } from '../common/SectionHeader';

export const Description: SectionDescription = {
    id: 'section1',
    icon: 'BoltIcon',
    title: 'Section 1',
    color: 'text-yellow-300',
}

export default function MainPanel() {
    return (
        <div className="text-center text-lg">Section 1 Coming Soon!</div>
    );
}

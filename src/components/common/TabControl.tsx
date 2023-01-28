import React, { ReactNode } from 'react';

export interface TabControlTabProps {
    tabId: string;
    deckId: string;
    label: string;
    active?: boolean;
}

export function TabControlTab({tabId, deckId, label, active}: TabControlTabProps) {
    const id=`${deckId}-${tabId}-tab`
    const href = `#${deckId}-${tabId}`;
    const dataTarget= `#${deckId}-${tabId}`;
    const aria = `${deckId}-${tabId}`;
    const activeClass = active === true ? 'active' : '';
    return (
        <li className="nav-item" role="presentation">
            <a href={href}
                className={`nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent ${activeClass}`}
                id={id} data-bs-toggle="pill"
                data-bs-target={dataTarget} role="tab" aria-controls={aria}
                aria-selected={active ? "true" : "false"}>{label}</a>
        </li>
    );
}

export interface TabControlPanelProps {
    tabId: string;
    deckId: string;
    children: ReactNode;
    active?: boolean;
}

export function TabControlPanel({ tabId, deckId, children, active }: TabControlPanelProps) {
    const id=`${deckId}-${tabId}`;
    const aria=`${deckId}-${tabId}-tab`;
    const isActive = active === true ? "active" : "";
    return (
        <div className={`tab-pane fade show ${isActive}`}
            id={id}
            role="tabpanel"
            aria-labelledby={aria}>
            {children}
        </div>
    );
}

export interface TabControlItemProps {
    tabId: string;
    label: string;
    children: ReactNode;
    active?: boolean;
}

export interface TabControlProps {
    deckId: string;
    items: TabControlItemProps[];
}

export function TabControlTabs({ deckId, items}: TabControlProps) {
    const id=`${deckId}-tab`;
    return (
        <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
            id={id}
            role="tablist">
            {items.map((item) => TabControlTab({...item, deckId}))}
        </ul>
    );
}

export function TabControlPanels({ deckId, items}: TabControlProps) {
    const id=`${deckId}-tabsContent`;
    return (
        <div className="tab-content" id={id}>
            {items.map((item) => TabControlPanel({...item, deckId}))}
        </div>
    );
}

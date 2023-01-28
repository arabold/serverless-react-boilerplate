import "./App.css";

import React, { useState } from 'react';

import useConfig from "./components/useConfig";
import SideNav from "./components/navigation/SideNav";
import { SectionHeader } from './components/common/SectionHeader';

import Section1DetailsMain, { Description as Section1Details } from './components/section1/MainPanel';
import Section2DetailsMain, { Description as Section2Details } from './components/section2/MainPanel';

const sectionDescriptions = new Map([
    [Section1Details.id, { info: Section1Details, Main: Section1DetailsMain }],
    [Section2Details.id, { info: Section2Details, Main: Section2DetailsMain }],
]);
const sections = Array.from(sectionDescriptions.values()).map((sd) => sd.info);

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [active, setActive] = useState<string>(Section1Details.id);

  const section = sectionDescriptions.get(active);
  const info = section?.info ?? Section1Details;
  const ActiveMain = section?.Main ?? Section1DetailsMain;

  return (
    <div className="flex flex-col bg-gray-100 w-screen">
        <SectionHeader icon={info.icon} color={info.color} title={info.title} id={info.id}/>
        <div className="flex flex-row w-full items-stretch">
            <SideNav sections={sections} active={active} setActive={setActive}/>
            <div className="flex-1">
                <ActiveMain/>
            </div>
        </div>
    </div>
 );
}
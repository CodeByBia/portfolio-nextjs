"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import Link from 'next/link';

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Design</li>
        <li>JavaScript</li>
        <li>Test Software</li>
        <li>React</li>
        <li>QA with Selenium and Gherkin</li>
        <li>SQL & PLSQL</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Internet Systems, UNICAP</li>
        <li>Softex's Training Program - React</li>
        <li>Softex's Training Program - Test Software (QA)</li>
      </ul>
    ),
  },
  {
    title: "graduation",
    id: "graduation",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <Link href="https://portal.unicap.br/w/sistemas-para-internet#presencial/sobre_o_curso">Click to know more about Internet Systems</Link>
        </li>
        <li>Some of the most essential courses I have taken so far in my graduation include: Accessible Web Systems Development, Design Thinking, Mobile Application Programming, and Systems Security and Auditing.
</li>
      </ul>
    ),
  }
    
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500}alt="câmera com código html atrás"  />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            Always building something new and learning along the way!
            Experienced in group projects using tools like Jira and Trello to keep things organized.
            Skilled in QA with Python, diving deeper into PL/SQL, and trained in React for front-end development. 
            Open to new challenges and collaborations!
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("graduation")}
              active={tab === "graduation"}
            >
              {" "}
              About my Graduation{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
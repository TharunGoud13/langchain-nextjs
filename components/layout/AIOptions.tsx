"use client";
import React from "react";
import { ActiveLink } from "../chat/Navbar";
import Link from "next/link";

const AIOptions = () => {
  return (
    <div>
      <div className="grid grid-cols-[1fr,auto] gap-2 p-4">
        <div className="flex gap-4 flex-col md:flex-row md:items-center">
          <nav className="flex gap-1 flex-col md:flex-row">
            <Link href="/" onClick={() => console.log("new")}>
              🏴‍☠️ Chat
            </Link>
            <Link href="/structured_output">🧱 Structured Output</Link>
            <Link href="/agents">🦜 Agents</Link>
            <Link href="/retrieval">🐶 Retrieval</Link>
            <Link href="/retrieval_agents">🤖 Retrieval Agents</Link>
            <Link href="/ai_sdk">🌊 React Server Components</Link>
            <Link href="/langgraph">🕸️ LangGraph</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AIOptions;

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AddPanel from "./AddPanel";

export function Header() {
  const [isAddPanelVisible, setAddPanelVisible] = useState(false);
  function addNoteHandler() {
    setAddPanelVisible((prev) => !prev);
  }
  return (
    <header className="cy_header">
      <Image
        src="/cypher_logo.svg"
        alt=""
        height={30}
        width={100}
        draggable={"false"}
      />
      <nav className="cy_nav">
        <div className="a_n_btn" onClick={addNoteHandler}>
          <p className="cy_nav_el">
            <span>
              <Image src={"/add_icon.svg"} alt="" height={12} width={12} />
            </span>
            Add Note
          </p>
        </div>
        <div className="nv_div"></div>
        <Link href="/" className="n_link cy_nav_el">
          Notes
        </Link>
        <div className="nv_div"></div>
        <Link href="/archive" className="n_link cy_nav_el cy_archive">
          Archive
        </Link>
      </nav>

      {isAddPanelVisible ? <AddPanel /> : null}
    </header>
  );
}

export default Header;

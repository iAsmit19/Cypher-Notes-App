"use client";

import { useAddNote } from "@/context/AppContext";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function AddPanel() {
  // Accessing the handleAddNote and togglePanel from Context API
  const { isPanelOpen, togglePanel, handleAddNote } = useAddNote();

  // Function to stop propagation of the click event on the New Note Panel
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // States to track the user inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSaveClick = async () => {
    if (title.trim() && content.trim()) {
      await handleAddNote({ title, content });
      setTitle("");
      setContent("");
    } else {
      alert("Please fill both the title and content fields.");
    }
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.5, ease: "circInOut" },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "circInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <motion.div
          className="cy_add_panel"
          onClick={togglePanel}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="cy_add_cont"
            onClick={stopPropagation}
            initial={{ height: "150px", opacity: 0 }}
            animate={{ height: "300px", opacity: 1 }}
            exit={{ height: "150px", opacity: 0 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
          >
            <div className="cy_add_inputs">
              <input
                className="cy_add_title"
                type="text"
                placeholder="Add title"
                required
                onChange={(event) => setTitle(event.target.value)}
              />
              <div className="cy_input_div"></div>
              <textarea
                className="cy_add_content"
                placeholder="write your thoughts"
                required
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <div className="cy_add_div"></div>
            <div className="cy_add_feature">
              <div className="cy_feature cy_color_feature">
                <Image
                  src="/color.svg"
                  alt="O"
                  height={20}
                  width={20}
                  draggable={"false"}
                />
              </div>
              <div className="cy_other_feautres">
                <div className="cy_feature cy_archive_feature">
                  <Image
                    src="/archive.svg"
                    alt="Archive"
                    height={20}
                    width={20}
                    draggable={false}
                  />
                </div>
                <div className="cy_of_div"></div>
                <div
                  className="cy_feature cy_save_feature"
                  onClick={onSaveClick}
                >
                  <p>Save</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddPanel;

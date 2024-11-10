import React from "react";

function AddPanel() {
  return (
    <div className="cy_add_panel">
      <div className="cy_add_cont">
        <div className="cy_add_inputs">
          <input className="cy_add_title" type="text" placeholder="Add title" />
          <div className="cy_input_div"></div>
          <textarea className="cy_add_content" placeholder="write your thoughts" />
        </div>
        <div className="cy_add_div"></div>
        <div className="cy_add_feature">
          <div className="cy_color_feature"></div>
          <div className="cy_other_feautres">
            <div className="cy_archive"></div>
            <div className="cy_of_div"></div>
            <div className="cy_save"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPanel;

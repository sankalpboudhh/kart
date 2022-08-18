import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import { FavoriteBorder } from "@material-ui/icons";
import Modal from "./components/Modal";
import LoginPage from "./pages/LoginPage";

function LikeButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "fit-content",
      }}
    >
      <h3>How to use HeartCheckBox in ReactJS?</h3>

      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        }
        label="Instagram Like Button"
      />
      {modalOpen && <Modal />}

      <h3>Second</h3>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
        label="Like "
      />
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}

export default LikeButton;

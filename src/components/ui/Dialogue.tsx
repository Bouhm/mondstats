import './Dialogue.scss';

import _ from 'lodash';
import React, { ReactNode } from 'react';

type DialogueProps = {
  children: ReactNode
  onClose: () => void
}

function Dialogue({ children, onClose }: DialogueProps) {
  const handleClose = () => {
    localStorage.setItem(`seenDialogue`, "true");
    onClose();
  }

  return (
    <div className="dialogue-backdrop">
      <div className="dialogue">
        <div className="response">
            <p onClick={handleClose}><img src={"/assets/icons/dialogue.webp"} alt="speech-bubble" />
                <span>
                    Okay.
                </span>
            </p>
        </div>
        <div className="content">
            <div className="name">Bouhm</div>
            <div className="text">
                {children}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dialogue;
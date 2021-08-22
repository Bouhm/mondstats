import './Dialogue.scss';

import _ from 'lodash';
import React, { ReactNode } from 'react';
import LLImage from './LLImage'

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
    <div className="dialogue-backdrop" onClick={handleClose}>
      <div className="dialogue">
        <div className="response">
            <div className="response-message" onClick={handleClose}><LLImage src={"/assets/icons/dialogue.webp"} alt="speech-bubble" />
                I understand.
            </div>
        </div>
        <div className="content">
            <div className="name">
              <span>Bouhm</span>
            </div>
            <div className="text">
                {children}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dialogue;
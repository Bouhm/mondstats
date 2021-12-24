import './ArtifactSetInfo.css';

import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSetData } from '../../data/types';
import LLImage from '../ui/LLImage';

function ArtifactSetInfo({ _id, rarity, name, affixes, activation }: IArtifactSetData & { activation: number }) {
  return (
    <div className={`artifact-set-info`}>
      <div className="artifact-set-header">
        <LLImage className={`rarity-${rarity}`} src={`/assets/artifacts/${_id}.webp`} alt={name} />
        <div className="artifact-set-detail">
          <div className="artifact-set-name">
            {activation}x {name}
          </div>
        </div>
      </div>
      <table>
        <tbody className="artifact-set-effects">
          {_.map(affixes, (affix, i) => {
            if (activation < affix.activation_number) return null;

            return (
              <tr key={`affix-${_id}-${i}`}>
                <td>{affix.activation_number}-Piece: </td>
                <td>{affix.effect}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ArtifactSetInfo
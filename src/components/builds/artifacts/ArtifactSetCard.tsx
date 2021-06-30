import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSetData } from '../../../data/types';
import { useAppSelector } from '../../../hooks';

function ArtifactSetCard({ _id, oid, name, affixes, activation }: IArtifactSetData & { activation: number }) {
  return (
    <div className={`artifact-card`}>
      <div className="artifact-header">
        <img src={`/assets/artifacts/${oid}.png`} alt={name} />
        <div className="artifact-detail">
          <div className="artifact-name">
            {activation}x {name}
          </div>
        </div>
      </div>
      <table>
        <tbody className="artifact-effects">
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

export default ArtifactSetCard
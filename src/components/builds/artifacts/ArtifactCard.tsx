import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactData, IArtifactDb } from '../../../data/types';
import { Store } from '../../../Store';

function ArtifactCard({ oid, name, set, affixes, activation }: IArtifactData & { activation: number, affixes: { activation_number: number, effect: string }[] }) {
  const [{ artifactSetDb }] = useContext(Store)

  return (
    <div className={`artifact-card`}>
      <div className="artifact-header">
        <img className={""} src={`/assets/artifacts/${oid}.png`} alt={name} />
        <div className="artifact-detail">
          <div className="artifact-name">
            {activation}x {artifactSetDb[set].name}
          </div>
        </div>
      </div>
      <table>
        <tbody className="artifact-effects">
          {_.map(affixes, (affix, i) => {
            if (activation < affix.activation_number) return null;

            return (
              <tr key={`affix-${artifactSetDb[set]._id}-${i}`}>
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

export default ArtifactCard
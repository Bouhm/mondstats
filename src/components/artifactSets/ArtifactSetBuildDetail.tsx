import './ArtifactSetBuildDetail.css';

import { map } from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSetData } from '../../data/types';
import LLImage from '../ui/LLImage';
import { useAppSelector } from '../hooks/useRedux';

function ArtifactSetBuildDetail(props: any) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  
  return (
    <div className={`artifact-set-build-detail`}>
      {map(props.sets, ({ _id, activation_number }) => {
        const set = artifactSetDb[_id]
        if (!set) return null;

        return (
          <div className="artifact-set-info">
            <div className="artifact-set-header">
              <LLImage className={`rarity-${set.rarity}`} src={`/assets/artifacts/${set._id}.webp`} alt={set.name} />
              <div className="artifact-set-detail">
                <div className="artifact-set-name">
                  {activation_number}x {set.name}
                </div>
              </div>
            </div>
            <table>
              <tbody className="artifact-set-effects">
                {map(set.affixes, (affix, i) => {
                  if (activation_number < affix.activation_number) return null;
      
                  return (
                    <tr key={`affix-${set._id}-${i}`}>
                      <td>{affix.activation_number}-Piece: </td>
                      <td>{affix.effect}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSetBuildDetail
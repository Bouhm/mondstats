import _ from "lodash";
import React from "react";
import { IBuild, IArtifact } from "../../../data/types";
import ArtifactCard from "./ArtifactCard";

type ArtifactBuildProps = {
  build: IBuild,
  getArtifactSet(id: number): IArtifact | undefined
}

function ArtifactBuild({ build, getArtifactSet }: ArtifactBuildProps) {
  return (
    <div className="artifact-build">
      <h1>Artifacts</h1>
      {_.map(build.artifacts, ({ id, activation_number }, i) => {
        const artifact = getArtifactSet(id);
        if (!artifact) return null;

        return <ArtifactCard key={`${id}-${i}`} {...artifact} activation={activation_number} affixes={artifact.set.affixes} />
      })}
    </div>
  )
}

export default ArtifactBuild
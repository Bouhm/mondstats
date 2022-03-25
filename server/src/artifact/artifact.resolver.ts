import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListArtifactInput } from './artifact.inputs';
import { Artifact } from './artifact.model';
import { ArtifactService } from './artifact.service';

@Resolver(() => Artifact)
export class ArtifactResolver {
  constructor(private artifactService: ArtifactService) {}

  @Query(() => [Artifact])
  async artifacts(@Args('filter', { nullable: true }) filter?: ListArtifactInput) {
    const artifacts = this.artifactService.list(filter);
    return artifacts;
  }
}
